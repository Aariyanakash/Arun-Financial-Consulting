import React, { useState, useEffect } from 'react';
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Our Services', to: '/services' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contacts', to: '/contacts' },
];

const Navbar = () => {
    const { navigate, token } = useAppContext();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Exact match only
    const getIsActive = (itemTo) => location.pathname === itemTo;

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-white/90 backdrop-blur-xl shadow-xl border-b border-white/20'
                    : 'bg-transparent'
            }`}>
                <div className="flex items-center justify-between py-4 mx-6 sm:mx-16 xl:mx-32">
                    {/* Logo with Hover Effect */}
                    <div
                        onClick={() => navigate('/')}
                        className="cursor-pointer group transition-transform duration-300 hover:scale-105"
                    >
                        <div className="relative">
                            <img
                                src={assets.logo}
                                alt="logo"
                                className="w-12 h-auto relative z-10"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center">
                        <ul className="flex items-center gap-8 xl:gap-12 mx-12">
                            {navItems.map((item) => {
                                const isActive = getIsActive(item.to);
                                return (
                                    <li key={item.to} className="group relative">
                                        <Link
                                            to={item.to}
                                            className={`relative text-lg font-semibold transition-all duration-300 px-4 py-2 rounded-xl ${
                                                isActive
                                                    ? scrolled
                                                        ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                                                        : "text-blue-300 bg-white/10 backdrop-blur-sm"
                                                    : scrolled
                                                        ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                                        : "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm"
                                            }`}
                                        >
                                            {item.label}
                                            {/* Show highlight badge only for active */}
                                            {isActive && (
                                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Desktop CTA Button */}
                    <div className="hidden lg:block">
                        <button
                            onClick={() => navigate('/admin')}
                            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {token ? 'Dashboard' : 'Login'}
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${
                            scrolled
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
                        }`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl transition-all duration-500 ${
                    mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}>
                    <div className="px-6 py-8 space-y-4">
                        {navItems.map((item) => {
                            const isActive = getIsActive(item.to);
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block text-lg font-semibold py-3 px-4 rounded-xl transition-all duration-300 ${
                                        isActive
                                            ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                                            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                    }`}
                                >
                                    <span className="flex items-center justify-between">
                                        {item.label}
                                        {/* Show highlight badge only for active */}
                                        {isActive && (
                                            <span className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></span>
                                        )}
                                    </span>
                                </Link>
                            );
                        })}

                        <div className="pt-4 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    navigate('/admin');
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                {token ? 'Dashboard' : 'Login'}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
