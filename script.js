
function caesarCipherEncrypt(plaintext, shift) {
  let encryptedText = '';
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    if (char.match(/[a-z]/i)) {
      const isUppercase = char === char.toUpperCase();
      const asciiOffset = isUppercase ? 65 : 97;
      const encryptedChar = String.fromCharCode((char.charCodeAt(0) - asciiOffset + shift) % 26 + asciiOffset);
      encryptedText += isUppercase ? encryptedChar.toUpperCase() : encryptedChar;
    } else {
      encryptedText += char;
    }
  }
  return encryptedText;
}

function vigenereCipherEncrypt(plaintext, keyword) {
  let encryptedText = '';
  const keywordUpper = keyword.toUpperCase();
  let keywordIndex = 0;
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    if (char.match(/[a-z]/i)) {
      const isUppercase = char === char.toUpperCase();
      const asciiOffset = isUppercase ? 65 : 97;
      const shift = keywordUpper.charCodeAt(keywordIndex) - 65;
      const encryptedChar = String.fromCharCode((char.charCodeAt(0) - asciiOffset + shift) % 26 + asciiOffset);
      encryptedText += isUppercase ? encryptedChar.toUpperCase() : encryptedChar;
      keywordIndex = (keywordIndex + 1) % keyword.length;
    } else {
      encryptedText += char;
    }
  }
  return encryptedText;
}

function validateAESKey(aesKey) {
  if (aesKey.length !== 16) {
    alert("AES Encryption Key must be exactly 16 characters long (128 bits).");
    return false;
  }
  return true;
}

function aesEncrypt(plaintext, key) {
  const encrypted = CryptoJS.AES.encrypt(plaintext, key).toString();
  return encrypted;
}

function caesarCipherDecrypt(encryptedText, shift) {
  let decryptedText = '';
  for (let i = 0; i < encryptedText.length; i++) {
    const char = encryptedText[i];
    if (char.match(/[a-z]/i)) {
      const isUppercase = char === char.toUpperCase();
      const asciiOffset = isUppercase ? 65 : 97;
      const decryptedChar = String.fromCharCode((char.charCodeAt(0) - asciiOffset - shift + 26) % 26 + asciiOffset);
      decryptedText += isUppercase ? decryptedChar.toUpperCase() : decryptedChar;
    } else {
      decryptedText += char;
    }
  }
  return decryptedText;
}

function vigenereCipherDecrypt(encryptedText, keyword) {
  let decryptedText = '';
  const keywordUpper = keyword.toUpperCase();
  let keywordIndex = 0;
  for (let i = 0; i < encryptedText.length; i++) {
    const char = encryptedText[i];
    if (char.match(/[a-z]/i)) {
      const isUppercase = char === char.toUpperCase();
      const asciiOffset = isUppercase ? 65 : 97;
      const shift = keywordUpper.charCodeAt(keywordIndex) - 65;
      const decryptedChar = String.fromCharCode((char.charCodeAt(0) - asciiOffset - shift + 26) % 26 + asciiOffset);
      decryptedText += isUppercase ? decryptedChar.toUpperCase() : decryptedChar;
      keywordIndex = (keywordIndex + 1) % keyword.length;
    } else {
      decryptedText += char;
    }
  }
  return decryptedText;
}

function aesDecrypt(encryptedText, key) {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
  return decrypted;
}


function generatePassword() {
  const customPassword = document.getElementById('customPassword').value;
  const encryptionMethod = document.getElementById('encryptionMethod').value;
  const aesKey = document.getElementById('aesKey').value;

  if (encryptionMethod === 'caesar') {
    const caesarShift = 3; // Set the Caesar shift value here
    const encryptedPassword = caesarCipherEncrypt(customPassword, caesarShift);
    displayResult(`Encrypted Password: ${encryptedPassword}`);
  } else if (encryptionMethod === 'vigenere') {
    const vigenereKeyword = 'KEY'; // Set the Vigenère cipher keyword here
    const encryptedPassword = vigenereCipherEncrypt(customPassword, vigenereKeyword);
    displayResult(`Encrypted Password: ${encryptedPassword}`);
  } else if (encryptionMethod === 'aes') {
    if (validateAESKey(aesKey)) {
      const encryptedPassword = aesEncrypt(customPassword, aesKey);
      displayResult(`Encrypted Password: ${encryptedPassword}`);
    }
  }
}

function decryptPassword() {
  const encryptedPassword = document.getElementById('encryptedPassword').value;
  const decryptionMethod = document.getElementById('decryptionMethod').value;
  const aesKey = document.getElementById('aesKey').value;

  if (decryptionMethod === 'caesar') {
    const caesarShift = 3; // Set the Caesar shift value here (should be the same used during encryption)
    const decryptedPassword = caesarCipherDecrypt(encryptedPassword, caesarShift);
    displayDecryptedResult(`Decrypted Password: ${decryptedPassword}`);
  } else if (decryptionMethod === 'vigenere') {
    const vigenereKeyword = 'KEY'; // Set the Vigenère cipher keyword here (should be the same used during encryption)
    const decryptedPassword = vigenereCipherDecrypt(encryptedPassword, vigenereKeyword);
    displayDecryptedResult(`Decrypted Password: ${decryptedPassword}`);
  } else if (decryptionMethod === 'aes') {
    if (validateAESKey(aesKey)) {
      const decryptedPassword = aesDecrypt(encryptedPassword, aesKey);
      displayDecryptedResult(`Decrypted Password: ${decryptedPassword}`);
    }
  }
}

function displayResult(message) {
  const resultElement = document.getElementById('result');
  resultElement.textContent = message;
}

function displayDecryptedResult(message) {
  const decryptedResultElement = document.getElementById('decryptedResult');
  decryptedResultElement.textContent = message;
}
