import React from 'react';
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets.js";

const Sidebar = () => {
    const navigationItems = [
        {
            to: "/admin",
            icon: assets.home_icon,
            label: "Dashboard",
            end: true
        },
        {
            to: "/admin/addBlog",
            icon: assets.add_icon,
            label: "Add Blog",
            end: true
        },
        {
            to: "/admin/listBlog",
            icon: assets.list_icon,
            label: "All Blogs",
            end: true
        },
        {
            to: "/admin/comments",
            icon: assets.comment_icon,
            label: "Comments",
            end: true
        },
        {
            to: "/admin/timeslots",
            icon: assets.clock_icon || assets.home_icon, // fallback to home_icon if clock_icon doesn't exist
            label: "Time Slots",
            end: true
        }
    ];

    return (
        <aside className='bg-white border-r border-gray-200 min-h-full w-20 md:w-72 transition-all duration-300'>
            <div className='flex flex-col h-full'>
                {/* Sidebar Header */}
                <div className='p-4 md:p-6 border-b border-gray-100'>
                    <div className='hidden md:block'>
                        <h2 className='text-lg font-semibold text-gray-900'>Admin Panel</h2>
                        <p className='text-sm text-gray-500 mt-1'>Manage your blog</p>
                    </div>
                    <div className='md:hidden flex justify-center'>
                        <div className='w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center'>
                            <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4' />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className='flex-1 p-2 md:p-4'>
                    <ul className='space-y-2'>
                        {navigationItems.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    end={item.end}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `group flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-xl transition-all duration-200 relative ${
                                            isActive
                                                ? 'bg-blue-50 text-blue-700 shadow-sm'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {/* Active indicator */}
                                            {isActive && (
                                                <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full'></div>
                                            )}

                                            {/* Icon */}
                                            <div className={`flex-shrink-0 transition-transform duration-200 ${
                                                isActive ? 'scale-110' : 'group-hover:scale-105'
                                            }`}>
                                                {item.label === "Time Slots" ? (
                                                    // Custom clock icon if assets.clock_icon doesn't exist
                                                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                                    </svg>
                                                ) : (
                                                    <img
                                                        src={item.icon}
                                                        alt={item.label}
                                                        className='w-6 h-6'
                                                    />
                                                )}
                                            </div>

                                            {/* Label */}
                                            <span className='hidden md:block font-medium text-sm tracking-wide'>
                                                {item.label}
                                            </span>

                                            {/* Hover effect for mobile */}
                                            <div className='md:hidden absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50'>
                                                {item.label}
                                                <div className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900'></div>
                                            </div>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

            </div>
        </aside>
    );
};

export default Sidebar;