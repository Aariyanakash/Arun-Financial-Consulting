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
        
        // Filter for specific projects
        const targetProjects = [
            'An-Extensive-study-of-Dell-s-LBO-from-Investors-Perspective',
            'Business-and-Financial-Analysis-of-Hella',
            'Corporate-Finance',
            'Quantitative-Finance-and-Financial-Markets'
        ];
        
        setRepos(
            data.filter(r => targetProjects.some(proj => r.name.includes(proj)))
        );
    } catch (e) {
        console.warn('Error loading projects:', e);
    }
}

// Icon mapping for projects
const projectIcons = {
    'dell': '📊',
    'hella': '🏢',
    'corporate': '💼',
    'quantitative': '📈'
};

const getProjectIcon = (repoName) => {
    const name = repoName.toLowerCase();
    if (name.includes('dell')) return '📊';
    if (name.includes('hella')) return '🏢';
    if (name.includes('corporate')) return '💼';
    if (name.includes('quantitative')) return '📈';
    return '📁';
};

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

            {/* Recent Projects from User's Work (Finance Only) */}
            {repos.length > 0 && (
                <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
                    <div className="max-w-5xl mx-auto px-6">
                        <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
                            Recent Projects & Research Initiatives
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {repos.map(r => (
                                <a
                                    key={r.id}
                                    href={r.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="text-6xl flex-shrink-0">
                                            {getProjectIcon(r.name)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors mb-2 break-words">
                                                {r.name.replace(/-/g, ' ')}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                                {r.description || 'Financial analysis and research project'}
                                            </p>
                                            <div className="flex flex-wrap gap-3">
                                                {r.language && (
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                                        {r.language}
                                                    </span>
                                                )}
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                                    ⭐ {r.stargazers_count}
                                                </span>
                                                {r.updated_at && (
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                                                        {new Date(r.updated_at).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        })}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <a
                                href="https://github.com/Aariyanakash"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                            >
                                Explore All Projects on GitHub
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
                                    <div className="text-4xl flex-shrink-0">🎓</div>
                                    <div>
                                        <div className="font-semibold text-xl">
                                            MSc in Finance and Investments
                                        </div>
                                        <div className="text-sm text-gray-200">
                                            Berlin school of Business and Innovations • 2022–2024
                                        </div>
                                        <div className="mt-1 text-gray-300">
                                            Dissertation: An Extensive study of Dell's LBO from Investors Perspective.
                                        </div>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="text-4xl flex-shrink-0">📘</div>
                                    <div>
                                        <div className="font-semibold text-xl">
                                            MBA in Financial Management & Human Resources
                                        </div>
                                        <div className="text-sm text-gray-200">
                                            University of Madras • 2018–2020
                                        </div>
                                        <div className="mt-1 text-gray-300">Graduated top 10%, Dean's List.</div>
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
                                    <h4 className="font-semibold text-xl flex items-center gap-2">
                                        <span className="text-3xl">📜</span>
                                        Certificate in Financial Modelling (CIF)
                                    </h4>
                                    <div className="text-sm text-gray-200">IFSB • 2023</div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-xl flex items-center gap-2">
                                        <span className="text-3xl">🎯</span>
                                        CFA Level II Candidate
                                    </h4>
                                    <div className="text-sm text-gray-200">Exam scheduled Dec 2025</div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-xl flex items-center gap-2">
                                        <span className="text-3xl">💡</span>
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
                    <h2 className="text-5xl font-black mb-4">Let's Collaborate</h2>
                    <p className="text-lg mb-6">
                        Interested in consulting, case-studies, or quantitative modeling? Reach out via
                        email or book a strategy session.
                    </p>
                    <div className="flex justify-center gap-6 flex-wrap">
                        <a
                            href="mailto:arunfinancialconsulting@gmail.com"
                            className="bg-white text-gray-900 font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Contact Arun Akash
                        </a>
                        <a
                            href="https://aariyanakash.github.io/portfolio/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-900 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            Visit My Website
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
