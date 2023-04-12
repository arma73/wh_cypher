/**
 * Interface for encrypting secrets
 */
export interface IEncryption {
    encrypt(secret: string, password: string): Promise<IEncryptionResult>;
    decrypt(encryption: IEncryptionResult, password: string): Promise<string>;
}

/**
 * Interface for encryption results
 */
export interface IEncryptionResult {
    encryptedSecret: string;
    salt: string;
    iv: string;
}

/**
 * Implementation of IEncryption using AES-GCM algorithm
 */
class AESGCMEncryption implements IEncryption {
    private readonly encoder = new TextEncoder();
    private readonly decoder = new TextDecoder();

    /**
     * Encrypts the given secret with the provided password using AES-GCM algorithm.
     * Returns an object with the encrypted secret, salt, and IV used for encryption.
     *
     * @param secret The secret to encrypt
     * @param password The password used to encrypt the secret
     * @returns An object containing the encrypted secret, salt, and IV used for encryption
     */
    public async encrypt(
        secret: string,
        password: string
    ): Promise<IEncryptionResult> {
        const passwordBuffer = this.encoder.encode(password);
        const secretBuffer = this.encoder.encode(secret);
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const passwordKey = await crypto.subtle.importKey(
            "raw",
            passwordBuffer,
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );
        const key = await crypto.subtle.deriveKey(
            { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
            passwordKey,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt"]
        );
        const encryptedSecret = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv },
            key,
            secretBuffer
        );
        return {
            encryptedSecret: this.arrayBufferToBase64(encryptedSecret),
            salt: this.arrayBufferToBase64(salt),
            iv: this.arrayBufferToBase64(iv),
        };
    }

    /**
     * Decrypts the given encrypted secret with the provided password using AES-GCM algorithm.
     *
     * @param encryption.encryptedSecret The encrypted secret to decrypt
     * @param encryption.salt The salt used to derive the encryption key
     * @param encryption.iv The IV used to encrypt the secret
     * @param password The password used to encrypt the secret
     * @throws {Error} Unable to decrypt the secret, the password or the encryption is incorrect
     * @returns The decrypted secret as a string
     */
    public async decrypt(
        encryption: IEncryptionResult,
        password: string
    ): Promise<string> {
        const saltBuffer = this.base64ToArrayBuffer(encryption.salt);
        const ivBuffer = this.base64ToArrayBuffer(encryption.iv);
        const encryptedSecretBuffer = this.base64ToArrayBuffer(
            encryption.encryptedSecret
        );
        const passwordBuffer = this.encoder.encode(password);
        const passwordKey = await crypto.subtle.importKey(
            "raw",
            passwordBuffer,
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );
        const key = await crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: saltBuffer,
                iterations: 100000,
                hash: "SHA-256",
            },
            passwordKey,
            { name: "AES-GCM", length: 256 },
            false,
            ["decrypt"]
        );
        try {
            const decryptedSecret = await crypto.subtle.decrypt(
                { name: "AES-GCM", iv: ivBuffer },
                key,
                encryptedSecretBuffer
            );
            return this.decoder.decode(decryptedSecret);
        } catch {
            throw new Error(
                "Unable to decrypt the secret, the password or the encryption is incorrect"
            );
        }
    }

    /**
     * Converts an ArrayBuffer to a Base64-encoded string.
     *
     * @param buffer The ArrayBuffer to convert
     * @returns The Base64-encoded string
     */
    private arrayBufferToBase64(buffer: ArrayBuffer): string {
        const bytes = new Uint8Array(buffer);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    /**
     * Converts a base64-encoded string to an ArrayBuffer.
     * @param base64 The base64-encoded string to convert
     * @returns The ArrayBuffer
     */
    private base64ToArrayBuffer(base64: string): ArrayBuffer {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes.buffer;
    }
}

export default AESGCMEncryption;
