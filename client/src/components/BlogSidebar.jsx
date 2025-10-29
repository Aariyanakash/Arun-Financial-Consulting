import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import { useAppContext } from "../context/AppContext.jsx";

const BlogSidebar = ({ limit = 3 }) => {
    const { axios } = useAppContext();
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [recent, setRecent] = useState([]);

    // Search blogs
    const handleSearch = async (e) => {
        e.preventDefault();
        const query = search.trim();
        if (!query) {
            setSearchResults([]);
            return;
        }
        setSearchLoading(true);
        try {
            const response = await axios.get(`/api/blog/search?q=${encodeURIComponent(query)}`);
            if (response.data.success) {
                setSearchResults(response.data.blogs || []);
            } else {
                setSearchResults([]);
            }
        } catch {
            setSearchResults([]);
        }
        setSearchLoading(false);
    };

    // Reset search results when search input is cleared
    useEffect(() => {
        if (search.trim() === '') {
            setSearchResults([]);
        }
    }, [search]);

    // Fetch recent posts
    useEffect(() => {
        axios.get('/api/blog/recent')
            .then(response => {
                if (response.data.success) setRecent(response.data.blogs || []);
            })
            .catch(() => {});
    }, [axios]);

    return (
        <div>
            {/* Search */}
            <div className="bg-white rounded-2xl shadow-md px-7 py-6 mb-6">
                <p className="font-bold mb-2">Search</p>
                <form className="flex w-full" onSubmit={handleSearch}>
                    <input
                        className="flex-1 border border-gray-200 rounded-l-md px-3 py-2 text-gray-500 outline-none min-w-0"
                        type="text"
                        placeholder="Search..."
                        style={{ minWidth: 0 }}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        disabled={searchLoading}
                    />
                    <button type="submit" className="bg-primary text-white px-4 rounded-r-md hover:bg-primary/90 flex-shrink-0" disabled={searchLoading}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-2-2" />
                        </svg>
                    </button>
                </form>
                {searchLoading && (
                    <div className="text-gray-400 text-xs py-2">Searching...</div>
                )}
                {searchResults.length > 0 && (
                    <div className="pt-4 space-y-4">
                        <div className="text-sm font-bold mb-1">Results:</div>
                        {searchResults.map(post => (
                            <div key={post.id || post._id} className="flex items-center gap-3">
                                <img src={post.image} alt={post.title} className="w-10 h-10 rounded object-cover" />
                                <div>
                                    <p className="text-xs uppercase text-primary font-semibold mb-0.5">{post.category || "Blog"}</p>
                                    <Link to={`/blog/${post.id || post._id}`} className="font-medium text-gray-800 hover:text-primary transition line-clamp-2">
                                        {post.title}
                                    </Link>
                                    <div className="text-xs text-gray-400">{Moment(post.createdAt).format('MMM DD, YYYY')}</div>
                                </div>
                            </div>
                        ))}
                        {searchResults.length === 0 && !searchLoading && (
                            <div className="text-gray-400 text-xs py-2">No results found.</div>
                        )}
                    </div>
                )}
            </div>
            {/* Recent Posts (show if not searching) */}
            {!search && (
                <div className="bg-white rounded-2xl shadow-md px-7 py-6">
                    <p className="font-bold mb-4">Recent Posts</p>
                    <div className="space-y-4">
                        {recent.length > 0 ? recent.slice(0, limit).map((post) => (
                            <div key={post._id} className="flex items-center gap-3">
                                <img src={post.image} alt={post.title} className="w-14 h-14 rounded object-cover" />
                                <div>
                                    <p className="text-xs uppercase text-primary font-semibold mb-1">{post.category || "Blog"}</p>
                                    <Link to={`/blog/${post._id}`} className="font-medium text-gray-800 hover:text-primary transition">
                                        {post.title}
                                    </Link>
                                    <div className="text-xs text-gray-400">{Moment(post.createdAt).format('MMM DD, YYYY')}</div>
                                </div>
                            </div>
                        )) : <div className="text-gray-400 text-xs">No posts yet</div>}
                    </div>
                </div>
            )}
            {/* Subscribe to newsletter */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl shadow-sm p-6 text-white mt-6">
                <h3 className="text-lg font-semibold mb-3">Subscribe to newsletter</h3>
                <p className="text-violet-100 text-sm mb-4">Get the latest articles and resources sent straight to your inbox.</p>
                <form className="space-y-3">
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-violet-200 text-white focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button
                        type="submit"
                        className="w-full bg-white text-violet-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BlogSidebar;