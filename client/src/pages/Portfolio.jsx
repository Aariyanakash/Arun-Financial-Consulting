/**
 * Portfolio.jsx – Project Showcase and Finance Research
 * Built with React, Tailwind CSS, same animations from Home.jsx
 */

import React, { useEffect, useState } from 'react';
import {
    financeKeywords,
    skills,
    skillBars,
    featured
} from '../assets/assets.js';

// Only show finance-related repositories
async function fetchUserRepos(username, setRepos) {
    try {
        const resp = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=50&sort=updated`
        );
        if (!resp.ok) throw new Error('API error');
        const data = await resp.json();
        setRepos(
            data.filter(
                r =>
                    !r.fork &&
                    r.stargazers_count >= 2 &&
                    financeKeywords.some(k =>
                        (r.name + (r.description || '')).toLowerCase().includes(k)
                    )
            )
        );
    } catch (e) {
        console.warn('Error loading projects:', e);
    }
}

export default function Portfolio() {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetchUserRepos('Aariyanakash', setRepos);
    }, []);

    return (
        <div>
            {/* Hero Banner */}
            <section className="min-h-screen relative bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
                <div className="z-10 text-center px-6 max-w-3xl pt-24 md:pt-28">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight animate-fadeInUp">
                        Projects Completed – Deep Finance Case Studies & Analytics
                    </h1>
                    <p className="text-lg text-white/80 max-w-xl mx-auto animate-fadeInUp delay-[0.3s]">
                        A curated selection of in-depth research, financial modeling and advisory case-studies
                        for investors, analysts and corporate strategists.
                    </p>
                </div>
            </section>

            {/* Skills and Technical Tools */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-4xl font-black text-gray-800 text-center mb-12">
                        Expertise & Technical Toolkit
                    </h2>
                    <div className="flex flex-wrap gap-6 justify-center mb-8">
                        {skills.map(skill => (
                            <span
                                key={skill}
                                className="px-4 py-2 bg-white rounded-full shadow-sm text-sm font-semibold text-gray-700"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* Skill bars */}
                    <div className="space-y-6">
                        {skillBars.map((s, i) => (
                            <div key={i}>
                                <div className="flex justify-between mb-1 text-sm">
                                    <span>{s.name}</span>
                                    <span>{s.level}%</span>
                                </div>
                                <div className="w-full bg-white rounded-full h-3">
                                    <div
                                        className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-600"
                                        style={{ width: `${s.level}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects Case-Studies */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-black text-gray-900 text-center mb-12">
                        Featured Case Studies & Research Projects
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {featured.map((p, i) => (
                            <a
                                key={i}
                                href={p.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block rounded-3xl overflow-hidden shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
                            >
                                <div
                                    className="h-48 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${p.cover})` }}
                                />
                                <div className="p-6 bg-white">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600">
                                        {p.title}
                                    </h3>
                                    <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                                        {p.excerpt}
                                    </p>
                                    <ul className="list-disc list-inside mb-2 text-sm text-gray-700">
                                        {p.highlights.map((h, hi) => (
                                            <li key={hi}>{h}</li>
                                        ))}
                                    </ul>
                                    <span className="inline-flex items-center gap-2 text-blue-500 font-semibold group-hover:gap-4 transition-all">
                                        View Full Report →
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Projects from User’s Work (Finance Only) */}
            {repos.length > 0 && (
                <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
                    <div className="max-w-5xl mx-auto px-6">
                        <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
                            Recent Projects & Research Initiatives
                        </h2>
                        <ul className="space-y-6">
                            {repos.slice(0, 6).map(r => (
                                <li
                                    key={r.id}
                                    className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                >
                                    <a
                                        href={r.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl font-semibold text-blue-600 hover:underline"
                                    >
                                        {r.name}
                                    </a>
                                    <div className="mt-1 text-sm text-gray-600">
                                        {r.description || 'No description available.'}
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-700">
                                        {r.language && (
                                            <span className="px-2 py-1 bg-blue-100 rounded-full">
                                                {r.language}
                                            </span>
                                        )}
                                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                                            ★ {r.stargazers_count}
                                        </span>
                                        {r.updated_at && (
                                            <span className="px-2 py-1 bg-gray-100 rounded-full">
                                                Updated {new Date(r.updated_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="text-center mt-8">
                            <a
                                href="https://github.com/Aariyanakash"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
                            >
                                Explore All Projects
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* Certifications & Education */}
            <section className="py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 text-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-black mb-12 text-center">
                        Credentials & Education
                    </h2>

                    {/* Academic = left | Professional = right */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Academic Background</h3>
                            <ul className="space-y-8">
                                <li className="flex gap-4">
                                    <div>🎓</div>
                                    <div>
                                        <div className="font-semibold text-xl">
                                            MBA in Corporate Finance
                                        </div>
                                        <div className="text-sm text-gray-200">
                                            University of Cairo • 2021–2023
                                        </div>
                                        <div className="mt-1 text-gray-300">
                                            Dissertation: Comparative analysis of Islamic vs conventional credit models.
                                        </div>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div>📘</div>
                                    <div>
                                        <div className="font-semibold text-xl">
                                            B.Sc. in Accounting & Financial Management
                                        </div>
                                        <div className="text-sm text-gray-200">
                                            American University in Cairo • 2018–2022
                                        </div>
                                        <div className="mt-1 text-gray-300">Graduated top 10%, Dean’s List.</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">
                                Professional Credentials
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-xl">
                                        Certificate in Islamic Finance (CIF)
                                    </h4>
                                    <div className="text-sm text-gray-200">IFSB • 2023</div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-xl">
                                        CFA Level II Candidate
                                    </h4>
                                    <div className="text-sm text-gray-200">Exam scheduled Dec 2025</div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-xl">
                                        FMVA – Financial Modeling & Valuation Analyst
                                    </h4>
                                    <div className="text-sm text-gray-200">Corporate Finance Institute • 2024</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="py-20 bg-gradient-to-br from-yellow-400 to-orange-500 text-gray-900 text-center">
                <div className="max-w-xl mx-auto px-6">
                    <h2 className="text-5xl font-black mb-4">Let’s Collaborate</h2>
                    <p className="text-lg mb-6">
                        Interested in consulting, case-studies, or quantitative modeling? Reach out via
                        email or book a strategy session.
                    </p>
                    <div className="flex justify-center gap-6">
                        <a
                            href="mailto:arunjakash@gmail.com"
                            className="bg-white text-gray-900 font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300"
                        >
                            Contact Arun Akash
                        </a>
                        <a
                            href="https://aariyanakash.github.io/portfolio/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-900 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
                        >
                            Visit My Website
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}