// server.js
import express from 'express';
import 'dotenv/config.js';
import cors from 'cors';
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import { getPublicAvailableTimeSlots } from './controllers/adminController.js';
import { sendContactEmail } from './controllers/contactController.js';

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('App is working'));

// Admin & Blog routes (admin is protected by auth inside router)
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

// Public, unauthenticated endpoints for the front-end:
app.get('/public/timeslots', getPublicAvailableTimeSlots);
app.post('/public/contact', sendContactEmail);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

export default app;
