document.getElementById('qr-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const textInput = document.getElementById('text').value;
    const textBytes = new TextEncoder().encode(textInput).length;
    const errorMessage = document.getElementById('error-message');
    const color = document.getElementById('color').value;
    const size = parseInt(document.getElementById('size').value, 10);

    if (textBytes > 2953) {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';

        QRCode.toDataURL(textInput, { errorCorrectionLevel: 'H', color: { dark: color, light: "#FFFFFF" }, width: size, height: size })
            .then(url => {
                const img = new Image();
                img.src = url;
                document.getElementById('qr-code').innerHTML = '';
                document.getElementById('qr-code').appendChild(img);
                document.getElementById('export').style.display = 'block';
            })
            .catch(error => console.error('Error:', error));
    }
});

document.getElementById('export').addEventListener('click', function() {
    const img = document.getElementById('qr-code').querySelector('img');
    if (img) {
        const a = document.createElement('a');
        a.href = img.src;
        a.download = 'qr-code.png';
        a.click();
    }
});

document.getElementById('custom-color-picker').addEventListener('click', function() {
    document.getElementById('color').click();
});

document.getElementById('color').addEventListener('input', function() {
    document.getElementById('color-preview').style.backgroundColor = this.value;
});
