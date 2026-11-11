# Vigenère Cipher Web App

A lightweight pet project designed for encrypting and decrypting words and sentences using the classic Vigenère cipher and a custom secret key.

## 📌 Overview

This project is a simple web-based implementation of the polyalphabetic Vigenère cipher. Users can input any text alongside a secret alphabetic key to either encrypt plaintext into ciphertext or decrypt it back to readable text.

### ✨ Features
- **Encryption & Decryption**: Easily encode and decode sentences or single words.
- **Case Preservation**: Preserves uppercase and lowercase letters while keeping numbers and punctuation unchanged.
- **Key Strength Indicator**: Real-time feedback on key length and relative strength.
- **Copy to Clipboard**: Quick one-click button to copy the resulting text.
- **Clean Interface**: Minimalist UI built with HTML, CSS, and Vanilla JavaScript.

## 🛠 Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (Fetch API)
- **Backend**: PHP (handles the cipher arithmetic and returns results via JSON)

## 🚀 Getting Started

1. Place the project folder into your local PHP server directory (e.g., `htdocs` in XAMPP or `www` in WAMP/MAMP/Open Server).
2. Start Apache / PHP server.
3. Open `index.html` in your browser:
   ```text
   http://localhost/vigenere/index.html
   ```
4. Enter your message, specify a key (letters only), and click **Zaszyfruj** (Encrypt) or **Odszyfruj** (Decrypt).
