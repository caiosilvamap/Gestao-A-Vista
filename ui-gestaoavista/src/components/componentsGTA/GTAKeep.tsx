import * as forge from 'node-forge';

const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);

export function encryptData(data: string): string {
    const encrypted = forge.pki.publicKeyFromPem(publicKeyPem).encrypt(data);
    return encrypted;
}

export function decryptData(encryptedData: string): string {
    try {
        const decrypted = keyPair.privateKey.decrypt(encryptedData);
        return decrypted;
    } catch (e) {
        console.log(e);
        //localStorage.removeItem('token');
        return '';
    }
    
}