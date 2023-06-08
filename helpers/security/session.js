import { encrypt } from './encryption.js';

export function createSession() {

    const data = JSON.stringify({
        date: Date.now()
    });

    const encryptedData = encrypt(data);

    return encryptedData;

}