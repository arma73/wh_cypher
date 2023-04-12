class EncryptionUtils {
    public static generateSecret(secretLength: number = 12): string {
        const buffer = new Uint8Array(secretLength);
        window.crypto.getRandomValues(buffer);
        const charset = SECRET_KEY;
        let secret = "";

        for (let i = 0; i < secretLength; i++) {
            secret += charset.charAt(buffer[i] % charset.length);
        }

        return secret;
    }
}

export default EncryptionUtils;
