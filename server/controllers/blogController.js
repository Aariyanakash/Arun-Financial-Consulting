import imageKit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;
        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, message: "Missing required fields" });
        }
        const fileBuffer = req.file.buffer;
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        });
        const optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '1280' }
            ]
        });
        const image = optimizedImageUrl;
        await Blog.create({
            title, subTitle, description, category, image, isPublished
        });
        res.json({ success: true, message: "Successfully uploaded blog" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const editBlog = async (req, res) => {
    try {
        const { id, title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        let image = blog.image;
        if (imageFile) {
            const fileBuffer = imageFile.buffer;
            const response = await imageKit.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: '/blogs'
            });
            image = imageKit.url({
                path: response.filePath,
                transformation: [
                    { quality: 'auto' },
                    { format: 'webp' },
                    { width: '1280' }
                ]
            });
        }
        blog.title = title ?? blog.title;
        blog.subTitle = subTitle ?? blog.subTitle;
        blog.description = description ?? blog.description;
        blog.category = category ?? blog.category;
        blog.isPublished = typeof isPublished === "boolean" ? isPublished : blog.isPublished;
        blog.image = image;
        await blog.save();
        res.json({ success: true, message: "Blog updated successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true });
        const transformedBlogs = blogs.map(blog => ({
            ...blog.toObject(),
            id: blog._id.toString()
        }));
        res.json({ success: true, blogs: transformedBlogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getRecentPosts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const blogs = await Blog.find({ isPublished: true })
            .sort({ createdAt: -1 })
            .limit(limit);
        const transformedBlogs = blogs.map(blog => ({
            ...blog.toObject(),
            id: blog._id.toString()
        }));
        res.json({ success: true, blogs: transformedBlogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const searchBlogs = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.json({ success: false, message: "Missing search term" });
        const regex = new RegExp(q, 'i');
        const blogs = await Blog.find({
            isPublished: true,
            $or: [
                { title: regex },
                { subTitle: regex },
                { description: regex }
            ]
        });
        const transformedBlogs = blogs.map(blog => ({
            ...blog.toObject(),
            id: blog._id.toString()
        }));
        res.json({ success: true, blogs: transformedBlogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try{
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        res.json({success: true, blog});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const deleteBlogById = async (req, res) => {
    try{
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        await Comment.deleteMany({ blog: id });
        res.json({ success: true, message: "Successfully deleted blog and associated comments" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const togglePublish = async (req, res) => {
    try{
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "Successfully updated blog" });
    }catch(err){
        res.json({success: false, message: err.message});
    }
}

export const addComment = async (req, res) => {
    try{
        const { blog, name, content } = req.body;
        await Comment.create({blog, name, content});
        res.json({success: true, message: "Successfully created comment" });
    } catch (e) {
        res.json({ success: false, message: e.message });
    }
}

export const getBlogComments = async (req, res) => {
    try{
        const { blogId } = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({success: true, comments});
    } catch (e) {
        res.json({ success: false, message: e.message });
    }
}

export const uploadEditorImage = async (req, res) => {
    try {
        const imageFile = req.file;
        if (!imageFile) return res.json({ success: false, message: "No file provided" });
        const fileBuffer = imageFile.buffer;
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blog-content'
        });
        const optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '1280' }
            ]
        });
        res.json({ success: true, url: optimizedImageUrl });
    } catch (e) {
        res.json({ success: false, message: e.message });
    }
};
