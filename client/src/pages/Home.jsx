import React, { useState, useEffect } from "react";
import ScheduleConsultation from "../components/ScheduleConsultation.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import Moment from 'moment';
import { Link } from "react-router-dom";
import {
    testimonials,
    coreServices,
    achievements,
    myApproachSteps
} from "../assets/assets.js";
import arun from "../assets/Aa.png";

const Home = () => {
    const [scrollY, setScrollY] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const { blogs, blogsReady } = useAppContext();

    // Disable body scroll when modal is open
    useEffect(() => {
        if (showScheduleModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [showScheduleModal]);

    // Close modal on Escape key
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === "Escape") {
                setShowScheduleModal(false);
            }
        };
        document.addEventListener("keydown", handleEscapeKey);
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-cycle testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    let homeBlogs = [];
    if (blogsReady && Array.isArray(blogs)) {
        homeBlogs = [...blogs]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
                    style={{ transform: `translateY(${scrollY * 0.3}px)` }}
                />

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/30 rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400/30 rounded-full animate-bounce delay-1000"></div>
                    <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-cyan-400/30 rounded-full animate-ping delay-2000"></div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>

                <div className="relative z-10 px-6 max-w-6xl text-center">
                    <div className="transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.3s_forwards]">
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white text-sm font-bold uppercase tracking-wider mb-8">
                            ✨ Personal Financial Advisor
                        </div>
                    </div>

                    <div className="transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
                        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-black mb-8 leading-tight">
                            Your Financial Success,
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                My Priority
                            </span>
                        </h1>
                    </div>

                    <div className="transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.7s_forwards]">
                        <p className="text-white/80 text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed">
                            Personalized financial planning that turns your
                            <span className="text-blue-300 font-semibold"> goals into reality </span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button
                                className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300"
                                onClick={() => setShowScheduleModal(true)}
                            >
                                <span className="flex items-center gap-3">
                                    Schedule Free Consultation
                                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </span>
                            </button>

                            <button
                                className="group bg-white/10 backdrop-blur-md text-white font-semibold py-5 px-10 rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300"
                                onClick={() => scrollToSection('services')}
                            >
                                <span className="flex items-center gap-3">
                                    Explore Services
                                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Me Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="space-y-6">
                                <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                                    👋 About Me
                                </div>

                                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                                    Hi, I'm
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Arun Akash Jawahar</span>
                                </h2>

                                <p className="text-xl text-gray-600 leading-relaxed">
                                    A dedicated financial consultant with strong expertise in financial analysis, investment strategies, and risk management. With international academic training and hands-on industry experience, I help individuals and businesses make smarter financial decisions with confidence.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Master's in Finance & Investment</h4>
                                            <p className="text-gray-600">Licensed fiduciary advisor</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Client-Focused Approach</h4>
                                            <p className="text-gray-600">Independent, transparent, and tailored financial guidance</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl transform rotate-3"></div>
                            <div className="relative bg-white p-8 rounded-3xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                                <div className="h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden relative">
                                    <img 
                                        src={arun}
                                        alt="Arun Akash Jawahar" 
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-end text-white pb-6">
                                        <h3 className="text-2xl font-bold mb-2">Arun Akash J, MSc Finance</h3>
                                        <p className="text-gray-100">Your Trusted Financial Advisor</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Services Overview */}
            <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                            🎯 My Services
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">

                            <br />
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Smart finance. Clear strategy. Better results.</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Guiding individuals and businesses with personalized solutions at every stage of their financial journey
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {coreServices.map((service, idx) => (
                            <div key={idx} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="text-4xl mb-6">{service.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="space-y-2 mb-6">
                                    {service.highlights.map((highlight, hIdx) => (
                                        <div key={hIdx} className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                            {highlight}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                                    onClick={() => setShowScheduleModal(true)}
                                >
                                    Schedule Consultation
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* My Approach */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                            💡 My Approach
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 mb-4">
                            Smart Planning <span className="text-emerald-600">Simple Solution</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Financial planning doesn't need to be complicated — let's make it work for you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {myApproachSteps.map((step, idx) => (
                            <div key={idx} className="text-center">
                                <div className={`w-20 h-20 bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 rounded-full flex items-center justify-center text-3xl text-white mb-6 mx-auto shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300`}>
                                    {step.icon}
                                </div>
                                <div className={`text-${step.color}-600 font-bold text-sm uppercase tracking-wider mb-2`}>
                                    Step {step.step}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Success Stories */}
            <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="mb-12">
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold uppercase tracking-wider mb-4">
                            💬 Client Success Stories
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            Real results from real people
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
                            <div className="flex justify-center mb-8">
                                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-3xl shadow-xl">
                                    👤
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="text-6xl text-blue-300 mb-4 leading-none">"</div>
                                <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90 max-w-3xl mx-auto">
                                    {testimonials[currentTestimonial].text}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="font-bold text-xl text-white">
                                    {testimonials[currentTestimonial].name}
                                </div>
                                <div className="text-blue-200">
                                    {testimonials[currentTestimonial].title}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-3 mt-8">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentTestimonial(idx)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        idx === currentTestimonial
                                            ? 'bg-white scale-125'
                                            : 'bg-white/40 hover:bg-white/60'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Results & Stats */}
            <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold mb-4">Results That Matter</h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {achievements.map((stat, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="mb-4 text-4xl">{stat.icon}</div>
                                <div className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                                    {stat.number}
                                </div>
                                <div className="text-white font-semibold uppercase tracking-wider text-sm">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call-to-Action */}
            <section className="relative py-32 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)] bg-[radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.3),transparent_50%)]"></div>

                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold uppercase tracking-wider mb-6">
                        🚀 Ready to Get Started?
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                        Your financial success story
                        <br />
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            starts here
                        </span>
                    </h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Schedule a complimentary 30-minute consultation to discuss your financial goals
                        and discover how I can help you achieve them.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-5 px-10 rounded-2xl shadow-2xl hover:shadow-yellow-500/30 transform hover:scale-105 transition-all duration-300"
                            onClick={() => setShowScheduleModal(true)}
                        >
                            <span className="flex items-center gap-3">
                                Schedule Free Consultation
                                <div className="w-6 h-6 bg-gray-900/20 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </span>
                        </button>

                        <button className="group bg-white/10 backdrop-blur-md text-white font-semibold py-5 px-10 rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300">
                            <span className="flex items-center gap-3">
                                Download Free Guide
                                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </span>
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/60 mt-8">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            No obligation
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Free consultation
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Confidential
                        </div>
                    </div>
                </div>
            </section>

            {/* Schedule Consultation Modal - Full Screen */}
            {showScheduleModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-0">
                    <div className="bg-white rounded-none shadow-2xl w-screen h-screen overflow-auto relative">
                        <button
                            onClick={() => setShowScheduleModal(false)}
                            className="absolute top-6 right-6 z-10 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Close schedule consultation modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <ScheduleConsultation />
                    </div>
                </div>
            )}

            {/* Modern Blog Section */}
            <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                            📝 Financial Insights
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                            Expert insights & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> market analysis</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Stay informed with our latest research, market updates, and strategic financial guidance
                        </p>
                    </div>
                    {!blogsReady ? (
                        <div className="flex justify-center items-center min-h-[220px]">
                            <div className="animate-pulse flex space-x-4">
                                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                            </div>
                        </div>
                    ) : homeBlogs.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center bg-white rounded-xl shadow-sm text-gray-500 border border-gray-200">
                            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <p className="text-lg font-medium">No blogs found</p>
                            <p className="text-sm mt-1">Check back soon for new insights</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {homeBlogs.map((blog, idx) => (
                                <article key={blog._id || idx} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                                    <Link to={`/blog/${blog._id}`} className="block">
                                        <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500 relative overflow-hidden">
                                            {blog.image && (
                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-black/20"></div>
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 uppercase tracking-wider">
                                                    {blog.category}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
                                                {blog.readTime || `${Math.max(2, Math.ceil((blog.description?.replace(/<[^>]+>/g, '').length || 0) / 250))} min read`}
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="p-8">
                                        <div className="text-gray-500 text-sm mb-3 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {Moment(blog.createdAt).format('MMMM D, YYYY')}
                                        </div>
                                        <Link to={`/blog/${blog._id}`}>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                                                {blog.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {(blog.description?.replace(/<[^>]+>/g, '') || '').slice(0, 110)}
                                            {(blog.description && blog.description.replace(/<[^>]+>/g, '').length > 110) ? '...' : ''}
                                        </p>
                                        <Link to={`/blog/${blog._id}`} className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Read Full Article
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                    <div className="text-center mt-12">
                        <Link to="/blog">
                            <button className="bg-gradient-to-r from-gray-900 to-blue-900 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                View All Insights
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Scroll to Top Button */}
            <button
                className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-4 shadow-2xl hover:shadow-blue-500/30 z-50 transform hover:scale-110 transition-all duration-300 group"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
            >
                <svg width="20" height="20" fill="none" stroke="currentColor" className="group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
            </button>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
};

export default Home;