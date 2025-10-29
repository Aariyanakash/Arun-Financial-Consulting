import React, { useState } from 'react';
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";

const Login = () => {
    const { axios, setToken } = useAppContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data } = await axios.post("/api/admin/login", { email, password });

            if (data.success) {
                setToken(data.token);
                localStorage.setItem("token", data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                toast.success("Login successful!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] -z-10"></div>

            <div className="w-full max-w-md">
                {/* Login Card */}
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Admin Login
                        </h1>
                        <p className="text-gray-600">
                            Welcome back! Please enter your credentials to access the admin panel.
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 placeholder-gray-400"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 placeholder-gray-400"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-3">
                                    <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Sign In to Dashboard
                                </div>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <p className="text-xs text-gray-500">
                            Powered by your blog management system
                        </p>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center mt-6 gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Secure admin access</span>
                </div>
            </div>
        </div>
    );
};

export default Login;