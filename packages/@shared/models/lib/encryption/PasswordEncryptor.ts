/*
    WARNING: *btoa* and *atob* APIs are not recommended for security-critical operations
    because they are not cryptographically secure.
 */
class PasswordEncryptor {
    private static readonly ENCRYPTION_KEY = SECRET_KEY;

    public static encrypt(plaintextPassword: string): string {
        let encryptedPassword = "";
        for (let i = 0; i < plaintextPassword.length; i++) {
            const charCode =
                plaintextPassword.charCodeAt(i) ^
                PasswordEncryptor.ENCRYPTION_KEY.charCodeAt(
                    i % PasswordEncryptor.ENCRYPTION_KEY.length
                );
            encryptedPassword += String.fromCharCode(charCode);
        }
        const base64String = btoa(encryptedPassword);
        return base64String;
    }

    public static decrypt(encryptedPassword: string): string {
        const binaryString = atob(encryptedPassword);
        let plaintextPassword = "";
        for (let i = 0; i < binaryString.length; i++) {
            const charCode =
                binaryString.charCodeAt(i) ^
                PasswordEncryptor.ENCRYPTION_KEY.charCodeAt(
                    i % PasswordEncryptor.ENCRYPTION_KEY.length
                );
            plaintextPassword += String.fromCharCode(charCode);
        }
        return plaintextPassword;
    }

    public static check(
        plaintextPassword: string,
        encryptedPassword: string
    ): boolean {
        const decryptedPassword = PasswordEncryptor.decrypt(encryptedPassword);
        return decryptedPassword === plaintextPassword;
    }
}

export default PasswordEncryptor;
