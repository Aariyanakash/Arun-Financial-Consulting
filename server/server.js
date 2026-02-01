// server.js
import express from 'express';
import 'dotenv/config.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import { getPublicAvailableTimeSlots } from './controllers/adminController.js';
import { sendContactEmail } from './controllers/contactController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to DB once
let dbConnected = false;
(async () => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (err) {
      console.error('DB Connection Error:', err);
    }
  }
})();

app.use(cors());
app.use(express.json());

// Health check endpoints FIRST
app.get('/health', (req, res) => res.json({ status: 'OK', method: 'GET' }));
app.post('/health', (req, res) => res.json({ status: 'OK', method: 'POST' }));

// API routes
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

// Public endpoints
app.get('/public/timeslots', getPublicAvailableTimeSlots);
app.post('/public/contact', sendContactEmail);

// Home endpoint
app.get('/', (req, res) => res.send('App is working'));

// Then serve static files from client build
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));

// Serve React app for all other routes (SPA fallback) - MUST BE LAST
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Development mode
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}

// Export for both Vercel serverless and standard Node
export default app;
export const handler = app;
