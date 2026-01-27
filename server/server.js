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

await connectDB();

app.use(cors());
app.use(express.json());

// Serve static files from client build
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => res.send('App is working'));

// Admin & Blog routes (admin is protected by auth inside router)
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

// Public, unauthenticated endpoints for the front-end:
app.get('/public/timeslots', getPublicAvailableTimeSlots);
app.post('/public/contact', sendContactEmail);

// Serve React app for all other routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

export default app;
