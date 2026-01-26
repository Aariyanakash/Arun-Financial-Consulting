import React, { useState } from "react";
import { blogCategories } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import { Link } from "react-router-dom";
import Moment from "moment";
import BlogSidebar from "../components/BlogSidebar";

const BlogHome = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input, blogsReady } = useAppContext();

  // ---------------- FILTER BLOGS ----------------
  const filteredBlogs = () => {
    if (!blogsReady) return [];

    const searchFiltered =
      input === ""
        ? blogs
        : blogs.filter(
            (blog) =>
              blog.title.toLowerCase().includes(input.toLowerCase()) ||
              blog.category.toLowerCase().includes(input.toLowerCase())
          );

    return menu === "All"
      ? searchFiltered
      : searchFiltered.filter(
          (blog) =>
            blog.category.toLowerCase() === menu.toLowerCase()
        );
  };

  const blogsToShow = filteredBlogs();

  return (
    <div className="min-h-screen w-full bg-gray-50 pt-24">

      {/* ---------------- HERO ---------------- */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16 px-4 -mt-24 pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <span className="uppercase tracking-[0.3em] text-sm text-violet-300 font-bold">
            Financial Insights
          </span>

          <h1 className="text-4xl md:text-5xl font-black mt-3">
            Expert Insights &{" "}
            <span className="text-yellow-400">Market Analysis</span>
          </h1>

          <p className="text-lg text-white/80 mt-4">
            Stay updated with finance, technology and startup trends.
          </p>
        </div>
      </section>

      {/* ---------------- MAIN LAYOUT ---------------- */}
      <div className="max-w-[1600px] mx-auto flex gap-8 px-4 py-10">

        {/* ------------ LEFT SIDEBAR ------------ */}
        <aside className="hidden lg:block w-64">
          <div className="sticky top-28 space-y-3">

            <h3 className="font-bold mb-2">Categories</h3>

            {blogCategories.map((item) => (
              <button
                key={item}
                onClick={() => setMenu(item)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition
                ${
                  menu === item
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {item}
              </button>
            ))}

          </div>
        </aside>

        {/* ------------ BLOG GRID ------------ */}
        <main className="flex-1">

          {!blogsReady ? (
            <p className="text-center">Loading...</p>
          ) : blogsToShow.length === 0 ? (
            <p className="text-center">No Blogs Found</p>
          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

              {blogsToShow.map((blog) => (
                <article
                  key={blog._id}
                  className="bg-white rounded-[28px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                >

                  {/* IMAGE */}
                  <Link to={`/blog/${blog._id}`}>
                    <div className="h-56 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                    </div>
                  </Link>

                  {/* CONTENT */}
                  <div className="p-6">

                    <div className="flex justify-between mb-3">
                      <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold">
                        {blog.category}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {Moment(blog.createdAt).format("MMM DD, YYYY")}
                      </span>
                    </div>

                    <Link to={`/blog/${blog._id}`}>
                      <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-violet-600">
                        {blog.title}
                      </h2>
                    </Link>

                    <p className="text-gray-600 text-sm line-clamp-3">
                      {(blog.description || "")
                        .replace(/<[^>]+>/g, "")
                        .slice(0, 120)}
                      ...
                    </p>

                    <Link
                      to={`/blog/${blog._id}`}
                      className="inline-block mt-4 text-violet-600 font-semibold hover:underline"
                    >
                      Read More →
                    </Link>

                  </div>

                </article>
              ))}

            </div>
          )}

        </main>

        {/* ------------ RIGHT SIDEBAR ------------ */}
        <aside className="hidden lg:block w-80">
          <div className="sticky top-28">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold mb-3">Discover More</h3>
              <BlogSidebar />
            </div>
          </div>
        </aside>

      </div>

    </div>
  );
};

export default BlogHome;
