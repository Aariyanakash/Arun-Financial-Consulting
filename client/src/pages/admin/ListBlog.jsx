import React, { useEffect, useState } from 'react';
import BlogTableItem from "../../components/admin/BlogTableItem.jsx";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";

const ListBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const { axios, tokenReady } = useAppContext();

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/admin/blogs');
            if (data.success) {
                setBlogs(data.blogs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (tokenReady) fetchBlogs();
    }, [tokenReady]);

    // Filter blogs based on search term and status
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' ||
            (statusFilter === 'Published' && blog.isPublished) ||
            (statusFilter === 'Draft' && !blog.isPublished);
        return matchesSearch && matchesStatus;
    });

    const publishedCount = blogs.filter(blog => blog.isPublished).length;
    const draftCount = blogs.filter(blog => !blog.isPublished).length;

    return (
        <div className='flex-1 bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-full'>
            <div className='p-6 lg:p-8'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>Blog Management</h1>
                    <p className='text-gray-600'>Manage all your blog posts in one place</p>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                    <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
                        <div className='flex items-center gap-4'>
                            <div className='bg-blue-50 p-3 rounded-xl'>
                                <svg className='w-8 h-8 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                                </svg>
                            </div>
                            <div>
                                <p className='text-3xl font-bold text-gray-900'>{blogs.length}</p>
                                <p className='text-gray-600 font-medium'>Total Blogs</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
                        <div className='flex items-center gap-4'>
                            <div className='bg-green-50 p-3 rounded-xl'>
                                <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                </svg>
                            </div>
                            <div>
                                <p className='text-3xl font-bold text-gray-900'>{publishedCount}</p>
                                <p className='text-gray-600 font-medium'>Published</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
                        <div className='flex items-center gap-4'>
                            <div className='bg-amber-50 p-3 rounded-xl'>
                                <svg className='w-8 h-8 text-amber-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                                </svg>
                            </div>
                            <div>
                                <p className='text-3xl font-bold text-gray-900'>{draftCount}</p>
                                <p className='text-gray-600 font-medium'>Drafts</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8'>
                    {/* Search */}
                    <div className='relative flex-1 max-w-md'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                            </svg>
                        </div>
                        <input
                            type='text'
                            placeholder='Search blogs...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                    </div>

                    {/* Status Filter */}
                    <div className='flex gap-3'>
                        {['All', 'Published', 'Draft'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                                    statusFilter === status
                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                {status}
                                {status === 'All' && ` (${blogs.length})`}
                                {status === 'Published' && ` (${publishedCount})`}
                                {status === 'Draft' && ` (${draftCount})`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blogs Table */}
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100'>
                    <div className='p-6 border-b border-gray-100'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h2 className='text-xl font-semibold text-gray-900'>All Blogs</h2>
                                <p className='text-sm text-gray-500 mt-1'>
                                    {filteredBlogs.length} of {blogs.length} blog{blogs.length !== 1 ? 's' : ''}
                                    {searchTerm && ` matching "${searchTerm}"`}
                                </p>
                            </div>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className='text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1'
                                >
                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                    </svg>
                                    Clear search
                                </button>
                            )}
                        </div>
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='bg-gray-50 border-b border-gray-200'>
                            <tr>
                                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>#</th>
                                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Blog Title</th>
                                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-sm:hidden'>Date</th>
                                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-sm:hidden'>Status</th>
                                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Actions</th>
                            </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                            {filteredBlogs.length > 0 ? (
                                filteredBlogs.map((blog, index) => (
                                    <BlogTableItem
                                        key={blog._id}
                                        blog={blog}
                                        fetchBlogs={fetchBlogs}
                                        index={index + 1}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-12">
                                        <div className='flex flex-col items-center justify-center'>
                                            <div className='bg-gray-100 rounded-full p-4 mb-4'>
                                                {searchTerm ? (
                                                    <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                                                    </svg>
                                                ) : (
                                                    <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                                                    </svg>
                                                )}
                                            </div>
                                            <p className='text-gray-500 font-medium'>
                                                {searchTerm ? `No blogs match "${searchTerm}"` : 'No blogs found'}
                                            </p>
                                            <p className='text-gray-400 text-sm'>
                                                {searchTerm ? 'Try adjusting your search terms' : 'Start by creating your first blog post'}
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

export default ListBlog;