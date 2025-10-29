import React, { useEffect, useState } from 'react';
import CommentTableItem from "../../components/admin/CommentTableItem.jsx";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [filter, setFilter] = useState('Not Approved');
    const { axios, tokenReady } = useAppContext();

    const fetchComments = async () => {
        try {
            const { data } = await axios.get('/api/admin/comments');
            if (data.success) {
                setComments(data.comments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (tokenReady) fetchComments();
    }, [tokenReady]);

    const filteredComments = comments.filter(comment =>
        filter === 'Approved' ? comment.isApproved : !comment.isApproved
    );

    const approvedCount = comments.filter(c => c.isApproved).length;
    const pendingCount = comments.filter(c => !c.isApproved).length;

    return (
        <div className='flex-1 bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-full'>
            <div className='p-6 lg:p-8'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>Comments Management</h1>
                    <p className='text-gray-600'>Manage and moderate blog comments</p>
                </div>

                {/* Stats and Filter */}
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8'>
                    {/* Stats */}
                    <div className='flex gap-4'>
                        <div className='bg-white rounded-xl p-4 shadow-sm border border-gray-100'>
                            <div className='flex items-center gap-3'>
                                <div className='bg-green-50 p-2 rounded-lg'>
                                    <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-2xl font-bold text-gray-900'>{approvedCount}</p>
                                    <p className='text-sm text-gray-600'>Approved</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl p-4 shadow-sm border border-gray-100'>
                            <div className='flex items-center gap-3'>
                                <div className='bg-amber-50 p-2 rounded-lg'>
                                    <svg className='w-5 h-5 text-amber-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-2xl font-bold text-gray-900'>{pendingCount}</p>
                                    <p className='text-sm text-gray-600'>Pending</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    <div className='flex gap-3'>
                        <button
                            onClick={() => setFilter('Approved')}
                            className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                                filter === 'Approved'
                                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <span className='flex items-center gap-2'>
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                </svg>
                                Approved ({approvedCount})
                            </span>
                        </button>
                        <button
                            onClick={() => setFilter('Not Approved')}
                            className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                                filter === 'Not Approved'
                                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <span className='flex items-center gap-2'>
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                                Pending ({pendingCount})
                            </span>
                        </button>
                    </div>
                </div>

                {/* Comments Table */}
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100'>
                    <div className='p-6 border-b border-gray-100'>
                        <h2 className='text-xl font-semibold text-gray-900'>
                            {filter === 'Approved' ? 'Approved Comments' : 'Pending Comments'}
                        </h2>
                        <p className='text-sm text-gray-500 mt-1'>
                            {filteredComments.length} comment{filteredComments.length !== 1 ? 's' : ''} found
                        </p>
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='bg-gray-50 border-b border-gray-200'>
                            <tr>
                                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Blog Title & Comment
                                </th>
                                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-sm:hidden'>
                                    Date
                                </th>
                                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                            {filteredComments.length > 0 ? (
                                filteredComments.map((comment, index) => (
                                    <CommentTableItem
                                        key={comment._id}
                                        comment={comment}
                                        index={index + 1}
                                        fetchComments={fetchComments}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className='text-center py-12'>
                                        <div className='flex flex-col items-center justify-center'>
                                            <div className='bg-gray-100 rounded-full p-4 mb-4'>
                                                <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                                                </svg>
                                            </div>
                                            <p className='text-gray-500 font-medium'>
                                                No {filter.toLowerCase()} comments found
                                            </p>
                                            <p className='text-gray-400 text-sm'>
                                                {filter === 'Approved'
                                                    ? 'Comments will appear here once approved'
                                                    : 'New comments will appear here for review'
                                                }
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;