// models/TimeSlot.js
import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true, index: true },
    startTime: { type: String, required: true }, // "HH:MM"
    endTime: { type: String, required: true },   // "HH:MM"
    maxParticipants: { type: Number, required: true, min: 1 },
    currentParticipants: { type: Number, default: 0, min: 0 },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('TimeSlot', timeSlotSchema);