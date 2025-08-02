const fs = require('fs');
const { createCanvas } = require('canvas');

// Create icons directory if it doesn't exist
if (!fs.existsSync('./icons')) {
    fs.mkdirSync('./icons');
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function createIcon(size, isMaskable = false) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    if (isMaskable) {
        // For maskable icons, use safe zone (40% of canvas)
        const safeZone = size * 0.4;
        const startX = (size - safeZone) / 2;
        const startY = (size - safeZone) / 2;
        
        // Background for maskable (transparent)
        ctx.clearRect(0, 0, size, size);
        
        // Calculator icon in safe zone
        ctx.fillStyle = '#4299e1';
        ctx.fillRect(startX, startY, safeZone, safeZone);
        
        // Add calculator details
        ctx.fillStyle = 'white';
        const padding = safeZone * 0.1;
        const calcWidth = safeZone - (padding * 2);
        const calcHeight = calcWidth * 0.8;
        const calcX = startX + padding;
        const calcY = startY + padding + (safeZone - calcHeight) / 2;
        
        // Calculator body
        ctx.fillRect(calcX, calcY, calcWidth, calcHeight);
        
        // Display area
        ctx.fillStyle = '#2d3748';
        const displayHeight = calcHeight * 0.25;
        ctx.fillRect(calcX + calcWidth * 0.1, calcY + calcHeight * 0.1, calcWidth * 0.8, displayHeight);
        
        // Buttons
        ctx.fillStyle = '#e2e8f0';
        const buttonSize = calcWidth * 0.15;
        const buttonSpacing = calcWidth * 0.05;
        const buttonsStartY = calcY + calcHeight * 0.45;
        
        // Add some buttons for visual appeal
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const x = calcX + calcWidth * 0.1 + (buttonSize + buttonSpacing) * i;
                const y = buttonsStartY + (buttonSize + buttonSpacing) * j;
                ctx.fillRect(x, y, buttonSize, buttonSize);
            }
        }
    } else {
        // Regular icon (full canvas)
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#4299e1');
        gradient.addColorStop(1, '#3182ce');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        
        // Calculator icon
        ctx.fillStyle = 'white';
        const padding = size * 0.2;
        const calcWidth = size - (padding * 2);
        const calcHeight = calcWidth * 0.8;
        const calcX = padding;
        const calcY = padding + (size - calcHeight) / 2;
        
        // Calculator body
        ctx.fillRect(calcX, calcY, calcWidth, calcHeight);
        
        // Display area
        ctx.fillStyle = '#2d3748';
        const displayHeight = calcHeight * 0.25;
        ctx.fillRect(calcX + calcWidth * 0.1, calcY + calcHeight * 0.1, calcWidth * 0.8, displayHeight);
        
        // Buttons
        ctx.fillStyle = '#e2e8f0';
        const buttonSize = calcWidth * 0.15;
        const buttonSpacing = calcWidth * 0.05;
        const buttonsStartY = calcY + calcHeight * 0.45;
        
        // First row of buttons
        for (let i = 0; i < 4; i++) {
            const x = calcX + calcWidth * 0.1 + (buttonSize + buttonSpacing) * i;
            ctx.fillRect(x, buttonsStartY, buttonSize, buttonSize);
        }
        
        // Second row of buttons
        for (let i = 0; i < 4; i++) {
            const x = calcX + calcWidth * 0.1 + (buttonSize + buttonSpacing) * i;
            ctx.fillRect(x, buttonsStartY + buttonSize + buttonSpacing, buttonSize, buttonSize);
        }
        
        // Third row of buttons
        for (let i = 0; i < 4; i++) {
            const x = calcX + calcWidth * 0.1 + (buttonSize + buttonSpacing) * i;
            ctx.fillRect(x, buttonsStartY + (buttonSize + buttonSpacing) * 2, buttonSize, buttonSize);
        }
        
        // Fourth row (zero button is wider)
        ctx.fillRect(calcX + calcWidth * 0.1, buttonsStartY + (buttonSize + buttonSpacing) * 3, buttonSize * 2 + buttonSpacing, buttonSize);
        ctx.fillRect(calcX + calcWidth * 0.1 + (buttonSize + buttonSpacing) * 3, buttonsStartY + (buttonSize + buttonSpacing) * 3, buttonSize, buttonSize);
    }
    
    return canvas;
}

console.log('Generating icons...');

// Generate all icons
sizes.forEach(size => {
    // Regular icon
    const canvas = createIcon(size, false);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`./icons/icon-${size}x${size}.png`, buffer);
    console.log(`Generated: icon-${size}x${size}.png`);
    
    // Maskable icon
    const maskableCanvas = createIcon(size, true);
    const maskableBuffer = maskableCanvas.toBuffer('image/png');
    fs.writeFileSync(`./icons/icon-${size}x${size}-maskable.png`, maskableBuffer);
    console.log(`Generated: icon-${size}x${size}-maskable.png`);
});

console.log('All icons generated successfully!'); 