async function encodeMessage() {
    const message = document.getElementById('message').value;
    const key = document.getElementById('key').value;

    const response = await fetch('http://localhost:5000/encode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, key })
    });

    const data = await response.json();
    document.getElementById('output').innerText = data.result;
}

async function decodeMessage() {
    const message = document.getElementById('message').value;
    const key = document.getElementById('key').value;

    const response = await fetch('http://localhost:5000/decode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, key })
    });

    const data = await response.json();
    document.getElementById('output').innerText = data.result;
}
