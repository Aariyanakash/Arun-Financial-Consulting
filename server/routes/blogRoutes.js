import express from 'express';
import {
    addBlog,
    editBlog,
    addComment,
    deleteBlogById,
    getAllBlogs,
    getRecentPosts,
    searchBlogs,
    getBlogById,
    getBlogComments,
    togglePublish,
    uploadEditorImage
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'), auth, addBlog);
blogRouter.post("/edit", upload.single('image'), auth, editBlog);

blogRouter.get("/all", getAllBlogs);

blogRouter.get("/search", searchBlogs);
blogRouter.get("/recent", getRecentPosts);

blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);

blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);

blogRouter.post("/upload-editor-image", upload.single('image'), uploadEditorImage);

export default blogRouter;