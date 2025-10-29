import React from 'react';
import { assets, footer_data } from "../assets/assets.js";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
            </div>

            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-400/10 rounded-full blur-xl"></div>
            </div>

            <div className="relative z-10 px-6 md:px-16 lg:px-24 xl:px-32">
                {/* Main Footer Content */}
                <div className="py-16 border-b border-white/10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Personal Info - Takes up more space */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="group cursor-pointer">
                                <img
                                    src={assets.logo}
                                    alt='Arun Jakash - Financial Consultant'
                                    className='w-32 sm:w-44 group-hover:scale-105 transition-transform duration-300'
                                />
                            </div>

                            <p className="text-white/80 text-lg leading-relaxed max-w-md">
                                Providing personalized financial guidance and strategic planning solutions
                                to help individuals and families achieve their financial goals since 2014.
                            </p>

                            {/* Contact Info Cards */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-white/60 text-sm">Call me</div>
                                        <div className="text-white font-semibold">+91 8122920290</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-white/60 text-sm">Email me</div>
                                        <div className="text-white font-semibold">arunjakash@gmail.com</div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Icons */}
                            <div className="flex gap-4">
                                {[
                                    { icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", name: "LinkedIn" },
                                    { icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z", name: "Twitter" },
                                    { icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", name: "Instagram" }
                                ].map((social, idx) => (
                                    <button
                                        key={idx}
                                        className="group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center transform hover:scale-110"
                                        title={social.name}
                                    >
                                        <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={social.icon} />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="lg:col-span-7">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-xl text-white mb-6 relative">
                                        Services
                                        <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                                    </h3>
                                    <ul className="space-y-3">
                                        {[
                                            'Financial Planning',
                                            'Investment Advisory',
                                            'Retirement Planning',
                                            'Portfolio Management',
                                            'Tax Planning'
                                        ].map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <a
                                                    href="#"
                                                    className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                                                >
                                                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-xl text-white mb-6 relative">
                                        Resources
                                        <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                                    </h3>
                                    <ul className="space-y-3">
                                        {[
                                            'Market Insights',
                                            'Financial Blog',
                                            'Client Portal',
                                            'Calculators',
                                            'FAQ'
                                        ].map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <a
                                                    href="#"
                                                    className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                                                >
                                                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-xl text-white mb-6 relative">
                                        About
                                        <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                                    </h3>
                                    <ul className="space-y-3">
                                        {[
                                            'My Approach',
                                            'Credentials',
                                            'Testimonials',
                                            'Contact',
                                            'Schedule Meeting'
                                        ].map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <a
                                                    href="#"
                                                    className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                                                >
                                                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Subscription */}
                <div className="py-12 border-b border-white/10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Stay informed with
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> financial insights</span>
                        </h3>
                        <p className="text-white/70 mb-8 text-lg">
                            Get monthly financial tips and market updates delivered to your inbox
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <div className="flex-1 relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                />
                            </div>
                            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold px-8 py-4 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Copyright */}
                        <div className="text-white/60 text-center md:text-left">
                            <p className="text-sm md:text-base">
                                Copyright © {currentYear}
                                <span className="text-white font-semibold mx-1">Arun Jakash</span>
                                Financial Consultant. All rights reserved.
                            </p>
                        </div>

                        {/* Legal Links */}
                        <div className="flex items-center gap-6 text-sm">
                            {[
                                { label: "Privacy Policy", href: "#" },
                                { label: "Terms of Service", href: "#" },
                                { label: "Disclosure", href: "#" }
                            ].map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.href}
                                    className="text-white/70 hover:text-white transition-colors duration-300 relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;