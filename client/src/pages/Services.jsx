import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import ScheduleConsultation from "../components/ScheduleConsultation.jsx";
import {
    HEADER_OFFSET,
    serviceModalContent,
    serviceCategories,
    detailedServices,
    processSteps,
} from "../assets/assets.js";

const Services = () => {
    const [activeService, setActiveService] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);
    const serviceCategoriesRef = useRef(null);

    const location = useLocation();
    const navigationType = useNavigationType();

    // Disable body scroll when modals are open
    useEffect(() => {
        if (showScheduleModal || showServiceModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [showScheduleModal, showServiceModal]);

    // Handle service modal opening
    const openServiceModal = (service) => {
        setSelectedServiceDetail(service);
        setShowServiceModal(true);
    };

    // Close modals on Escape key
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === "Escape") {
                setShowScheduleModal(false);
                setShowServiceModal(false);
            }
        };
        document.addEventListener("keydown", handleEscapeKey);
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, []);

    // Parallax listener
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Only offset-scroll when arriving via navigation with a hash
    useEffect(() => {
        if (location.hash && navigationType === "PUSH") {
            const t = setTimeout(() => {
                const el = document.querySelector(location.hash);
                if (el) {
                    const y =
                        el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
                    window.scrollTo({ top: y, behavior: "smooth" });
                }
            }, 0);
            return () => clearTimeout(t);
        }
    }, [location, navigationType]);

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
                    style={{ transform: `translateY(${scrollY * 0.3}px)` }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.3),transparent_50%)] bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.3),transparent_50%)]"></div>
                <div className="relative z-10 px-6 md:px-16 max-w-6xl text-center">
                    <div className="transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.3s_forwards]">
                        <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-white text-sm font-bold uppercase tracking-wider mb-8">
                            ⭐ Personal Financial Advisory
                        </div>
                    </div>
                    <div className="transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
                        <h1 className="text-white text-6xl sm:text-7xl md:text-8xl font-black mb-8 leading-tight">
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                Your Partner in
                            </span>
                            <br />
                            <span className="text-white/90">Financial Success</span>
                        </h1>
                    </div>
                    <div className="transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.7s_forwards]">
                        <p className="text-white/80 text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
                            Personalized financial advice designed around your goals, lifestyle, and{" "}
                            <span className="text-cyan-300 font-semibold">future dreams</span>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button
                                className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl hover:shadow-cyan-500/30 transform hover:scale-105 transition-all duration-300"
                                onClick={() => serviceCategoriesRef.current?.scrollIntoView({ behavior: "smooth" })}
                            >
                                <span className="flex items-center gap-3">
                                    Explore Services
                                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </button>
                            <button
                                className="group bg-white/10 backdrop-blur-md text-white font-semibold py-5 px-10 rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300"
                                onClick={() => setShowScheduleModal(true)}
                            >
                                Schedule Free Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* My Process */}
            <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                            🔄 My Process
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 mb-4">
                            Your Journey With <span className="text-indigo-600">Us</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            A clear, step-by-step framework designed to help you build and follow the right plan for your financial future.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-200 to-cyan-200 rounded-full"></div>

                        {processSteps.map((step, idx) => (
                            <div key={idx} className={`relative flex items-center mb-16 ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
                                <div className={`w-full max-w-md ${idx % 2 === 0 ? "mr-8" : "ml-8"}`}>
                                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 transform hover:-translate-y-2 transition-all duration-300">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="text-3xl">{step.icon}</div>
                                            <div>
                                                <div className="text-indigo-600 font-bold text-sm uppercase tracking-wider">Step {step.step}</div>
                                                <div className="text-gray-500 text-sm">{step.duration}</div>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>

                                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                    {step.step}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Specializations */}
            <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-sm font-semibold uppercase tracking-wider mb-4">
                            👥 Client Focus Areas
                        </div>
                        <h2 className="text-5xl font-black mb-6">
                            Specialized guidance for
                            <br />
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">different life stages</span>
                        </h2>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto">
                            I understand that each stage of life brings unique financial challenges and opportunities.
                            My expertise helps navigate these complexities with confidence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Young Professionals",
                                icon: "🎓",
                                challenges: ["Student loans", "First home purchase", "Career Starters", "Building emergency funds"],
                                solutions: ["Debt payoff strategies", "Smart Money Moves", "Early Career Game Plan"],
                                gradient: "from-blue-500 to-cyan-500",
                            },
                            {
                                title: "Mid-Career Families",
                                icon: "👨‍👩‍👧‍👦",
                                challenges: ["Education funding", "Mid-Life Money Challenges", "Insurance needs", "Retirement catch-up"],
                                solutions: ["Family budgeting frameworks", "Long-term care insurance review", "Investment acceleration"],
                                gradient: "from-emerald-500 to-teal-500",
                            },
                            {
                                title: "Pre-Retirees",
                                icon: "⏰",
                                challenges: ["Retirement Readiness Concerns", "Healthcare costs", "Tax Planning Gaps", "Income planning"],
                                solutions: ["Retirement income strategies", "Healthcare planning", "Tax-efficient withdrawals"],
                                gradient: "from-purple-500 to-indigo-500",
                            },
                            {
                                title: "Business Owners",
                                icon: "🚀",
                                challenges: ["Business succession", "Tax optimization", "Entrepreneurial Challenges", "Risk management"],
                                solutions: ["Strategic Business Planning", "Business tax strategies", "Business Wealth Blueprint"],
                                gradient: "from-rose-500 to-pink-500",
                            },
                        ].map((spec, idx) => (
                            <div key={idx} className="group bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-500">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${spec.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                                        {spec.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                                            {spec.title}
                                        </h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                                            Common Challenges
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {spec.challenges.map((challenge, cIdx) => (
                                                <div key={cIdx} className="flex items-center gap-2 text-sm text-white/70">
                                                    <svg className="w-3 h-3 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                    </svg>
                                                    {challenge}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                            My Solutions
                                        </h4>
                                        <div className="space-y-2">
                                            {spec.solutions.map((solution, sIdx) => (
                                                <div key={sIdx} className="flex items-center gap-2 text-sm text-white/70">
                                                    <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {solution}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/20">
                                    <button
                                        className="text-cyan-300 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                                        onClick={() => setShowScheduleModal(true)}
                                    >
                                        Schedule Consultation for {spec.title}
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Services (Categories) */}
            <section id="categories" ref={serviceCategoriesRef} className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                            🎯 Core Services
                        </div>
                        <h2 className="text-5xl font-black text-gray-900 mb-6">
                            Comprehensive financial solutions
                            <br />
                            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">for your life goals</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                        {serviceCategories.map((category, idx) => (
                            <div
                                key={idx}
                                className="group cursor-pointer h-full"
                                onClick={() => setActiveService(idx)}
                            >
                                <div
                                    className={`relative h-[420px] flex flex-col justify-between bg-gradient-to-br ${category.gradient} rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-500 ${activeService === idx ? "scale-105 ring-4 ring-white/20" : "hover:scale-105"}`}
                                >
                                    <div>
                                        <div className="text-4xl mb-4">{category.icon}</div>
                                        <h3 className="font-bold text-xl mb-4 leading-tight">{category.title}</h3>
                                        <div className="space-y-3 mt-4">
                                            {category.services.map((service, sIdx) => (
                                                <div key={sIdx} className="text-white/90 text-sm flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 bg-white/80 rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className="leading-relaxed">{service}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center text-white/90 group-hover:text-white transition-colors">
                                        <button
                                            className="text-sm font-semibold flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-all"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openServiceModal(serviceModalContent[category.id]);
                                            }}
                                        >
                                            Learn More
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Service Showcase */}
            <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                            💼 Detailed Services
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 mb-4">
                            Personalized <span className="text-indigo-600">Service Approach</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Every client receives customized financial strategies designed specifically for their unique situation and goals
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {detailedServices.map((service, idx) => (
                            <div key={idx} className={`group ${service.bgColor} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50`}>
                                <div className={`h-1 bg-gradient-to-r ${service.gradient}`}></div>
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 bg-gradient-to-r ${service.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
                                                <span className="text-white text-xl font-bold">{idx + 1}</span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                    {service.category}
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {service.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-500">{service.duration}</div>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                What's Included
                                            </h4>
                                            <div className="space-y-2">
                                                {service.features.slice(0, 4).map((feature, fIdx) => (
                                                    <div key={fIdx} className="flex items-start gap-2 text-sm text-gray-600">
                                                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="leading-relaxed">{feature}</span>
                                                    </div>
                                                ))}
                                                {service.features.length > 4 && (
                                                    <div className="text-sm text-gray-500 italic">
                                                        +{service.features.length - 4} more features
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                                My Process
                                            </h4>
                                            <div className="space-y-2">
                                                {service.process.map((step, pIdx) => (
                                                    <div key={pIdx} className="flex items-center gap-3">
                                                        <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">
                                                            {pIdx + 1}
                                                        </div>
                                                        <span className="text-sm text-gray-600 leading-relaxed">{step}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        className={`w-full bg-gradient-to-r ${service.gradient} text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                                        onClick={() => setShowScheduleModal(true)}
                                    >
                                        Schedule Consultation
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Get Started Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="mb-12">
                        <div className="inline-block bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                            🚀 Ready to Get Started?
                        </div>
                        <h2 className="text-5xl font-black text-gray-900 mb-6">
                            Your financial future
                            <br />
                            <span className="text-indigo-600">starts with a conversation</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                            Schedule a complimentary 30-minute consultation to discuss your financial goals
                            and discover how I can help you achieve them.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {[
                            {
                                step: "1",
                                title: "Free Consultation",
                                description: "30-minute call to understand your goals and current financial situation",
                                icon: "📞",
                                color: "from-indigo-500 to-blue-500",
                                bg: "from-indigo-50 to-blue-50",
                            },
                            {
                                step: "2",
                                title: "Custom Proposal",
                                description: "Personalized service recommendation with clear next steps",
                                icon: "📋",
                                color: "from-cyan-500 to-teal-500",
                                bg: "from-cyan-50 to-teal-50",
                            },
                            {
                                step: "3",
                                title: "Start Your Journey",
                                description: "Begin implementing your customized financial strategy with ongoing support",
                                icon: "🎯",
                                color: "from-purple-500 to-indigo-500",
                                bg: "from-purple-50 to-indigo-50",
                            },
                        ].map((step, idx) => (
                            <div key={idx} className={`bg-gradient-to-br ${step.bg} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300`}>
                                <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                                    <span className="text-2xl">{step.icon}</span>
                                </div>
                                <div className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-2">
                                    Step {step.step}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <button
                            className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold py-5 px-10 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                            onClick={() => setShowScheduleModal(true)}
                        >
                            Schedule Free Consultation
                        </button>
                        <button className="bg-gray-100 text-gray-900 font-semibold py-5 px-10 rounded-2xl hover:bg-gray-200 transition-all duration-300">
                            Download My Financial Checklist
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-500">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            No obligation
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Free consultation
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Confidential discussion
                        </div>
                    </div>
                </div>
            </section>

            {/* Schedule Consultation Modal - Full Screen */}
            {showScheduleModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-0">
                    <div className="bg-white rounded-none shadow-2xl w-screen h-screen overflow-auto relative">
                        <ScheduleConsultation onClose={() => setShowScheduleModal(false)} />
                    </div>
                </div>
            )}

            {/* Service Detail Modal */}
            {showServiceModal && selectedServiceDetail && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl">
                        <button
                            onClick={() => setShowServiceModal(false)}
                            className="absolute top-6 right-6 z-10 bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-full transition-all duration-300"
                            aria-label="Close service details modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-8">
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-4xl">{selectedServiceDetail.icon}</div>
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900">
                                        {selectedServiceDetail.title}
                                    </h2>
                                </div>
                            </div>

                            <p className="text-gray-700 leading-relaxed mb-6">
                                {selectedServiceDetail.description}
                            </p>

                            {/* Benefits & Process */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Benefits
                                    </h3>
                                    <ul className="space-y-2">
                                        {selectedServiceDetail.benefits.map((b, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-700">
                                                <svg className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                        Process
                                    </h3>
                                    <ol className="space-y-2">
                                        {selectedServiceDetail.process.map((p, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-700">
                                                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">
                                                    {i + 1}
                                                </div>
                                                <span>{p}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>

                            {/* FAQs */}
                            {selectedServiceDetail.faqs?.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                                        Frequently Asked Questions
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedServiceDetail.faqs.map((f, i) => (
                                            <details key={i} className="group border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all">
                                                <summary className="cursor-pointer font-semibold text-gray-800 flex items-center justify-between">
                                                    <span>{f.q}</span>
                                                    <svg className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </summary>
                                                <p className="text-gray-600 mt-3 leading-relaxed">{f.a}</p>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button
                                className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                onClick={() => {
                                    setShowServiceModal(false);
                                    setShowScheduleModal(true);
                                }}
                            >
                                Schedule a Free Consultation
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Scroll to Top Button */}
            <button
                className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-2xl p-4 shadow-2xl hover:shadow-indigo-500/30 z-50 transform hover:scale-110 transition-all duration-300 group"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Scroll to top"
            >
                <svg width="20" height="20" fill="none" stroke="currentColor" className="group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
            </button>
        </>
    );
};

export default Services;
