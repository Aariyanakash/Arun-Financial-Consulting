import React from 'react';
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
    const { axios } = useAppContext();
    const navigate = useNavigate();

    const deleteBlog = async () => {
        const confirm = window.confirm("Are you sure you want to delete this blog?");
        if (!confirm) return;
        try {
            const { data } = await axios.post('/api/blog/delete', { id: blog._id });
            if (data.success) {
                toast.success(data.message);
                await fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const togglePublishStatus = async () => {
        try {
            const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
            if (data.success) {
                toast.success(data.message);
                await fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || "An error occurred");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <tr className='hover:bg-gray-50 transition-colors duration-150 border-b border-gray-200'>
            {/* Index */}
            <td className='px-4 py-3 whitespace-nowrap'>
                <span className='text-sm font-medium text-gray-900'>{index}</span>
            </td>

            {/* Blog Title with Image */}
            <td className='px-4 py-3'>
                <div className='flex items-center gap-3'>
                    {blog.image && (
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className='w-10 h-10 rounded-md object-cover flex-shrink-0'
                        />
                    )}
                    <div className='min-w-0 flex-1'>
                        <p className='text-sm font-medium text-gray-900 truncate hover:text-blue-600 cursor-pointer transition-colors'>
                            {blog.title || 'Untitled'}
                        </p>
                        {blog.description && (
                            <p className='text-xs text-gray-500 mt-0.5 truncate'>
                                {blog.description.length > 60
                                    ? `${blog.description.substring(0, 60)}...`
                                    : blog.description
                                }
                            </p>
                        )}
                    </div>
                </div>
            </td>

            {/* Date */}
            <td className='px-4 py-3 whitespace-nowrap max-sm:hidden'>
                <div className='text-sm text-gray-900'>
                    {formatDate(blog.createdAt)}
                </div>
                <div className='text-xs text-gray-500'>
                    {new Date(blog.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </td>

            {/* Status - Compact version */}
            <td className='px-4 py-3 whitespace-nowrap max-sm:hidden'>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    blog.isPublished
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                }`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                        blog.isPublished ? 'bg-green-500' : 'bg-gray-500'
                    }`}></span>
                    {blog.isPublished ? 'Published' : 'Draft'}
                </span>
            </td>

            {/* Actions */}
            <td className='px-4 py-3 whitespace-nowrap'>
                <div className='flex items-center gap-1'>
                    {/* Edit Button */}
                    <button
                        className='inline-flex items-center px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1'
                        onClick={() => navigate(`/admin/addBlog/${blog._id}`)}
                        title="Edit blog"
                    >
                        <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                        </svg>
                        <span className='ml-1 hidden sm:inline'>Edit</span>
                    </button>

                    {/* Publish/Unpublish Toggle */}
                    <button
                        onClick={togglePublishStatus}
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                            blog.isPublished
                                ? 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-500'
                                : 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500'
                        }`}
                        title={blog.isPublished ? 'Unpublish blog' : 'Publish blog'}
                    >
                        {blog.isPublished ? (
                            <>
                                <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' />
                                </svg>
                                <span className='ml-1 hidden sm:inline'>Hide</span>
                            </>
                        ) : (
                            <>
                                <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                </svg>
                                <span className='ml-1 hidden sm:inline'>Publish</span>
                            </>
                        )}
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={deleteBlog}
                        className='inline-flex items-center px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1'
                        title="Delete blog"
                    >
                        <img src={assets.cross_icon} alt='Delete' className='w-3 h-3 filter invert' />
                        <span className='ml-1 hidden sm:inline'>Delete</span>
                    </button>
                </div>

                {/* Mobile Status */}
                <div className='sm:hidden mt-1'>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        blog.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}>
                        {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                </div>
            </td>
        </tr>
    );
};

export default BlogTableItem;
