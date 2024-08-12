const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

function createKeyPairs(key) {
    const keyPairs = {};
    for (let i = 0; i < key.length; i += 2) {
        keyPairs[key[i]] = key[i + 1];
        keyPairs[key[i + 1]] = key[i];
    }
    return keyPairs;
}

function transformMessage(message, keyPairs) {
    let transformedMessage = '';
    for (let char of message) {
        let lowerChar = char.toLowerCase();
        if (keyPairs[lowerChar]) {
            let transformedChar = keyPairs[lowerChar];
            transformedMessage += char === lowerChar ? transformedChar : transformedChar.toUpperCase();
        } else {
            transformedMessage += char;
        }
    }
    return transformedMessage;
}

app.post('/encode', (req, res) => {
    const { message, key } = req.body;
    const keyPairs = createKeyPairs(key);
    const encodedMessage = transformMessage(message, keyPairs);
    res.json({ result: encodedMessage });
});

app.post('/decode', (req, res) => {
    const { message, key } = req.body;
    const keyPairs = createKeyPairs(key);
    const decodedMessage = transformMessage(message, keyPairs);
    res.json({ result: decodedMessage });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
