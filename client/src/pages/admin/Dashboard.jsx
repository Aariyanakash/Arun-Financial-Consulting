import React, { useEffect, useState } from 'react';
import { assets } from "../../assets/assets.js";
import BlogTableItem from "../../components/admin/BlogTableItem.jsx";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";

const Dashboard = () => {
    const [dashboarddata, setDashboarddata] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    });

    const { axios, tokenReady } = useAppContext();

    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get('/api/admin/dashboard');
            if (data.success && data.dashboardData) {
                setDashboarddata(data.dashboardData);
            } else {
                toast.error(data.msg || data.message || "Could not fetch dashboard.");
            }
        } catch (error) {
            toast.error(error.message || "Could not fetch dashboard.");
        }
    };

    useEffect(() => {
        if (tokenReady) {
            fetchDashboard();
        }
    }, [tokenReady]);

    const statCards = [
        {
            icon: assets.dashboard_icon_1,
            value: dashboarddata.blogs,
            label: 'Total Blogs',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            icon: assets.dashboard_icon_2,
            value: dashboarddata.comments,
            label: 'Comments',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50'
        },
        {
            icon: assets.dashboard_icon_3,
            value: dashboarddata.drafts,
            label: 'Drafts',
            color: 'from-amber-500 to-amber-600',
            bgColor: 'bg-amber-50'
        }
    ];

    return (
        <div className='flex-1 bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-full'>
            <div className='p-6 lg:p-8'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>Dashboard</h1>
                    <p className='text-gray-600'>Welcome back! Here's what's happening with your blog.</p>
                </div>

                {/* Stats Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8'>
                    {statCards.map((card, index) => (
                        <div
                            key={index}
                            className='group relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
                        >
                            <div className='p-6'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex-1'>
                                        <p className='text-3xl font-bold text-gray-900 mb-1'>
                                            {card.value.toLocaleString()}
                                        </p>
                                        <p className='text-sm font-medium text-gray-600'>{card.label}</p>
                                    </div>
                                    <div className={`${card.bgColor} p-4 rounded-xl`}>
                                        <img src={card.icon} alt='' className='w-8 h-8' />
                                    </div>
                                </div>
                            </div>
                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`}></div>
                        </div>
                    ))}
                </div>

                {/* Analytics Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                    {/* Recent Activity */}
                    <div className='bg-white rounded-2xl shadow-sm border border-gray-100'>
                        <div className='p-6 border-b border-gray-100'>
                            <div className='flex items-center gap-3'>
                                <div className='bg-purple-50 p-2 rounded-lg'>
                                    <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className='text-xl font-semibold text-gray-900'>Recent Activity</h2>
                                    <p className='text-sm text-gray-500'>Latest actions and updates</p>
                                </div>
                            </div>
                        </div>
                        <div className='p-6'>
                            <div className='space-y-4'>
                                {dashboarddata.recentBlogs.slice(0, 3).map((blog, index) => (
                                    <div key={blog._id} className='flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors'>
                                        <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                                            <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                                            </svg>
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <p className='text-sm font-medium text-gray-900 truncate'>
                                                {blog.title}
                                            </p>
                                            <p className='text-xs text-gray-500'>
                                                {blog.isPublished ? 'Published' : 'Draft'} • {new Date(blog.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            blog.isPublished
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-amber-100 text-amber-800'
                                        }`}>
                                            {blog.isPublished ? 'Live' : 'Draft'}
                                        </span>
                                    </div>
                                ))}
                                {dashboarddata.recentBlogs.length === 0 && (
                                    <div className='text-center py-8'>
                                        <div className='bg-gray-100 rounded-full p-3 w-12 h-12 mx-auto mb-3'>
                                            <svg className='w-6 h-6 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                                            </svg>
                                        </div>
                                        <p className='text-sm text-gray-500'>No recent activity</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className='bg-white rounded-2xl shadow-sm border border-gray-100'>
                        <div className='p-6 border-b border-gray-100'>
                            <div className='flex items-center gap-3'>
                                <div className='bg-indigo-50 p-2 rounded-lg'>
                                    <svg className='w-6 h-6 text-indigo-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className='text-xl font-semibold text-gray-900'>Performance</h2>
                                    <p className='text-sm text-gray-500'>Content analytics overview</p>
                                </div>
                            </div>
                        </div>
                        <div className='p-6'>
                            <div className='space-y-6'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-sm font-medium text-gray-600'>Publication Rate</p>
                                        <p className='text-2xl font-bold text-gray-900'>
                                            {dashboarddata.blogs > 0 ? Math.round((dashboarddata.blogs - dashboarddata.drafts) / dashboarddata.blogs * 100) : 0}%
                                        </p>
                                    </div>
                                    <div className='w-16 h-16 relative'>
                                        <svg className='w-16 h-16 transform -rotate-90' viewBox='0 0 36 36'>
                                            <path
                                                d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                                                fill='none'
                                                stroke='#e5e7eb'
                                                strokeWidth='3'
                                            />
                                            <path
                                                d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                                                fill='none'
                                                stroke='#3b82f6'
                                                strokeWidth='3'
                                                strokeDasharray={`${dashboarddata.blogs > 0 ? (dashboarddata.blogs - dashboarddata.drafts) / dashboarddata.blogs * 100 : 0}, 100`}
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='text-center p-3 bg-green-50 rounded-lg'>
                                        <p className='text-xl font-bold text-green-700'>{dashboarddata.blogs - dashboarddata.drafts}</p>
                                        <p className='text-xs text-green-600'>Published</p>
                                    </div>
                                    <div className='text-center p-3 bg-amber-50 rounded-lg'>
                                        <p className='text-xl font-bold text-amber-700'>{dashboarddata.drafts}</p>
                                        <p className='text-xs text-amber-600'>Drafts</p>
                                    </div>
                                </div>

                                <div className='pt-4 border-t border-gray-100'>
                                    <div className='flex items-center justify-between mb-2'>
                                        <span className='text-sm text-gray-600'>Comments</span>
                                        <span className='text-sm font-semibold text-gray-900'>{dashboarddata.comments}</span>
                                    </div>
                                    <div className='w-full bg-gray-200 rounded-full h-2'>
                                        <div
                                            className='bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full'
                                            style={{ width: `${Math.min(dashboarddata.comments / 10 * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100'>
                    <div className='p-6 border-b border-gray-100'>
                        <h2 className='text-xl font-semibold text-gray-900'>Quick Actions</h2>
                        <p className='text-sm text-gray-500'>Common tasks and shortcuts</p>
                    </div>
                    <div className='p-6'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <button
                                onClick={() => window.location.href = '/admin/addBlog'}
                                className='flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group'
                            >
                                <div className='bg-blue-500 p-3 rounded-lg group-hover:bg-blue-600 transition-colors'>
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                                    </svg>
                                </div>
                                <div className='text-left'>
                                    <p className='font-semibold text-gray-900'>Write New Blog</p>
                                    <p className='text-sm text-gray-600'>Create a new post</p>
                                </div>
                            </button>

                            <button
                                onClick={() => window.location.href = '/admin/listBlog'}
                                className='flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200 group'
                            >
                                <div className='bg-green-500 p-3 rounded-lg group-hover:bg-green-600 transition-colors'>
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                                    </svg>
                                </div>
                                <div className='text-left'>
                                    <p className='font-semibold text-gray-900'>Manage Posts</p>
                                    <p className='text-sm text-gray-600'>Edit existing blogs</p>
                                </div>
                            </button>

                            <button
                                onClick={() => window.location.href = '/admin/comments'}
                                className='flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-200 group'
                            >
                                <div className='bg-purple-500 p-3 rounded-lg group-hover:bg-purple-600 transition-colors'>
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                                    </svg>
                                </div>
                                <div className='text-left'>
                                    <p className='font-semibold text-gray-900'>Review Comments</p>
                                    <p className='text-sm text-gray-600'>Moderate discussions</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;