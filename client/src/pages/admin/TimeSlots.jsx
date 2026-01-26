import React, { useEffect, useMemo, useState } from 'react';
import { Clock, Plus, Edit2, Trash2, Calendar, AlertCircle, Check } from 'lucide-react';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

const TimeSlots = () => {
    const { axios, tokenReady } = useAppContext();

    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingSlot, setEditingSlot] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        startTime: '',
        endTime: '',
        date: '',
        maxParticipants: '',
        description: '',
        isActive: true
    });

    const fetchTimeSlots = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/admin/timeslots');
            if (!data.success) throw new Error(data.message || 'Failed to load time slots');
            setTimeSlots(Array.isArray(data.timeSlots) ? data.timeSlots : []);
        } catch (e) {
            toast.error(e.message || 'Error loading time slots');
            setTimeSlots([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tokenReady) fetchTimeSlots();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenReady]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload = {
                title: formData.title?.trim(),
                date: formData.date, // backend does new Date()
                startTime: formData.startTime,
                endTime: formData.endTime,
                maxParticipants: Number(formData.maxParticipants),
                description: formData.description || '',
                isActive: !!formData.isActive,
                ...(editingSlot ? { currentParticipants: Number(editingSlot.currentParticipants || 0) } : {})
            };

            if (!editingSlot) {
                const { data } = await axios.post('/api/admin/timeslots', payload);
                if (!data.success) throw new Error(data.message || 'Create failed');
                toast.success('Time slot created');
            } else {
                const { data } = await axios.put(`/api/admin/timeslots/${editingSlot._id}`, payload);
                if (!data.success) throw new Error(data.message || 'Update failed');
                toast.success('Time slot updated');
            }
            await fetchTimeSlots();
            resetForm();
        } catch (e) {
            toast.error(e.message || 'Submit failed');
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            startTime: '',
            endTime: '',
            date: '',
            maxParticipants: '',
            description: '',
            isActive: true
        });
        setShowModal(false);
        setEditingSlot(null);
    };

    const handleEdit = (slot) => {
        setEditingSlot(slot);
        const dateStr = slot.date ? new Date(slot.date).toISOString().slice(0, 10) : '';
        setFormData({
            title: slot.title || '',
            startTime: slot.startTime || '',
            endTime: slot.endTime || '',
            date: dateStr,
            maxParticipants: Number(slot.maxParticipants || 1),
            description: slot.description || '',
            isActive: !!slot.isActive
        });
        setShowModal(true);
    };

    const handleDelete = async (slotId) => {
        if (!window.confirm('Are you sure you want to delete this time slot?')) return;
        try {
            const { data } = await axios.delete(`/api/admin/timeslots/${slotId}`);
            if (!data.success) throw new Error(data.message || 'Delete failed');
            toast.success('Time slot deleted');
            await fetchTimeSlots();
        } catch (e) {
            toast.error(e.message || 'Delete failed');
        }
    };

    const toggleStatus = async (slotId) => {
        const slot = timeSlots.find(s => s._id === slotId);
        if (!slot) return;
        try {
            const { data } = await axios.put(`/api/admin/timeslots/${slotId}`, { isActive: !slot.isActive });
            if (!data.success) throw new Error(data.message || 'Status update failed');
            toast.success(`Slot ${slot.isActive ? 'deactivated' : 'activated'}`);
            await fetchTimeSlots();
        } catch (e) {
            toast.error(e.message || 'Status update failed');
        }
    };

    const getStatusColor = (slot) => {
        if (!slot.isActive) return 'bg-red-100 text-red-800';
        if (Number(slot.currentParticipants) >= Number(slot.maxParticipants)) return 'bg-orange-100 text-orange-800';
        return 'bg-green-100 text-green-800';
    };

    const getStatusText = (slot) => {
        if (!slot.isActive) return 'Inactive';
        if (Number(slot.currentParticipants) >= Number(slot.maxParticipants)) return 'Full';
        return 'Available';
    };

    const totalSlots = timeSlots.length;
    const activeSlots = timeSlots.filter(slot => slot.isActive).length;
    const fullSlots = timeSlots.filter(slot => Number(slot.currentParticipants) >= Number(slot.maxParticipants) && slot.isActive).length;
    const totalParticipants = timeSlots.reduce((sum, slot) => sum + Number(slot.currentParticipants || 0), 0);

    const statCards = [
        { icon: Clock, value: totalSlots, label: 'Total Slots', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
        { icon: Check, value: activeSlots, label: 'Active Slots', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50' },
        { icon: AlertCircle, value: fullSlots, label: 'Full Slots', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50' },
        { icon: Calendar, value: totalParticipants, label: 'Total Bookings', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50' }
    ];

    if (loading) {
        return (
            <div className='flex-1 bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-full'>
                <div className='p-6 lg:p-8'>
                    <div className='animate-pulse'>
                        <div className='h-8 bg-gray-300 rounded mb-4'></div>
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8'>
                            {[1,2,3,4].map(i => (<div key={i} className='h-32 bg-gray-300 rounded-2xl'></div>))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex-1 bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-full'>
            <div className='p-6 lg:p-8'>
                {/* Header */}
                <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Time Slots</h1>
                        <p className='text-gray-600'>Manage appointment schedules and availability</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className='mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors'
                    >
                        <Plus className='w-5 h-5' />
                        Add Time Slot
                    </button>
                </div>

                {/* Stats Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8'>
                    {statCards.map((card, index) => (
                        <div
                            key={index}
                            className='group relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
                        >
                            <div className='p-6'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex-1'>
                                        <p className='text-3xl font-bold text-gray-900 mb-1'>{card.value}</p>
                                        <p className='text-sm font-medium text-gray-600'>{card.label}</p>
                                    </div>
                                    <div className={`${card.bgColor} p-4 rounded-xl`}>
                                        <card.icon className='w-8 h-8 text-gray-600' />
                                    </div>
                                </div>
                            </div>
                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`}></div>
                        </div>
                    ))}
                </div>

                {/* Time Slots List */}
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100'>
                    <div className='p-6 border-b border-gray-100'>
                        <h2 className='text-xl font-semibold text-gray-900'>All Time Slots</h2>
                        <p className='text-sm text-gray-500'>Manage your appointment slots</p>
                    </div>
                    <div className='p-6'>
                        {timeSlots.length === 0 ? (
                            <div className='text-center py-12'>
                                <Clock className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                                <h3 className='text-lg font-medium text-gray-900 mb-2'>No time slots yet</h3>
                                <p className='text-gray-500'>Create your first time slot to get started</p>
                            </div>
                        ) : (
                            <div className='grid gap-4'>
                                {timeSlots.map((slot) => (
                                    <div key={slot._id} className='border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow'>
                                        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                                            <div className='flex-1'>
                                                <div className='flex items-start gap-4'>
                                                    <div className='bg-blue-50 p-3 rounded-lg'>
                                                        <Clock className='w-6 h-6 text-blue-600' />
                                                    </div>
                                                    <div className='flex-1'>
                                                        <h3 className='text-lg font-semibold text-gray-900 mb-1'>{slot.title}</h3>
                                                        <p className='text-gray-600 mb-3'>{slot.description}</p>
                                                        <div className='flex flex-wrap items-center gap-4 text-sm text-gray-500'>
                              <span className='flex items-center gap-1'>
                                <Calendar className='w-4 h-4' />
                                  {slot.date ? new Date(slot.date).toLocaleDateString() : '—'}
                              </span>
                                                            <span className='flex items-center gap-1'>
                                <Clock className='w-4 h-4' />
                                                                {slot.startTime} - {slot.endTime}
                              </span>
                                                            <span className='flex items-center gap-1'>
                                <AlertCircle className='w-4 h-4' />
                                                                {Number(slot.currentParticipants || 0)}/{Number(slot.maxParticipants)} booked
                              </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-3 mt-4 lg:mt-0'>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(slot)}`}>
                          {getStatusText(slot)}
                        </span>
                                                <button
                                                    onClick={() => toggleStatus(slot._id)}
                                                    className={`p-2 rounded-lg transition-colors ${
                                                        slot.isActive
                                                            ? 'bg-green-50 text-green-600 hover:bg-green-100'
                                                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                                                    }`}
                                                    title={slot.isActive ? 'Deactivate' : 'Activate'}
                                                >
                                                    <Check className='w-4 h-4' />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(slot)}
                                                    className='p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors'
                                                    title='Edit'
                                                >
                                                    <Edit2 className='w-4 h-4' />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(slot._id)}
                                                    className='p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors'
                                                    title='Delete'
                                                >
                                                    <Trash2 className='w-4 h-4' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
                        <div className='bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto'>
                            <div className='p-6 border-b border-gray-100'>
                                <h3 className='text-xl font-semibold text-gray-900'>
                                    {editingSlot ? 'Edit Time Slot' : 'Add New Time Slot'}
                                </h3>
                            </div>

                            <form onSubmit={handleSubmit} className='p-6 space-y-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                                    <input
                                        type='text'
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        required
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>Start Time</label>
                                        <input
                                            type='time'
                                            value={formData.startTime}
                                            onChange={(e) => setFormData(prev => ({...prev, startTime: e.target.value}))}
                                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>End Time</label>
                                        <input
                                            type='time'
                                            value={formData.endTime}
                                            onChange={(e) => setFormData(prev => ({...prev, endTime: e.target.value}))}
                                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Date</label>
                                    <input
                                        type='date'
                                        value={formData.date}
                                        onChange={(e) => setFormData(prev => ({...prev, date: e.target.value}))}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Max Participants</label>
                                    <input
                                        type='number'
                                        min='1'
                                        value={formData.maxParticipants}
                                        onChange={(e) => setFormData(prev => ({...prev, maxParticipants: e.target.value}))}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        rows='3'
                                    />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        id='isActive'
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData(prev => ({...prev, isActive: e.target.checked}))}
                                        className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                                    />
                                    <label htmlFor='isActive' className='text-sm text-gray-700'>Active</label>
                                </div>
                                <div className='flex gap-3 pt-4'>
                                    <button
                                        type='submit'
                                        disabled={submitting}
                                        className='flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white py-2 px-4 rounded-lg font-medium transition-colors'
                                    >
                                        {submitting ? 'Saving…' : (editingSlot ? 'Update' : 'Create')} Slot
                                    </button>
                                    <button
                                        type='button'
                                        onClick={resetForm}
                                        className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimeSlots;