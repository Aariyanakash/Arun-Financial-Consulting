import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from "./pages/admin/Layout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AddBlog from "./pages/admin/AddBlog.jsx";
import ListBlog from "./pages/admin/ListBlog.jsx";
import Comments from "./pages/admin/Comments.jsx";
import Login from "./components/admin/Login.jsx";
import 'quill/dist/quill.snow.css';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from "./context/AppContext.jsx";
import BlogHome from "./pages/BlogHome.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Footer from "./components/Footer";
import Navbar from './components/Navbar';
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import TimeSlots from "./pages/admin/TimeSlots.jsx";
import { SpeedInsights } from '@vercel/speed-insights/react';

const App = () => {
    const { token } = useAppContext();
    const location = useLocation();

    const hideNavAndFooter = location.pathname.startsWith('/admin');

    return (
        <div className="min-h-screen flex flex-col">
            <Toaster />
            {!hideNavAndFooter && <Navbar />}
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contacts" element={<Contact />} />
                    <Route path="/blog" element={<BlogHome />} />
                    <Route path="/blog/:id" element={<Blog />} />

                    {/* Admin routes, with layout */}
                    <Route path="/admin" element={token ? <Layout /> : <Login />}>
                        <Route index element={<Dashboard />} />
                        <Route path="addBlog" element={<AddBlog />} />
                        <Route path="addBlog/:id" element={<AddBlog />} />
                        <Route path="listBlog" element={<ListBlog />} />
                        <Route path="comments" element={<Comments />} />
                        <Route path="timeslots" element={<TimeSlots />} />
                    </Route>
                </Routes>
            </main>
            {!hideNavAndFooter && <Footer />}
            <SpeedInsights />
        </div>
    )
}

export default App
