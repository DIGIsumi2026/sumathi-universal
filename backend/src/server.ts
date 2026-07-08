import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 5000);
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';

app.use(cors({ origin: frontendUrl }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'sumathi-home-backend' });
});

app.get('/api/home', (_req, res) => {
  res.json({
    brand: 'Printop',
    heroWords: ['Trending', 'Modern', 'Creative'],
    stats: [
      { label: 'Prints Delivered', value: '55.6k+' },
      { label: 'Client Satisfaction', value: '99%' },
      { label: 'Fast Delivery', value: '24-48h' }
    ],
    services: ['Custom Apparel', 'Product Packaging', 'Labels & Stickers', 'Large Format']
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body as { name?: string; email?: string; message?: string };

  if (!name || !email || !message) {
    res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    return;
  }

  // Replace this console log with database/email service integration later.
  console.log('New contact message', { name, email, message });
  res.status(201).json({ success: true, message: 'Your message has been received.' });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
