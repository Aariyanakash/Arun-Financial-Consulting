import React from 'react';
import { assets } from "../../assets/assets.js";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar.jsx";
import { useAppContext } from "../../context/AppContext.jsx";

const Layout = () => {
    const { axios, setToken, navigate } = useAppContext();

    const logout = () => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common.Authorization;
        setToken(null);
        navigate('/');
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Header */}
            <header className='bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40'>
                <div className='flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8'>
                    {/* Logo */}
                    <div
                        className='flex items-center cursor-pointer group'
                        onClick={() => navigate('/')}
                    >
                        <img
                            src={assets.logo}
                            alt="logo"
                            className='h-8 w-auto transition-transform duration-200 group-hover:scale-105'
                        />
                    </div>

                    {/* Header Actions */}
                    <div className='flex items-center gap-4'>
                        {/* Notifications (placeholder) */}
                        <button className='relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100'>
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-5-5-5 5h5zm0 0v-5' />
                            </svg>
                        </button>

                        {/* Profile dropdown (simplified) */}
                        <div className='flex items-center gap-3'>
                            <div className='hidden sm:block text-right'>
                                <p className='text-sm font-medium text-gray-900'>Admin</p>
                                <p className='text-xs text-gray-500'>Administrator</p>
                            </div>
                            <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'>
                                <span className='text-sm font-medium text-white'>A</span>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={logout}
                            className='inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                        >
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                            </svg>
                            <span className='hidden sm:inline'>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className='flex h-[calc(100vh-4rem)]'>
                <Sidebar />
                <main className='flex-1 overflow-auto'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;