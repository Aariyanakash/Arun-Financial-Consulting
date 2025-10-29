import React from 'react';
import { assets } from "../../assets/assets.js";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext.jsx";

const CommentTableItem = ({ comment, fetchComments, index }) => {
    const { blog, createdAt, _id, name, content, isApproved } = comment;
    const { axios } = useAppContext();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const approveComment = async () => {
        try {
            const { data } = await axios.post('/api/admin/approve-comment', { id: _id });
            if (data.success) {
                toast.success(data.message);
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteComment = async () => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
            if (!confirmDelete) return;

            const { data } = await axios.post('/api/admin/delete-comment', { id: _id });
            if (data.success) {
                toast.success(data.message);
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <tr className='hover:bg-gray-50 transition-colors duration-150 border-b border-gray-200'>
            {/* Index */}
            <td className='px-4 py-3 whitespace-nowrap'>
                <span className='text-sm font-medium text-gray-600'>{index}</span>
            </td>

            {/* Blog Title */}
            <td className='px-4 py-3'>
                <div className='text-sm font-medium text-gray-900 truncate max-w-xs'>
                    {blog.title}
                </div>
            </td>

            {/* Commenter Info */}
            <td className='px-4 py-3'>
                <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0'>
                        <span className='text-white font-semibold text-xs'>
                            {name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <span className='text-sm font-medium text-gray-900 truncate'>{name}</span>
                </div>
            </td>

            {/* Comment Content */}
            <td className='px-4 py-3 max-w-md'>
                <p className='text-sm text-gray-700 line-clamp-2'>
                    {content.length > 100 ? `${content.substring(0, 100)}...` : content}
                </p>
            </td>

            {/* Date */}
            <td className='px-4 py-3 whitespace-nowrap max-sm:hidden'>
                <div className='text-sm text-gray-900'>
                    {formatDate(createdAt)}
                </div>
                <div className='text-xs text-gray-500'>
                    {new Date(createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </td>

            {/* Status */}
            <td className='px-4 py-3 whitespace-nowrap max-sm:hidden'>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    isApproved
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                }`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                        isApproved ? 'bg-green-500' : 'bg-amber-500'
                    }`}></span>
                    {isApproved ? 'Approved' : 'Pending'}
                </span>
            </td>

            {/* Actions */}
            <td className='px-4 py-3 whitespace-nowrap'>
                <div className='flex items-center gap-1'>
                    {!isApproved && (
                        <button
                            onClick={approveComment}
                            className='inline-flex items-center px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1'
                            title="Approve comment"
                        >
                            <img
                                src={assets.tick_icon}
                                alt="Approve"
                                className='w-3 h-3 filter invert'
                            />
                            <span className='ml-1 hidden sm:inline'>Approve</span>
                        </button>
                    )}

                    <button
                        onClick={deleteComment}
                        className='inline-flex items-center px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1'
                        title="Delete comment"
                    >
                        <img
                            src={assets.bin_icon}
                            alt='Delete'
                            className='w-3 h-3 filter invert'
                        />
                        <span className='ml-1 hidden sm:inline'>Delete</span>
                    </button>
                </div>

                {/* Mobile Status */}
                <div className='sm:hidden mt-1'>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        isApproved
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                    }`}>
                        {isApproved ? 'Approved' : 'Pending'}
                    </span>
                </div>
            </td>
        </tr>
    );
};

export default CommentTableItem;