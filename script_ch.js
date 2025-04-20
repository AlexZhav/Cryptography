const RUSSIAN_ALPHABET = 'абвгдеёжзийклмнопрстуфхцчшщьыъэюя';
const ENGLISH_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

function caesarCipher(text, shift, decrypt = false) {
    shift = decrypt ? -shift : shift;
    return text.replace(/[a-zA-Zа-яА-ЯёЁ]/g, (char) => {
        const alphabet = /[а-яА-ЯёЁ]/.test(char) ? RUSSIAN_ALPHABET : ENGLISH_ALPHABET;
        const isUpperCase = char === char.toUpperCase();
        const baseChar = isUpperCase ? char.toLowerCase() : char;
        const idx = alphabet.indexOf(baseChar);
        if (idx === -1) return char;
        let newIdx = (idx + shift + alphabet.length) % alphabet.length;
        const newChar = alphabet[newIdx];
        return isUpperCase ? newChar.toUpperCase() : newChar;
    });
}

function atbashCipher(text) {
    return text.replace(/[a-zA-Zа-яА-ЯёЁ]/g, (char) => {
        const alphabet = /[а-яА-ЯёЁ]/.test(char) ? RUSSIAN_ALPHABET : ENGLISH_ALPHABET;
        const isUpperCase = char === char.toUpperCase();
        const baseChar = isUpperCase ? char.toLowerCase() : char;
        const idx = alphabet.indexOf(baseChar);
        if (idx === -1) return char;
        const newChar = alphabet[alphabet.length - 1 - idx];
        return isUpperCase ? newChar.toUpperCase() : newChar;
    });
}

function vigenereCipher(text, key, decrypt = false) {
    key = key.toLowerCase();
    let result = '';
    let keyIndex = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const alphabet = /[а-яА-ЯёЁ]/.test(char) ? RUSSIAN_ALPHABET : ENGLISH_ALPHABET;
        const isUpperCase = char === char.toUpperCase();
        const baseChar = isUpperCase ? char.toLowerCase() : char;
        const idx = alphabet.indexOf(baseChar);
        if (idx === -1) {
            result += char;
            continue;
        }
        const keyChar = key[keyIndex % key.length];
        const keyShift = alphabet.indexOf(keyChar);
        const shift = decrypt ? -keyShift : keyShift;
        let newIdx = (idx + shift + alphabet.length) % alphabet.length;
        let newChar = alphabet[newIdx];
        result += isUpperCase ? newChar.toUpperCase() : newChar;
        keyIndex++;
    }
    return result;
}

function reverseCipher(text) {
    return text.split('').reverse().join('');
}

function rot13_33Cipher(text) {
    return text.replace(/[a-zA-Zа-яА-ЯёЁ]/g, (char) => {
        const isRussian = /[а-яА-ЯёЁ]/.test(char);
        const alphabet = isRussian ? RUSSIAN_ALPHABET : ENGLISH_ALPHABET;
        const shift = isRussian ? 16 : 13;  
        const isUpperCase = char === char.toUpperCase();
        const baseChar = isUpperCase ? char.toLowerCase() : char;
        const idx = alphabet.indexOf(baseChar);
        if (idx === -1) return char;
        let newIdx = (idx + shift) % alphabet.length;
        const newChar = alphabet[newIdx];
        return isUpperCase ? newChar.toUpperCase() : newChar;
    });
}

function encryptText(cipher, text, shift = 3) {
    switch (cipher) {
        case 'caesar':
            return caesarCipher(text, shift);
        case 'atbash':
            return atbashCipher(text);
        case 'vigenere':
            return vigenereCipher(text, 'ключ', false);
        case 'reverse':
            return reverseCipher(text);
        case 'rot13':
            return rot13_33Cipher(text);
        default:
            return text;
    }
}

function decryptText(cipher, text, shift = 3) {
    switch (cipher) {
        case 'caesar':
return caesarCipher(text, shift, true);
        case 'atbash':
            return atbashCipher(text);
        case 'vigenere':
            return vigenereCipher(text, 'ключ', true);
        case 'reverse':
            return reverseCipher(text);
        case 'rot13':
            return rot13_33Cipher(text);
        default:
            return text;
    }
}
function saveInputText() {
    localStorage.setItem('inputText', inputText.value);
}

function loadInputText() {
    const savedInputText = localStorage.getItem('inputText');
    if (savedInputText) {
        inputText.value = savedInputText;
    }
}


const cipherMenuToggle = document.getElementById('cipher-menu-toggle');
const cipherMenu = document.getElementById('cipher-menu');
const shiftInputContainer = document.getElementById('shift-input-container');

cipherMenuToggle.addEventListener('click', () => {
    cipherMenu.style.display = cipherMenu.style.display === 'block' ? 'none' : 'block';
});

cipherMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') {
        const selectedCipher = e.target.value;
        if (selectedCipher === 'caesar' || selectedCipher === 'vigenere') {
            shiftInputContainer.classList.remove('hidden');
        } else {
            shiftInputContainer.classList.add('hidden');
        }
        cipherMenu.style.display = 'none';
    }
});

const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const shiftValue = document.getElementById('shift-value');

encryptBtn.addEventListener('click', () => {
    const selectedCipher = document.querySelector('input[name="cipher"]:checked').value;
    outputText.value = encryptText(selectedCipher, inputText.value, parseInt(shiftValue.value));
    saveInputText();
});

decryptBtn.addEventListener('click', () => {
    const selectedCipher = document.querySelector('input[name="cipher"]:checked').value;
    outputText.value = decryptText(selectedCipher, inputText.value, parseInt(shiftValue.value));
    saveInputText();
});

document.addEventListener('DOMContentLoaded', () => {
    loadInputText();
});
  const transferBtn = document.getElementById('transfer-btn');

  transferBtn.addEventListener('click', () => {
    const cipher = document.querySelector('input[name="cipher"]:checked').value;
    const shift = parseInt(shiftValue.value);
    const input = inputText.value.trim();
    const output = outputText.value.trim();
  
    if (input && output) {
      // Оба поля заполнены → просто меняем местами
      inputText.value = output;
      outputText.value = input;
    } else if (input && !output) {
      // Только верхнее поле → шифруем и меняем
      const encrypted = encryptText(cipher, input, shift);
      inputText.value = encrypted;
      outputText.value = input;
    } else if (!input && output) {
      // Только нижнее поле → поднимаем наверх
      inputText.value = output;
      outputText.value = '';
    }
  
    saveInputText();
  });
  