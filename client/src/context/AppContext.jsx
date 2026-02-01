import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [tokenReady, setTokenReady] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [blogsReady, setBlogsReady] = useState(false);
    const [input, setInput] = useState("");

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all');
            if (data.success) {
                setBlogs(data.blogs);
                setBlogsReady(true);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || "Failed to load blogs.");
        }
    };

    useEffect(() => {
        fetchBlogs();
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setTokenReady(true);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setTokenReady(false);
        }
    }, [token]);

    const value = {
        axios,
        navigate,
        token,
        setToken,
        tokenReady,
        blogs,
        setBlogs,
        blogsReady,
        input,
        setInput,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
