const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust the X-Forwarded-* headers from Vercel's proxy
app.set('trust proxy', 1);

// Performance optimizations
app.use((req, res, next) => {
  // Cache static assets for 1 year
  if (req.url.match(/\.(css|js|jpg|jpeg|png|gif|svg|ico)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
  // Cache HTML for 1 hour
  else if (req.url.match(/\.html$/) || req.url === '/') {
    res.setHeader('Cache-Control', 'public, max-age=3600');
  }
  next();
});

// Serve static files from root
app.use(express.static(path.join(__dirname), {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));

// Serve root page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve reels page
app.get('/reels', (req, res) => {
  res.sendFile(path.join(__dirname, 'reels.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head><title>Page Not Found</title></head>
      <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/" style="color: #6366f1;">Go Home</a>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio running at http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
