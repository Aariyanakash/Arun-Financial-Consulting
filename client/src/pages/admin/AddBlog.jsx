import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { assets, blogCategories } from "../../assets/assets.js";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import { useParams, useNavigate } from 'react-router-dom';

const AddBlog = () => {
    const { axios, tokenReady } = useAppContext();
    const { id } = useParams();
    const navigate = useNavigate();

    // Add/edit mode
    const isEditMode = Boolean(id);

    // Editor/Quill refs & states
    const fullscreenEditorRef = useRef(null);
    const fullscreenQuillRef = useRef(null);
    const scrollContainerRef = useRef(null);

    const [image, setImage] = useState(null); // File (for upload)
    const [imagePreview, setImagePreview] = useState(null); // URL (for preview)
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [category, setCategory] = useState('Startup');
    const [isPublished, setIsPublished] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);

    const [editorContent, setEditorContent] = useState('');
    const [aiButtonPosition, setAiButtonPosition] = useState({ bottom: 24, right: 24 });
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [loadingBlog, setLoadingBlog] = useState(false);

    // Fetch blog if edit mode
    useEffect(() => {
        if (isEditMode && tokenReady) {
            setLoadingBlog(true);
            axios.get(`/api/blog/${id}`)
                .then(res => {
                    if (res.data.success) {
                        const blog = res.data.blog;
                        setTitle(blog.title);
                        setSubtitle(blog.subTitle);
                        setCategory(blog.category);
                        setEditorContent(blog.description);
                        setIsPublished(blog.isPublished);
                        setImage(null);
                        setImagePreview(blog.image); // For preview
                    } else {
                        toast.error(res.data.message || "Could not fetch blog");
                        navigate('/admin/listBlog');
                    }
                })
                .catch(e => {
                    toast.error(e.message || "Could not fetch blog");
                    navigate('/admin/listBlog');
                })
                .finally(() => setLoadingBlog(false));
        }
        // eslint-disable-next-line
    }, [id, tokenReady]);

    // IMAGE HANDLER for Quill
    const createImageHandler = useCallback((quillInstance) => {
        return function() {
            if (!tokenReady) {
                toast.error("Please wait for authentication...");
                return;
            }
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();

            input.onchange = async () => {
                const file = input.files?.[0];
                if (file) {
                    const formData = new FormData();
                    formData.append('image', file);

                    try {
                        const { data } = await axios.post('/api/blog/upload-editor-image', formData);
                        if (data.success && data.url) {
                            const range = quillInstance.getSelection(true);
                            if (range) {
                                quillInstance.insertEmbed(range.index, 'image', data.url);
                                quillInstance.setSelection(range.index + 1);
                            }
                        } else {
                            toast.error(data.message || "Image upload failed.");
                        }
                    } catch (err) {
                        toast.error("Image upload failed");
                    }
                }
            };
        };
    }, [axios, tokenReady]);

    // Prevent body scroll when in fullscreen
    useEffect(() => {
        document.body.style.overflow = fullscreen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [fullscreen]);

    // Close fullscreen on ESC key, save on Ctrl+S
    useEffect(() => {
        if (!fullscreen) return;
        const handleKey = (e) => {
            if (e.key === "Escape") {
                if (hasUnsavedChanges && fullscreenQuillRef.current) {
                    const content = fullscreenQuillRef.current.root.innerHTML;
                    setEditorContent(content);
                    setHasUnsavedChanges(false);
                    setLastSaved(new Date());
                }
                setFullscreen(false);
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSaveContent();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
        // eslint-disable-next-line
    }, [fullscreen, hasUnsavedChanges]);

    // Handle scroll for AI button positioning
    useEffect(() => {
        if (!fullscreen || !scrollContainerRef.current) return;

        const handleScroll = () => {
            const container = scrollContainerRef.current;
            if (container) {
                const scrollTop = container.scrollTop;
                const containerHeight = container.clientHeight;
                const scrollHeight = container.scrollHeight;

                const maxScroll = scrollHeight - containerHeight;
                const scrollPercentage = scrollTop / maxScroll;

                const newBottom = 24 + (scrollPercentage * 100);
                setAiButtonPosition({
                    bottom: Math.min(newBottom, containerHeight - 80),
                    right: 24
                });
            }
        };

        const container = scrollContainerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [fullscreen]);

    // Initialize fullscreen Quill editor
    useEffect(() => {
        if (!fullscreen || !fullscreenEditorRef.current) {
            if (fullscreenQuillRef.current) {
                fullscreenQuillRef.current = null;
            }
            return;
        }

        const quill = new Quill(fullscreenEditorRef.current, {
            theme: 'snow',
            modules: {
                toolbar: {
                    container: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link', 'image'],
                        ['clean']
                    ]
                }
            }
        });

        quill.getModule('toolbar').addHandler('image', createImageHandler(quill));
        if (editorContent) {
            quill.root.innerHTML = editorContent;
        }
        quill.on('text-change', () => {
            setEditorContent(quill.root.innerHTML);
            setHasUnsavedChanges(true);
        });

        fullscreenQuillRef.current = quill;
        setTimeout(() => quill.focus(), 100);

        return () => {
            if (fullscreenQuillRef.current) {
                setEditorContent(fullscreenQuillRef.current.root.innerHTML);
                fullscreenQuillRef.current = null;
            }
        };
    }, [fullscreen, createImageHandler, editorContent]);

    const generateContent = async () => {
        if (!tokenReady) {
            toast.error("Please wait for authentication...");
            return;
        }
        // AI content logic here
        toast('AI content generation coming soon!');
    };

    const handleSaveContent = async () => {
        if (!fullscreenQuillRef.current) return;
        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const content = fullscreenQuillRef.current.root.innerHTML;
            setEditorContent(content);
            setHasUnsavedChanges(false);
            setLastSaved(new Date());
            toast.success("Content saved successfully!");
        } catch (error) {
            toast.error("Failed to save content");
        } finally {
            setIsSaving(false);
        }
    };

    const handleFullscreenClose = () => {
        if (hasUnsavedChanges && fullscreenQuillRef.current) {
            const content = fullscreenQuillRef.current.root.innerHTML;
            setEditorContent(content);
            setHasUnsavedChanges(false);
            setLastSaved(new Date());
        }
        setFullscreen(false);
        setAiButtonPosition({ bottom: 24, right: 24 });
    };

    const handleOpenFullscreen = () => {
        if (!tokenReady) {
            toast.error("Please wait for authentication...");
            return;
        }
        setFullscreen(true);
    };

    // Main submit: Add or Edit
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!tokenReady) {
            toast.error("Please wait for authentication...");
            return;
        }
        if (!image && !isEditMode) {
            toast.error("Please select an image.");
            return;
        }
        if (!editorContent || !editorContent.trim() || editorContent === '<p><br></p>') {
            toast.error("Blog description is required.");
            return;
        }
        setIsAdding(true);
        try {
            const blog = {
                ...(isEditMode ? { id } : {}),
                title,
                subTitle: subtitle,
                description: editorContent,
                category,
                isPublished
            };
            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog));
            if (image) formData.append('image', image);

            const endpoint = isEditMode ? '/api/blog/edit' : '/api/blog/add';
            const { data } = await axios.post(endpoint, formData);
            if (data.success) {
                toast.success(data.message);
                setImage(null);
                setImagePreview(null);
                setTitle('');
                setSubtitle('');
                setCategory('Startup');
                setIsPublished(false);
                setEditorContent('');
                setHasUnsavedChanges(false);
                setLastSaved(null);
                // After save, go back to blog list
                setTimeout(() => navigate('/admin/listBlog'), 1200);
            } else {
                toast.error(data.message || "Something went wrong.");
            }
        } catch (e) {
            toast.error(e.message || "Something went wrong.");
        } finally {
            setIsAdding(false);
        }
    };

    // Show loader until tokenReady or loading blog
    if (!tokenReady || (isEditMode && loadingBlog)) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <svg className="animate-spin h-8 w-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-lg text-gray-600">{isEditMode ? 'Loading blog...' : 'Preparing editor...'}</span>
            </div>
        );
    }

    // Main placeholder
    const renderPlaceholder = () => (
        <div
            className={`w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center ${!tokenReady ? 'opacity-60 pointer-events-none' : ''}`}
            onClick={tokenReady ? handleOpenFullscreen : undefined}
            title={tokenReady ? undefined : "Please wait for authentication..."}
        >
            <div className="text-center">
                <div className="flex items-center justify-center space-x-2">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="text-gray-600 font-medium">Click to write your blog content</span>
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                    </svg>
                </div>
                {editorContent && (
                    <p className="text-xs text-green-600 mt-1">✓ Content saved ({editorContent.replace(/<[^>]*>/g, '').length} characters)</p>
                )}
            </div>
        </div>
    );

    // Fullscreen editor
    const renderFullscreenEditor = () => (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col" style={{ boxShadow: "0 0 0 9999px rgba(0,0,0,0.4)" }}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-semibold text-gray-900">Blog Editor</h2>
                    <div className="flex items-center space-x-3">
                        {editorContent && (
                            <span className="text-sm text-gray-500">
                                {editorContent.replace(/<[^>]*>/g, '').length} characters
                            </span>
                        )}
                        <div className="flex items-center space-x-2">
                            {hasUnsavedChanges ? (
                                <span className="flex items-center text-sm text-amber-600">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Unsaved changes
                                </span>
                            ) : lastSaved ? (
                                <span className="flex items-center text-sm text-green-600">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Saved {lastSaved.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        type="button"
                        onClick={handleSaveContent}
                        disabled={isSaving || !hasUnsavedChanges}
                        className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            hasUnsavedChanges
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        title="Save changes (Ctrl+S)"
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                Save
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={handleFullscreenClose}
                        className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
                        title="Close editor (ESC)"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-auto p-6"
            >
                <div className="w-full">
                    <div
                        ref={fullscreenEditorRef}
                        className="min-h-[600px] bg-white w-full"
                        style={{ outline: "none" }}
                    />
                </div>
            </div>
            <button
                type='button'
                onClick={generateContent}
                className="fixed bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 font-medium z-50"
                style={{
                    bottom: `${aiButtonPosition.bottom}px`,
                    right: `${aiButtonPosition.right}px`,
                    transform: 'translateY(0px)',
                    transition: 'bottom 0.3s ease-out'
                }}
                disabled={!tokenReady}
                title={!tokenReady ? "Please wait for authentication..." : undefined}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7L12 2z"/>
                    <path d="M12 8v8"/>
                    <path d="M8 12h8"/>
                </svg>
                Generate with AI
            </button>
        </div>
    );

    return (
        <div className='w-full bg-blue-50/50 text-gray-600 min-h-full p-4 pb-8'>
            <div className='bg-white w-full shadow-xl rounded-lg overflow-hidden'>
                <form onSubmit={onSubmitHandler} className="w-full">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4">
                        <h1 className="text-2xl font-bold">
                            {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
                        </h1>
                        <p className="text-blue-100 text-sm mt-1">
                            {isEditMode ? 'Update your blog details below' : 'Fill in the details below to create your blog post'}
                        </p>
                    </div>
                    <div className="p-6 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Blog Thumbnail
                                </label>
                                <label htmlFor='image' className={`cursor-pointer ${!tokenReady ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={image ? URL.createObjectURL(image) : (imagePreview || assets.upload_area)}
                                                alt=''
                                                className='h-16 w-16 rounded-lg object-cover'
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {image ? image.name : (imagePreview ? "Current image" : 'Upload thumbnail')}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Click to {image ? 'change' : (imagePreview ? "replace" : 'upload')} image
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        onChange={tokenReady ? (e) => {
                                            setImage(e.target.files[0]);
                                            setImagePreview(null);
                                        } : undefined}
                                        type='file'
                                        id='image'
                                        hidden
                                        accept="image/*"
                                        disabled={!tokenReady}
                                        required={!isEditMode}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Blog Title
                                </label>
                                <input
                                    type='text'
                                    placeholder='Enter an engaging title for your blog'
                                    required
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                                    onChange={tokenReady ? (e) => setTitle(e.target.value) : undefined}
                                    value={title}
                                    disabled={!tokenReady}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sub Title
                                </label>
                                <input
                                    type='text'
                                    placeholder='Brief description or subtitle'
                                    required
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                                    onChange={tokenReady ? (e) => setSubtitle(e.target.value) : undefined}
                                    value={subtitle}
                                    disabled={!tokenReady}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                                    onChange={tokenReady ? (e) => setCategory(e.target.value) : undefined}
                                    value={category}
                                    required
                                    disabled={!tokenReady}
                                >
                                    <option value="">Select a category</option>
                                    {blogCategories.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    id="publish"
                                    checked={isPublished}
                                    className='h-4 w-4 text-blue-600 rounded focus:ring-blue-500'
                                    onChange={tokenReady ? (e) => setIsPublished(e.target.checked) : undefined}
                                    disabled={!tokenReady}
                                />
                                <label htmlFor="publish" className="text-sm font-medium text-gray-700 cursor-pointer">
                                    Publish {isEditMode ? "immediately" : "immediately after creation"}
                                </label>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Blog Content
                                </label>
                                {renderPlaceholder()}
                            </div>
                            <div className="flex flex-col space-y-3 pt-4">
                                <button
                                    disabled={isAdding || !tokenReady}
                                    type="submit"
                                    className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2'
                                >
                                    {isAdding ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>{isEditMode ? 'Updating Blog...' : 'Creating Blog...'}</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <span>{isEditMode ? 'Update Blog Post' : 'Create Blog Post'}</span>
                                        </>
                                    )}
                                </button>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">
                                        Make sure to save your content before submitting
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {fullscreen && ReactDOM.createPortal(renderFullscreenEditor(), document.body)}
        </div>
    );
};

export default AddBlog;
