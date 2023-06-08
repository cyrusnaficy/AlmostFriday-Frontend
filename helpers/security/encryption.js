/*
PREFACE -

This basic cipher is solely utilized for the purpose of request validation and does not 
serve as a means to secure or protect your information within our database. Our backend 
systems employ advanced AES encryption methods for that purpose. The contents of this 
file are the exclusive property of Splash Software LLC @2023 and are protected under copyright 
law. Unauthorized usage or dissemination of these contents is strictly prohibited without 
prior written permission. All rights reserved.
*/

const Buffer = require("buffer").Buffer;

const ENCRYPTION_KEY = "dipxwbnybgtrvhunthzbjtzepmvxvpeagedzckhjvcymunzdktzmfytviatvuhqbrdgqqikchquyjyhnxgrrncaixywbuqjmathdeyamdwcvkrqyiiexbcjbpgtypnpddwykyebdczxzkwbcjuhhtgtbbkuqpihaekbuydiibcnkqeptwzfvqyegihcbvxtmxddgdwdxmbfdwafpjcknpqcmvdtypkhicgwcafxwaeqvthtkjaucqvxdwcpcwium"

function encodeBase64(text) {
	const buffer = Buffer.from(text);
	return buffer.toString('base64');
}

export function encrypt(message) {

	let encodedMessage = encodeBase64(message);
	let encryptedMessage = "";

	for (let i = 0; i < encodedMessage.length; i++) {

		let charCode = encodedMessage.charCodeAt(i) + ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
		encryptedMessage += String.fromCharCode(charCode);

	}

	const finalMessage = encodeBase64(encryptedMessage);

	return finalMessage;
}
