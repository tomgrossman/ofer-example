import { enc, lib as cryptoLib } from 'crypto-js';

export const parseToUtf8 = (data: object) => {
  return enc.Utf8.parse(JSON.stringify(data));
};

export const base64url = (source: cryptoLib.WordArray) => {
  // Encode in classical base64
  let encodedSource = enc.Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  return encodedSource;
};
