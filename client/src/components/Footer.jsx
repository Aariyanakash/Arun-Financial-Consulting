import React, { useState } from 'react';
import { assets } from "../assets/assets.js";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      setNewsletterStatus({ type: "error", message: "Please enter your email" });
      return;
    }

    setNewsletterStatus({ type: "loading", message: "Subscribing..." });

    try {
      const baseUrl = import.meta.env.VITE_BASE_URL || '';
      const response = await fetch(`${baseUrl}/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: "Newsletter Subscriber",
          lastName: "Newsletter",
          email: newsletterEmail,
          phone: "",
          service: "Newsletter Subscription",
          message: "New newsletter subscriber",
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) {
        throw new Error(data.message || `Request failed (${response.status})`);
      }

      setNewsletterStatus({
        type: "success",
        message: "✓ Successfully subscribed! Check your email for details.",
      });
      setNewsletterEmail("");

      setTimeout(() => setNewsletterStatus(null), 4000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setNewsletterStatus({
        type: "error",
        message: "Failed to subscribe. Please try again.",
      });
      setTimeout(() => setNewsletterStatus(null), 4000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-blue-100 via-blue-200 to-cyan-100 text-slate-700 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:60px_60px]" />

      <div className="relative z-10 px-6 md:px-14 lg:px-20 xl:px-24">

        {/* MAIN */}
        <div className="py-10 border-b border-slate-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-5 space-y-4">
              <img
                src={assets.logo}
                alt="Arun Jakash"
                className="w-24 sm:w-30"
                // style={{ filter: 'brightness(0) invert(1)' }}
              />

              <p className="text-slate-600 text-sm leading-relaxed max-w-md">
                Personalized financial planning helping individuals and families
                achieve long-term financial security since 2014.
              </p>

              {/* Contact */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-slate-200 rounded-lg p-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28l1.5 4.49-2.26 1.13a11 11 0 005.52 5.52l1.13-2.26 4.49 1.5V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">+91 8122920290</span>
                </div>

                <div className="flex items-center gap-2 bg-slate-200 rounded-lg p-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-md flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        d="M3 8l7.9 5.26a2 2 0 002.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">arunfinancialconsulting@gmail.com</span>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-3 pt-2">
                {[
                  { name: "linkedin", color: "from-blue-600 to-blue-700" },
                //   { name: "twitter", color: "from-sky-500 to-blue-600" },
                  { name: "instagram", color: "from-pink-500 to-purple-600" }
                ].map((social, i) => (
                  <div key={i} className={`w-9 h-9 bg-gradient-to-r ${social.color} rounded-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer`}>
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      {social.name === "linkedin" && (
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      )}
                      {social.name === "twitter" && (
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75-2.63 7-7 7-11.38A10.62 10.62 0 0023 3z" />
                      )}
                      {social.name === "instagram" && (
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.77.3-1.417.72-2.05 1.35-.63.633-1.05 1.28-1.35 2.05-.267.788-.468 1.658-.528 2.936C.008 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.528 2.936.3.77.72 1.417 1.35 2.05.633.63 1.28 1.05 2.05 1.35.788.267 1.659.468 2.936.528C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.261 2.936-.528.77-.3 1.417-.72 2.05-1.35.63-.633 1.05-1.28 1.35-2.05.267-.788.468-1.659.528-2.936.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.148-.528-2.936-.3-.77-.72-1.417-1.35-2.05-.633-.63-1.28-1.05-2.05-1.35-.788-.267-1.659-.468-2.936-.528C15.667.008 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.070 1.17.054 1.805.244 2.227.408.56.217.96.477 1.382.896.419.42.679.822.896 1.381.164.422.354 1.057.408 2.227.061 1.264.07 1.645.07 4.849 0 3.204-.009 3.585-.07 4.849-.054 1.17-.244 1.805-.408 2.227-.217.56-.477.96-.896 1.382-.42.419-.822.679-1.381.896-.422.164-1.057.354-2.227.408-1.264.061-1.645.07-4.849.07-3.204 0-3.585-.009-4.849-.07-1.17-.054-1.805-.244-2.227-.408-.56-.217-.96-.477-1.382-.896-.419-.42-.679-.822-.896-1.381-.164-.422-.354-1.057-.408-2.227-.061-1.264-.07-1.645-.07-4.849 0-3.204.009-3.585.07-4.849.054-1.17.244-1.805.408-2.227.217-.56.477-.96.896-1.382.42-.419.822-.679 1.381-.896.422-.164 1.057-.354 2.227-.408 1.264-.061 1.645-.07 4.849-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88z" />
                      )}
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* LINKS */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">

                {[
                  { title: "Services", items: ["Financial Planning", "Investments", "Retirement", "Tax Planning"] },
                  { title: "Resources", items: ["Insights", "Blog", "Calculators", "FAQ"] },
                  { title: "About", items: ["Approach", "Testimonials", "Contact"] }
                ].map((section, i) => (
                  <div key={i}>
                    <h3 className="font-semibold mb-3">{section.title}</h3>
                    <ul className="space-y-2 text-slate-600">
                      {section.items.map((item, j) => (
                        <li key={j} className="hover:text-white transition">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="py-8 border-b border-slate-700 text-center">
          <h3 className="text-lg font-semibold mb-2 text-slate-100">
            Get monthly financial insights
          </h3>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none text-slate-200 placeholder-slate-500 focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={newsletterStatus?.type === "loading"}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {newsletterStatus?.type === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {newsletterStatus && (
            <div className={`mt-3 text-sm font-medium ${
              newsletterStatus.type === "success"
                ? "text-green-400"
                : newsletterStatus.type === "error"
                ? "text-red-400"
                : "text-blue-400"
            }`}>
              {newsletterStatus.message}
            </div>
          )}
        </div>

        {/* BOTTOM */}
        <div className="py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-600">
          <p>©️ {currentYear} <span className="text-slate-800 font-medium">Arun Jakash</span>. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-800">Privacy</span>
            <span className="hover:text-slate-800">Terms</span>
            <span className="hover:text-slate-800">Disclosure</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
