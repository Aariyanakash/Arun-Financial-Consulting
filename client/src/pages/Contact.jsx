import React, { useState, useEffect } from "react";
// email sending handled by server via /public/contact
import ScheduleConsultation from "../components/ScheduleConsultation.jsx";
import {
    consultant,
    contactMethods as getContactMethods,
    services,
    faqData,
} from "../assets/assets.js";

import "../styles/contact-page.css";

const Contact = () => {
    const [scrollY, setScrollY] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        service: "",
        message: "",
    });
    const [showScheduler, setShowScheduler] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: "loading", message: "Sending your message..." });

        try {
            const baseUrl = import.meta.env.VITE_BASE_URL || '';
            const resp = await fetch(`${baseUrl}/public/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.name,
                    lastName: formData.lastname,
                    email: formData.email,
                    phone: formData.phone,
                    service: formData.service,
                    message: formData.message,
                }),
            });
            const data = await resp.json().catch(() => ({}));
            if (!resp.ok || !data.success) throw new Error(data.message || `Request failed (${resp.status})`);

            setStatus({ type: 'success', message: `🎉 Message sent successfully to ${formData.email}! I'll get back to you within 24 hours.` });
            setTimeout(() => {
                setFormData({ name: '', lastname: '', email: '', phone: '', service: '', message: '' });
                setStatus(null);
            }, 5000);
        } catch (error) {
            console.error('Contact Send Error:', error);
            setStatus({ type: 'error', message: '❌ Failed to send message. Please try again or contact me directly.' });
            setTimeout(() => setStatus(null), 5000);
        }
    };

    const methods = getContactMethods(setShowScheduler, consultant);

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section className="contact-hero-section">
                <div
                    className="contact-hero-bg"
                    style={{ transform: `translateY(${scrollY * 0.3}px)` }}
                />
                <div className="contact-hero-overlay" />
                <div className="contact-hero-content">
                    <div className="contact-hero-badge">
                        {consultant.name} — {consultant.title}
                    </div>
                    <h1 className="contact-hero-title">
                        Let's plan your{" "}
                        <span className="contact-hero-title-accent">
                            financial future
                        </span>
                    </h1>
                    <p className="contact-hero-desc">
                        Personal one-on-one guidance. Clear strategies tailored to you. No pressure sales.
                        Book a free consultation or drop me a message—whatever's easiest for you.
                    </p>
                    <div className="contact-hero-actions">
                        <button
                            onClick={() => setShowScheduler(true)}
                            className="contact-btn contact-btn-main"
                        >
                            <span className="flex items-center gap-2">
                                Book Free Consultation
                                <svg className="w-5 h-5 contact-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </span>
                        </button>
                        <a
                            href={`tel:${consultant.phoneTel}`}
                            className="contact-btn contact-btn-secondary"
                            aria-label={`Call now at ${consultant.phone}`}
                        >
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                Call {consultant.phone}
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Scheduler Modal */}
            {showScheduler && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-0">
                    <div className="bg-white rounded-none shadow-2xl w-screen h-screen overflow-auto relative">
                        <ScheduleConsultation onClose={() => setShowScheduler(false)} />
                    </div>
                </div>
            )}

            {/* Contact Methods / Cards */}
            <section className="contact-methods-section">
                <div className="contact-section-container">
                    {/* <div className="contact-section-header">
                        <div className="contact-section-badge">How to Reach Me</div>
                        <h2 className="contact-section-title">
                            Choose what works best for <span className="contact-section-title-accent">you</span>
                        </h2>
                        <p className="contact-section-desc">
                            I believe in making financial planning accessible and comfortable.
                            Whether you prefer a quick call, video chat, or email, I'm here to help on your terms.
                        </p>
                    </div> */}
                    <div className="contact-methods-grid">
                        {methods.map((method, idx) => {
                            const Card = (
                                <div className="contact-method-card">
                                    <div className={`contact-method-icon contact-method-icon-${idx}`}>
                                        {method.icon}
                                    </div>
                                    <h3 className="contact-method-title">
                                        {method.title}
                                    </h3>
                                    <p className="contact-method-desc">
                                        {method.description}
                                    </p>
                                    <span className="contact-method-action">
                                        {method.action}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                        </svg>
                                    </span>
                                </div>
                            );
                            if (method.href) {
                                return (
                                    <a key={idx} href={method.href} aria-label={method.title} className="text-left">
                                        {Card}
                                    </a>
                                );
                            }
                            return (
                                <button key={idx} onClick={method.onClick} className="text-left">
                                    {Card}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Office Location */}
            <section className="contact-office-section">
                <div className="contact-section-container">
                    <div className="contact-office-grid">
                        <div className="contact-office-info">
                            <div>
                                <div className="contact-office-badge">My Office</div>
                                <h2 className="contact-section-title">
                                    Visit me in {consultant.city}
                                </h2>
                                <p className="contact-office-desc">
                                    Prefer meeting face-to-face? I'd be happy to host you at my office.
                                    Convenient location with street parking and subway access nearby.
                                </p>
                            </div>
                            <div className="contact-office-cards">
                                <div className="contact-office-card contact-office-card-address">
                                    <div className="contact-office-card-header">
                                        <svg className="w-5 h-5 contact-office-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        <h4>Address</h4>
                                    </div>
                                    <p>{consultant.address}</p>
                                </div>
                                <div className="contact-office-card contact-office-card-hours">
                                    <div className="contact-office-card-header">
                                        <svg className="w-5 h-5 contact-office-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <h4>Office Hours</h4>
                                    </div>
                                    <p>{consultant.hours}</p>
                                </div>
                                <div className="contact-office-card contact-office-card-phone">
                                    <div className="contact-office-card-header">
                                        <svg className="w-5 h-5 contact-office-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>
                                        <h4>Phone</h4>
                                    </div>
                                    <a href={`tel:${consultant.phoneTel}`} className="contact-office-card-link">{consultant.phone}</a>
                                </div>
                                <div className="contact-office-card contact-office-card-email">
                                    <div className="contact-office-card-header">
                                        <svg className="w-5 h-5 contact-office-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                        <h4>Email</h4>
                                    </div>
                                    <a href={`mailto:${consultant.email}`} className="contact-office-card-link">{consultant.email}</a>
                                </div>
                            </div>
                            <div className="contact-office-actions">
                                <button
                                    onClick={() => setShowScheduler(true)}
                                    className="contact-btn contact-btn-main"
                                >
                                    Schedule Office Visit
                                </button>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consultant.address)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="contact-btn contact-btn-secondary"
                                >
                                    Get Directions
                                </a>
                            </div>
                        </div>
                        <div className="contact-office-map-container">
                            <div className="contact-office-map-bg" />
                            <div className="contact-office-map">
                                <iframe
                                    title={`${consultant.name}'s Office Location in ${consultant.city}`}
                                    src={consultant.mapEmbed}
                                    width="100%"
                                    height="550"
                                    frameBorder="0"
                                    allowFullScreen
                                    loading="lazy"
                                    className="contact-office-map-iframe"
                                    style={{ border: 0 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form
            <section className="contact-form-section">
                <div className="contact-section-container">
                    <div className="contact-section-header">
                        <div className="contact-section-badge">Send Me a Message</div>
                        <h2 className="contact-section-title">
                            Tell me about your financial goals
                        </h2>
                        <p className="contact-section-desc">
                            I read and respond to every message personally—usually within 24 hours on business days.
                        </p>
                    </div>
                    <div className="contact-form-bg">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="contact-form-fields contact-form-fields-row">
                                <div>
                                    <label className="contact-form-label">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="contact-form-input"
                                        placeholder="Enter your first name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="contact-form-label">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                        className="contact-form-input"
                                        placeholder="Enter your last name"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="contact-form-fields contact-form-fields-row">
                                <div>
                                    <label className="contact-form-label">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="contact-form-input"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="contact-form-label">
                                        Phone Number (optional)
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="contact-form-input"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="contact-form-label">
                                    What service interests you most?
                                </label>
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    className="contact-form-input"
                                >
                                    <option value="">Select a service...</option>
                                    {services.map((service, idx) => (
                                        <option key={idx} value={service} className="text-gray-900">
                                            {service}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label className="contact-form-label">
                                    Tell me about your situation
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="6"
                                    className="contact-form-input contact-form-textarea"
                                    placeholder="Share your financial goals, challenges, timeline, or any questions you have..."
                                    required
                                />
                            </div>
                            <div className="contact-form-actions">
                                <button
                                    type="submit"
                                    disabled={status?.type === "loading"}
                                    className="contact-btn contact-btn-main contact-form-submit"
                                >
                                    {status?.type === "loading" ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-gray-600/30 border-t-gray-600 rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                            </svg>
                                            Send Message
                                        </>
                                    )}
                                </button>
                                <a
                                    href={`tel:${consultant.phoneTel}`}
                                    className="contact-btn contact-btn-secondary contact-form-alt"
                                    aria-label={`Call now at ${consultant.phone}`}
                                >
                                    Schedule a Call Instead?
                                </a>
                            </div>
                        </form>
                        {status && (
                            <div className={`contact-form-status contact-form-status-${status.type}`}>
                                <div>{status.message}</div>
                            </div>
                        )}
                    </div>
                    <div className="contact-faq">
                        {faqData.map((item, i) => (
                            <details key={i} className="contact-faq-card">
                                <summary className="contact-faq-question">{item.q}</summary>
                                <p className="contact-faq-answer">{item.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Final CTA 
            <section className="contact-cta-section">
                <div className="contact-cta-bg" />
                <div className="contact-cta-content">
                    <div className="contact-section-badge">Ready When You Are</div>
                    <h2 className="contact-section-title">
                        Your financial future starts with
                        <br />
                        a simple conversation
                    </h2>
                    <p className="contact-cta-desc">
                        No matter where you are in your financial journey, I'm here to help you take the next step forward.
                    </p>
                    <div className="contact-cta-actions">
                        <button
                            onClick={() => setShowScheduler(true)}
                            className="contact-btn contact-btn-main"
                        >
                            Book Your Free Consultation
                        </button>
                        <a
                            href={`mailto:${consultant.email}?subject=Financial Consultation Inquiry&body=Hello Alex,%0D%0A%0D%0AI'm interested in discussing my financial situation and would like to learn more about your services.%0D%0A%0D%0APlease let me know your availability.%0D%0A%0D%0AThank you!`}
                            className="contact-btn contact-btn-secondary"
                        >
                            Send Me an Email
                        </a>
                    </div>
                </div>
            </section>*/}

            {/* Scroll to Top Button */}
            <button
                className="contact-scroll-top"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Scroll to top"
            >
                <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    className="contact-scroll-top-icon"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
            </button>
        </div>
    );
};

export default Contact;
