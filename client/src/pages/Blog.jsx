import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import Moment from 'moment';
import Loader from '../components/Loader.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';
import BlogSidebar from '../components/BlogSidebar.jsx';

const Blog = () => {
    const { id } = useParams();
    const { axios } = useAppContext();

    const [data, setData] = useState(null);
    const [comments, setComment] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    // Fetch single blog data
    const fetchBlogData = async () => {
        try {
            const response = await axios.get(`/api/blog/${id}`);
            const data = response.data;
            if (data.success) {
                setData(data.blog);
            } else {
                toast.error(data.msg || 'Failed to load blog');
            }
        } catch (e) {
            toast.error(e.message || 'Error fetching blog');
        }
    };

    // Fetch blog comments
    const fetchComments = async () => {
        try {
            const response = await axios.post('/api/blog/comments', { blogId: id });
            const data = response.data;
            if (data.success) {
                setComment(data.comments);
            } else {
                toast.error(data.message || 'Failed to load comments');
            }
        } catch (error) {
            toast.error(error.message || 'Error fetching comments');
        }
    };

    const addComment = async (e) => {
        e.preventDefault();
        if (!name || !content) {
            toast.error("Please fill in both name and comment.");
            return;
        }
        try {
            const response = await axios.post('/api/blog/add-comment', {
                blog: id,
                name,
                content,
            });
            const data = response.data;
            if (data.success) {
                toast.success("Your comment has been submitted for review.");
                setName('');
                setContent('');
                fetchComments();
            } else {
                toast.error(data.msg || "Failed to submit comment.");
            }
        } catch (error) {
            toast.error(error.message || "Error submitting comment.");
        }
    };

    // Social share
    const handleShare = (platform) => {
        const url = encodeURIComponent(window.location.href);
        const title = data ? encodeURIComponent(data.title) : '';
        let shareUrl = '';
        if (platform === 'facebook') {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        } else if (platform === 'twitter') {
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        } else if (platform === 'linkedin') {
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
        }
        if (shareUrl) window.open(shareUrl, '_blank', 'noopener,noreferrer');
    };

    useEffect(() => {
        if (id) {
            fetchBlogData();
            fetchComments();
        }
    }, [id]);

    if (!data) return <Loader />;

    return (
        <div className="min-h-screen w-full bg-gray-50 pt-24">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16 px-4 -mt-24 pt-32 relative">
                <div className="absolute inset-0">
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-full object-cover object-center opacity-30"
                        style={{ objectPosition: 'center' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent uppercase tracking-[0.3em] text-sm mb-4 font-bold">
                        {data.category || "BLOG"}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight drop-shadow-2xl">
                        {data.title}
                    </h1>
                    {data.subTitle && (
                        <h2 className="text-white/90 text-2xl sm:text-3xl font-light drop-shadow mb-1 truncate">
                            {data.subTitle}
                        </h2>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 text-white/70 mt-6">
                        <span className="flex items-center gap-2 text-base">
                            <img src={assets.user_icon} alt="" className="w-8 h-8 rounded-full border-2 border-white/30 bg-white/20" />
                            <span className="font-semibold">{data.author || "Admin"}</span>
                        </span>
                        <span className="hidden sm:inline">&#8226;</span>
                        <span className="text-sm">Published {Moment(data.createdAt).format('MMM DD, YYYY')}</span>
                        <span className="hidden sm:inline">&#8226;</span>
                        <span className="text-sm">{comments.length} Comments</span>
                    </div>
                </div>
            </section>

            <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 py-8 gap-8">
                {/* Main Blog Content */}
                <main className="flex-1 w-full">
                    <article className="bg-white rounded-xl shadow-sm border border-gray-100 w-full max-w-4xl mx-auto p-8 mt-[-80px] relative z-10">
                        {/* Blog Content */}
                        <div
                            className="rich-text text-gray-800 text-lg leading-relaxed prose max-w-none mb-10"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />

                        {/* Share */}
                        <div className="mb-10 flex items-center gap-4">
                            <span className="font-semibold text-gray-800">Share:</span>
                            <button onClick={() => handleShare('twitter')}
                                    className="w-10 h-10 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 rounded-full flex items-center justify-center transition">
                                {/* ...SVG as before... */}
                                <svg viewBox="0 0 32 32" className="w-6 h-6" fill="#1DA1F2">
                                    <circle cx="16" cy="16" r="16" fill="white" />
                                    <path d="M24 12.17a5.29 5.29 0 0 1-1.53.42 2.65 2.65 0 0 0 1.16-1.47 5.3 5.3 0 0 1-1.68.64A2.65 2.65 0 0 0 16 15.15v.34A7.52 7.52 0 0 1 9.15 11.4a2.65 2.65 0 0 0 .82 3.53 2.65 2.65 0 0 1-1.2-.33v.03a2.65 2.65 0 0 0 2.12 2.6 2.65 2.65 0 0 1-1.2.05 2.65 2.65 0 0 0 2.47 1.83A5.32 5.32 0 0 1 8 22.07a7.54 7.54 0 0 0 4.08 1.2c4.9 0 7.58-4.06 7.58-7.58 0-.12 0-.23-.01-.35A5.43 5.43 0 0 0 24 12.17z" />
                                </svg>
                            </button>
                            <button onClick={() => handleShare('facebook')}
                                    className="w-10 h-10 bg-[#1877F3]/10 hover:bg-[#1877F3]/20 rounded-full flex items-center justify-center transition">
                                <svg viewBox="0 0 32 32" className="w-6 h-6" fill="#1877F3">
                                    <circle cx="16" cy="16" r="16" fill="white" />
                                    <path d="M20.94 16.4l.42-2.74h-2.62v-1.78c0-.75.37-1.48 1.56-1.48h1.2V8.22S19.27 8 18.13 8c-2.1 0-3.47 1.26-3.47 3.55v1.7H12v2.74h2.66V24h3.18V16.4h2.1z" />
                                </svg>
                            </button>
                            <button onClick={() => handleShare('linkedin')}
                                    className="w-10 h-10 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 rounded-full flex items-center justify-center transition">
                                <svg viewBox="0 0 32 32" className="w-6 h-6" fill="#0077B5">
                                    <circle cx="16" cy="16" r="16" fill="white" />
                                    <path d="M12.43 23h-3.06V13.06h3.06V23zM10.9 11.81c-.98 0-1.77-.79-1.77-1.76 0-.98.79-1.77 1.77-1.77.97 0 1.76.79 1.76 1.77 0 .97-.79 1.76-1.76 1.76zm12.1 11.19h-3.06v-4.88c0-1.16-.02-2.65-1.62-2.65-1.62 0-1.87 1.26-1.87 2.56V23h-3.06V13.06h2.94v1.36h.04c.41-.77 1.41-1.58 2.91-1.58 3.12 0 3.7 2.05 3.7 4.71V23z" />
                                </svg>
                            </button>
                        </div>

                        {/* Comments */}
                        <section className="mt-10 mb-6">
                            <h3 className="font-bold text-xl mb-4 text-gray-900">Comments <span className="text-violet-600">({comments.length})</span></h3>
                            <div className="flex flex-col gap-5">
                                {comments.map((comment, index) => (
                                    <div key={index} className="relative bg-violet-50 border border-violet-100 p-4 rounded-xl text-gray-700">
                                        <div className="flex items-center gap-2 mb-1">
                                            <img src={assets.user_icon} alt="" className="w-7 h-7" />
                                            <span className="font-semibold">{comment.name}</span>
                                            <span className="text-gray-400 text-xs">{Moment(comment.createdAt).fromNow()}</span>
                                        </div>
                                        <div className="ml-9 text-base">{comment.content}</div>
                                    </div>
                                ))}
                                {!comments.length && (
                                    <div className="text-gray-400 text-center italic py-4">No comments yet. Be the first!</div>
                                )}
                            </div>
                        </section>

                        {/* Add comment */}
                        <section className="my-8">
                            <h4 className="font-semibold text-lg mb-4 text-gray-900">Add your comment</h4>
                            <form onSubmit={addComment} className="flex flex-col gap-4">
                                <input
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                    type="text"
                                    placeholder="Your name"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-violet-400 transition"
                                />
                                <textarea
                                    onChange={e => setContent(e.target.value)}
                                    value={content}
                                    placeholder="Your comment"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg outline-none h-32 resize-none focus:ring-2 focus:ring-violet-400 transition"
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-violet-600 to-purple-500 text-white font-semibold rounded-lg px-8 py-2 mt-1 hover:from-violet-700 hover:to-purple-600 transition active:scale-95"
                                >
                                    Submit
                                </button>
                            </form>
                        </section>
                    </article>
                </main>

                {/* Right Sidebar - Desktop */}
                <aside className="hidden lg:block w-80 flex-shrink-0">
                    <div className="sticky top-28 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Discover more</h3>
                            <BlogSidebar />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Blog;
