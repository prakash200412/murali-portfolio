const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create portfolio directory if it doesn't exist
const portfolioDir = path.join(__dirname, 'static', 'portfolio');
if (!fs.existsSync(portfolioDir)) {
  fs.mkdirSync(portfolioDir, { recursive: true });
}

// Function to generate a placeholder image
function generatePlaceholder(width, height, text, filename) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#6366f1');
  gradient.addColorStop(1, '#ec4899');
  
  // Draw background
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  
  // Save to file
  const out = fs.createWriteStream(path.join(portfolioDir, filename));
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  
  return new Promise((resolve) => {
    out.on('finish', () => resolve());
  });
}

// Generate placeholders
async function generateAllPlaceholders() {
  try {
    await generatePlaceholder(800, 450, 'Project 1', 'project1.jpg');
    await generatePlaceholder(800, 450, 'Project 2', 'project2.jpg');
    await generatePlaceholder(800, 450, 'Project 3', 'project3.jpg');
    console.log('Placeholder images generated successfully!');
  } catch (error) {
    console.error('Error generating placeholders:', error);
  }
}

generateAllPlaceholders();
