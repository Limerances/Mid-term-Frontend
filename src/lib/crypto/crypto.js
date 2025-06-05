import CryptoJS from 'crypto-js';

// 示例用法：
const key = "wefhwuf284hvnien"; 
const iv  = "84fhwbsk109jzmlh"; 

export function encryptCmd(cmd) {
    const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
    const ivUtf8 = CryptoJS.enc.Utf8.parse(iv);

    const encrypted = CryptoJS.AES.encrypt(cmd, keyUtf8, {
        iv: ivUtf8,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    console.log(cmd);
    console.log(encrypted.toString());
    return encrypted.toString();  // base64 编码
}

