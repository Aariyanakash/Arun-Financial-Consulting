// routes/adminRoutes.js
import express from "express";
import {
    adminLogin,
    approveCommentById,
    deleteCommentById,
    getAllBlogsAdmin,
    getAllComments,
    getDashboard,
    createTimeSlots,
    getAllTimeSlotsAdmin,
    updateTimeSlots,
    deleteTimeSlots
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard", auth, getDashboard);

// Admin CRUD for slots
adminRouter.post("/timeslots", auth, createTimeSlots);
adminRouter.get('/timeslots', auth, getAllTimeSlotsAdmin);
adminRouter.put("/timeslots/:id", auth, updateTimeSlots);
adminRouter.delete("/timeslots/:id", auth, deleteTimeSlots);

export default adminRouter;