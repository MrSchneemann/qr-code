// Initialize global variables to hold current colors
let currentColor = '#000000';
let currentLightColor = '#FFFFFF';

// Function to generate QR code based on form submission
document.getElementById('qr-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const textInput = document.getElementById('text').value;
    const textBytes = new TextEncoder().encode(textInput).length;
    const errorMessage = document.getElementById('error-message');
    const color = document.getElementById('color').value;
    const size = parseInt(document.getElementById('size').value, 10);
    const lightColor = document.getElementById('background-color').value;

    if (textBytes > 2953) {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';

        // Update current colors
        currentColor = color;
        currentLightColor = lightColor;

        generateQRCode(textInput, currentColor, currentLightColor, size);
    }
});

// Event listener to handle export functionality
document.getElementById('export').addEventListener('click', function() {
    const img = document.getElementById('qr-code').querySelector('img');
    if (img) {
        const a = document.createElement('a');
        a.href = img.src;
        a.download = 'qr-code.png';
        a.click();
    }
});

// Event listener to open color picker when clicking custom color picker button
document.getElementById('custom-color-picker').addEventListener('click', function() {
    document.getElementById('color').click();
});

// Event listener to update color preview
document.getElementById('color').addEventListener('input', function() {
    document.getElementById('color-preview').style.backgroundColor = this.value;
});

// Event listener to toggle expert settings panel
document.getElementById('settings-toggle').addEventListener('click', function() {
    const triangleIcon = document.querySelector('.triangle');
    const settingsPanel = document.getElementById('settings-panel');
    const expertSettings = document.getElementById('expert-settings');

    expertSettings.classList.toggle('open');
    settingsPanel.style.display = expertSettings.classList.contains('open') ? 'block' : 'none';
    triangleIcon.classList.toggle('open');
});

// Reset QR code on page load
window.addEventListener('load', function() {
    resetQRCode();
});

// Function to reset QR code
function resetQRCode() {
    const defaultText = '';
    const defaultColor = '#000000';
    const defaultSize = 200;
    const defaultLightColor = '#FFFFFF';

    document.getElementById('text').value = defaultText;
    document.getElementById('color').value = defaultColor;
    document.getElementById('size').value = defaultSize;
    document.getElementById('background-color').value = defaultLightColor;

    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';

    // Generate QR code with default settings
    generateQRCode(defaultText, defaultColor, defaultLightColor, defaultSize);
}

// Function to generate QR code image
function generateQRCode(text, color, lightColor, size) {
    QRCode.toDataURL(text, {
        errorCorrectionLevel: 'H',
        color: { dark: color, light: lightColor },
        width: size,
        height: size
    })
        .then(url => {
            const img = new Image();
            img.src = url;
            document.getElementById('qr-code').innerHTML = '';
            document.getElementById('qr-code').appendChild(img);
            document.getElementById('export').style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
}
