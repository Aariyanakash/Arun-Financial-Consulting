import React, { useState } from 'react';
import { blogCategories } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import { Link } from 'react-router-dom';
import Moment from 'moment';
import BlogSidebar from '../components/BlogSidebar';

const BlogHome = () => {
    const [menu, setMenu] = useState("All");
    const { blogs, input, blogsReady } = useAppContext();

    const filteredBlogs = () => {
        if (!blogsReady) return [];
        const searchFiltered = input === ''
            ? blogs
            : blogs.filter(blog =>
                blog.title.toLowerCase().includes(input.toLowerCase()) ||
                blog.category.toLowerCase().includes(input.toLowerCase())
            );
        return menu === "All"
            ? searchFiltered
            : searchFiltered.filter(blog =>
                blog.category.toLowerCase() === menu.toLowerCase()
            );
    };

    const blogsToShow = filteredBlogs();

    return (
        <div className="min-h-screen w-full bg-gray-50 pt-24"> {/* Added pt-24 for navbar spacing */}
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16 px-4 -mt-24 pt-32">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent uppercase tracking-[0.3em] text-sm mb-4 font-bold">
                        💡 Financial Insights
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                        Expert insights &
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> market analysis</span>
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                        Stay informed with our latest research, market updates, and strategic financial guidance
                    </p>
                </div>
            </section>

            {/* Mobile Category Selector */}
            <div className="lg:hidden sticky top-20 z-10 bg-white/95 backdrop-blur-xl shadow-sm px-4 py-3 border-b border-gray-100">
                <select
                    onChange={(e) => setMenu(e.target.value)}
                    value={menu}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-700 bg-white"
                >
                    <option value="All">All Categories</option>
                    {blogCategories.map(item => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>
            </div>

            <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 py-8 gap-8">
                {/* Left Sidebar - Desktop */}
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-28 space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 px-2">Categories</h3>
                        {blogCategories.map((item) => (
                            <button
                                key={item}
                                onClick={() => setMenu(item)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium text-base focus:outline-none group
                                    ${menu === item
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                    : 'hover:bg-gray-100 text-gray-700 hover:text-violet-600'
                                }`}
                                tabIndex={0}
                            >
                                <span className="tracking-wide">{item}</span>
                                {menu === item && (
                                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                )}
                                {menu !== item && (
                                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                            </button>
                        ))}

                        {/* Stats Card */}
                        <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                            <h4 className="font-bold text-gray-900 mb-4">📊 Blog Stats</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm">Total Articles</span>
                                    <span className="font-bold text-blue-600">{blogs ? blogs.length : 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm">Categories</span>
                                    <span className="font-bold text-purple-600">{blogCategories.length - 1}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm">This Month</span>
                                    <span className="font-bold text-emerald-600">
                                        {blogs ? blogs.filter(blog => Moment(blog.createdAt).isAfter(Moment().subtract(30, 'days'))).length : 0} New
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 w-full">
                    {!blogsReady ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-pulse flex space-x-4">
                                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                            </div>
                        </div>
                    ) : blogsToShow.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center bg-white rounded-xl shadow-sm text-gray-500 border border-gray-200">
                            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <p className="text-lg font-medium">No blogs found</p>
                            <p className="text-sm mt-1">Try a different search or category</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {blogsToShow.map((blog) => (
                                <article
                                    key={blog._id}
                                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-violet-100 w-full max-w-6xl mx-auto"
                                >
                                    <Link to={`/blog/${blog._id}`} className="block">
                                        <div className="relative overflow-hidden h-72">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </Link>
                                    <div className="p-8">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-violet-50 text-violet-700">
                                                {blog.category}
                                            </span>
                                            <span className="text-gray-400 text-sm">{Moment(blog.createdAt).format('MMM DD, YYYY')}</span>
                                        </div>
                                        <Link to={`/blog/${blog._id}`}>
                                            <h2 className="text-xl font-bold text-gray-900 group-hover:text-violet-600 transition mb-3 leading-tight">
                                                {blog.title}
                                            </h2>
                                        </Link>
                                        <div className="flex justify-between items-end mb-5">
                                            <p className="text-gray-600 text-base mr-4 flex-1">
                                                {(blog.description?.replace(/<[^>]+>/g, '') || '').slice(0, 60)}
                                                {(blog.description && blog.description.replace(/<[^>]+>/g, '').length > 60) ? '...' : ''}
                                            </p>
                                            <Link
                                                to={`/blog/${blog._id}`}
                                                className="inline-flex items-center text-violet-600 hover:text-violet-800 font-medium text-base group"
                                            >
                                                Read more
                                                <svg className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Load More Button */}
                    {blogsToShow.length > 0 && (
                        <div className="text-center mt-12">
                            <button className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-50 hover:to-purple-50 text-gray-700 hover:text-blue-600 font-semibold px-8 py-4 rounded-2xl border border-gray-200 hover:border-blue-200 transition-all duration-300 transform hover:scale-105">
                                Load More Articles
                            </button>
                        </div>
                    )}
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

export default BlogHome;