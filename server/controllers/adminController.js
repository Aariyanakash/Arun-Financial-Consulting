// controllers/adminController.js
import jwt from 'jsonwebtoken';
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import TimeSlot from "../models/TimeSlot.js";

/* =========================
   AUTH / BLOG / COMMENTS
   ========================= */
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Invalid Credentials' });
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate('blog').sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (e) {
        res.json({ success: false, message: e.message });
    }
};

export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });

        const dashboardData = { blogs, comments, drafts, recentBlogs };
        res.json({ success: true, dashboardData });
    } catch (e) {
        res.json({ success: false, message: e.message });
    }
};

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({ success: true, message: "Comment deleted successfully." });
    } catch (e) {
        res.json({ success: false, message: e.message });
    }
};

export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({ success: true, message: "Comment approved successfully." });
    } catch (e) {
        res.json({ success: false, message: e.message });
    }
};

/* =========================
   TIME SLOTS (Flat schema)
   ========================= */
// Accepts:
// 1) { slots: [ {...flat slot...} ] }
// 2) [ {...}, {...} ]
// 3) { date, timeSlots:[ {title,startTime,endTime,maxParticipants,description,isActive} ] } -> exploded to flat docs
// 4) single flat slot object
export const createTimeSlots = async (req, res) => {
    try {
        let payload = req.body;
        let slots = [];

        if (Array.isArray(payload)) {
            slots = payload;
        } else if (Array.isArray(payload.slots)) {
            slots = payload.slots;
        } else if (payload?.date && Array.isArray(payload.timeSlots)) {
            const dateISO = new Date(payload.date);
            slots = payload.timeSlots.map(s => ({ ...s, date: dateISO }));
        } else if (payload && payload.title) {
            slots = [payload];
        }

        if (!Array.isArray(slots) || slots.length === 0) {
            return res.json({ success: false, message: "Provide at least one slot" });
        }

        const docs = slots.map(s => ({
            title: s.title,
            date: new Date(s.date),
            startTime: s.startTime,
            endTime: s.endTime,
            maxParticipants: Number(s.maxParticipants),
            currentParticipants: Number(s.currentParticipants || 0),
            description: s.description || "",
            isActive: s.isActive !== false,
        }));

        const created = await TimeSlot.insertMany(docs);
        return res.json({ success: true, created });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

/**
 * PUBLIC getter for embeddable widget:
 * Query params:
 * - active=true|false (optional) -> filter by isActive (default: true)
 * - includePast=true|false (default: false) -> include past dates
 * - includeFull=true|false (default: true) -> include slots at capacity
 */
export const getPublicAvailableTimeSlots = async (req, res) => {
    try {
        const { active = 'true', includePast = 'false', includeFull = 'true' } = req.query;

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const filter = {};

        // Filter by isActive status
        if (active === 'true') filter.isActive = true;
        if (active === 'false') filter.isActive = false;

        // Filter by date
        if (includePast !== 'true') {
            filter.date = { $gte: today };
        }

        const docs = await TimeSlot.find(filter)
            .sort({ date: 1, startTime: 1 })
            .lean();

        // Filter by capacity if needed
        const result = includeFull === 'true'
            ? docs
            : docs.filter(d => Number(d.maxParticipants) > Number(d.currentParticipants || 0));

        return res.json({ success: true, timeSlots: result });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

/**
 * ADMIN getter (flexible):
 * Query params:
 * - includePast=true|false (default: true)   -> when false, only future
 * - includeFull=true|false (default: true)   -> when false, filter to capacity
 * - active=true|false (optional)             -> filter by isActive exactly
 */
export const getAllTimeSlotsAdmin = async (req, res) => {
    try {
        const { includePast = 'true', includeFull = 'true', active } = req.query;

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const filter = {};
        if (includePast !== 'true') {
            filter.date = { $gte: today };
        }
        if (active === 'true') filter.isActive = true;
        if (active === 'false') filter.isActive = false;

        const docs = await TimeSlot.find(filter)
            .sort({ date: 1, startTime: 1 })
            .lean();

        const result =
            includeFull === 'true'
                ? docs
                : docs.filter(d => Number(d.maxParticipants) > Number(d.currentParticipants || 0));

        return res.json({ success: true, timeSlots: result });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

/**
 * Backward-compat alias:
 * If your routes still import { getTimeSlots }, this will return the PUBLIC set.
 * Prefer updating routes to use getAllTimeSlotsAdmin for the admin UI, and
 * getPublicAvailableTimeSlots for /public/timeslots.
 */
export const getTimeSlots = getPublicAvailableTimeSlots;

export const updateTimeSlots = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const updated = await TimeSlot.findByIdAndUpdate(id, update, { new: true });
        if (!updated) return res.json({ success: false, message: "Time slot not found" });
        return res.json({ success: true, slot: updated });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const deleteTimeSlots = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await TimeSlot.findByIdAndDelete(id);
        if (!deleted) return res.json({ success: false, message: "Time slot not found" });
        return res.json({ success: true, message: "Time slot deleted" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
