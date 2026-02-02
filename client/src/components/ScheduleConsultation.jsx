import React, { useState, useEffect } from "react";

const ScheduleConsultation = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientMessage, setClientMessage] = useState("");
    const [status, setStatus] = useState(null);
    const [availableSlots, setAvailableSlots] = useState(new Map());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showTimeSlots, setShowTimeSlots] = useState(false);

    // Match calendar height responsively. No scroll, no pagination.
    const PANEL_HEIGHT_CLASSES = "h-96 sm:h-[430px] md:h-[480px] lg:h-[540px]";

    const toYMDLocal = (d) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    const keyOf = (d) => toYMDLocal(new Date(d.getFullYear(), d.getMonth(), d.getDate()));

    const combineDateAndTime = (ymd, hhmm) => {
        const [h, m] = (hhmm || "00:00").split(":").map(Number);
        const dt = new Date(`${ymd}T00:00:00`);
        dt.setHours(h, m, 0, 0);
        return dt;
    };

    useEffect(() => {
        const loadSlots = async () => {
            try {
                const baseUrl = import.meta.env.VITE_BASE_URL || '';
                const res = await fetch(`${baseUrl}/public/timeslots?active=true`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const payload = await res.json();

                // Our API returns { success: true, timeSlots: [] }
                const data = payload.timeSlots || [];
                const map = new Map();
                const now = new Date();

                data.forEach((s) => {
                    if (s.startTime && s.endTime) {
                        const ymd = toYMDLocal(new Date(s.date));
                        const start = combineDateAndTime(ymd, s.startTime);
                        const end = combineDateAndTime(ymd, s.endTime);

                        if (!s.isActive) return;
                        if (Number(s.maxParticipants) <= Number(s.currentParticipants || 0)) return;
                        if (end <= now) return;

                        if (!map.has(ymd)) map.set(ymd, []);
                        map.get(ymd).push({
                            id: s._id,
                            startTime: start,
                            endTime: end,
                            date: new Date(`${ymd}T00:00:00`),
                            title: s.title,
                        });
                        return;
                    }

                    if (Array.isArray(s.timeSlots)) {
                        const ymd = toYMDLocal(new Date(s.date));
                        s.timeSlots.forEach((t) => {
                            if (t.isAvailable === false) return;
                            const start = combineDateAndTime(ymd, t.startTime);
                            const end = combineDateAndTime(ymd, t.endTime);
                            if (end <= now) return;

                            if (!map.has(ymd)) map.set(ymd, []);
                            map.get(ymd).push({
                                id: `${s._id}-${t.startTime}-${t.endTime}`,
                                startTime: start,
                                endTime: end,
                                date: new Date(`${ymd}T00:00:00`),
                                title: s.title || "Consultation",
                            });
                        });
                    }
                });

                for (const [k, arr] of map.entries()) {
                    arr.sort((a, b) => a.startTime - b.startTime);
                    map.set(k, arr);
                }

                setAvailableSlots(map);
            } catch (err) {
                console.error("Failed to load time slots:", err);
                setAvailableSlots(new Map());
            }
        };

        loadSlots();
    }, []);

    const handleDateSelect = (date) => {
        setSelectedDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
        setShowTimeSlots(true);
        setSelectedSlot(null);
    };

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
        setShowTimeSlots(false);
    };

    const handleMonthChange = (direction) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + direction);
        setCurrentMonth(newMonth);
        setShowTimeSlots(false);
        setSelectedDate(null);
    };

    const isDateAvailable = (date) => {
        const key = keyOf(date);
        return availableSlots.has(key) && (availableSlots.get(key)?.length || 0) > 0;
    };

    const getDateSlots = (date) => {
        const key = keyOf(date);
        return availableSlots.get(key) || [];
    };

    const formatTime = (date) =>
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

    const renderCalendar = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startingDayOfWeek = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        const today = new Date();
        theday: {
            /* scope label to keep variables tidy */
        }
        const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return (
            <div className="space-y-4">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => handleMonthChange(-1)}
                        className="p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <h4 className="text-2xl font-bold text-white">
                        {currentMonth.toLocaleDateString([], { month: "long", year: "numeric" })}
                    </h4>

                    <button
                        onClick={() => handleMonthChange(1)}
                        className="p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Day Labels */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="text-center text-purple-200 font-medium py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                    {days.map((date, index) => {
                        if (!date) return <div key={index} className="h-12" />;

                        const dayMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        const available = isDateAvailable(dayMidnight);
                        const isToday =
                            dayMidnight.getTime() === todayMidnight.getTime();
                        const isPast = dayMidnight < todayMidnight;
                        const isSelected =
                            selectedDate &&
                            dayMidnight.getTime() ===
                            new Date(
                                selectedDate.getFullYear(),
                                selectedDate.getMonth(),
                                selectedDate.getDate()
                            ).getTime();

                        return (
                            <button
                                key={index}
                                onClick={() => (available && !isPast ? handleDateSelect(dayMidnight) : null)}
                                disabled={!available || isPast}
                                className={`h-12 rounded-lg transition-all duration-300 text-sm font-medium relative ${
                                    isPast
                                        ? "text-gray-500 cursor-not-allowed opacity-30"
                                        : isSelected
                                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 scale-105"
                                            : available
                                                ? "bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-purple-400/50 hover:scale-105 cursor-pointer"
                                                : "text-gray-400 cursor-not-allowed opacity-50"
                                }`}
                            >
                                {date.getDate()}
                                {isToday && (
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                )}
                                {available && !isPast && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full opacity-75" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderTimeSlots = () => {
        if (!selectedDate) return null;
        const slots = getDateSlots(selectedDate);

        // Fixed grid: 2 cols on mobile, 3 on md+, max 6 rows. No scroll, no pagination.
        const isMd = typeof window !== "undefined" ? window.innerWidth >= 768 : false;
        const cols = isMd ? 3 : 2;
        const maxVisible = cols * 6; // 6 rows to mirror calendar feel
        const visible = slots.slice(0, maxVisible);
        const hiddenCount = Math.max(0, slots.length - visible.length);

        return (
            <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowTimeSlots(false)}
                        className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all duration-300"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h4 className="text-xl font-bold text-white">
                        {selectedDate.toLocaleDateString([], {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                        })}
                    </h4>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {visible.map((slot) => (
                        <button
                            key={slot.id}
                            onClick={() => handleSlotSelection(slot)}
                            className="px-4 py-3 rounded-lg border transition-all duration-300 font-medium text-sm bg-white/10 border-white/20 text-purple-100 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:border-purple-400/50 hover:text-white hover:scale-105"
                        >
                            {formatTime(slot.startTime)}
                        </button>
                    ))}
                </div>

                {hiddenCount > 0 && (
                    <div className="text-center text-purple-200 text-sm opacity-80">
                        +{hiddenCount} more times available
                    </div>
                )}
            </div>
        );
    };

    const handleBooking = async () => {
        if (!selectedSlot || !clientName || !clientEmail) {
            setStatus({ type: "error", message: "Please fill all required fields and select a time slot." });
            return;
        }

        setStatus({ type: "loading", message: "Sending your consultation request..." });

        try {
            const slotTimeString = selectedSlot.startTime
                ? `${selectedSlot.startTime.toLocaleDateString([], {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })} from ${selectedSlot.startTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })} to ${selectedSlot.endTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })}`
                : "Time not selected";

            const baseUrl = import.meta.env.VITE_BASE_URL || '';
            const response = await fetch(`${baseUrl}/public/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: clientName,
                    lastName: "Consultation Booking",
                    email: clientEmail,
                    phone: "Not provided",
                    service: "Free Consultation",
                    message: `Booked Slot: ${slotTimeString}\n\nAdditional Message: ${clientMessage || "No specific message provided."}`,
                }),
            });

            const data = await response.json().catch(() => ({}));
            if (!response.ok || !data.success) {
                throw new Error(data.message || `Request failed (${response.status})`);
            }

            setStatus({
                type: "success",
                message: `🎉 Consultation booked successfully! Confirmation sent to ${clientEmail}`,
            });

            setTimeout(() => {
                setSelectedSlot(null);
                setClientName("");
                setClientEmail("");
                setClientMessage("");
                setStatus(null);
            }, 5000);
        } catch (error) {
            console.error("Booking Error:", error);
            setStatus({
                type: "error",
                message: "❌ Failed to send booking request. Please try again or contact us directly.",
            });
            setTimeout(() => setStatus(null), 5000);
        }
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden z-50">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${15 + Math.random() * 10}s`,
                        }}
                    ></div>
                ))}
            </div>

            <div className="w-full max-w-7xl mx-auto relative z-10 overflow-y-auto max-h-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        Book Your Free Consultation
                    </h1>
                </div>

                {/* Main Glass Container */}
                <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8">
                    <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
                        {/* Section 1: Custom Calendar Selection */}
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-sm">
                                    1
                                </div>
                                Choose Your Time
                            </h3>

                            <div className={`bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-xl ${PANEL_HEIGHT_CLASSES} overflow-hidden`}>
                                {showTimeSlots ? renderTimeSlots() : renderCalendar()}
                            </div>

                            {selectedSlot && (
                                <div className="mt-6">
                                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl border border-purple-400/30 p-4 shadow-lg animate-fadeIn">
                                        <div className="text-center">
                                            <div className="text-white font-semibold text-lg mb-2">✅ Selected Time:</div>
                                            <div className="text-purple-200 text-sm mb-1">
                                                {selectedSlot.startTime?.toLocaleDateString([], {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </div>
                                            <div className="text-purple-100 font-medium">
                                                {formatTime(selectedSlot.startTime)} - {formatTime(selectedSlot.endTime)}
                                            </div>
                                            <div className="text-purple-300 text-xs mt-2">60 minute consultation</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Section 2: Contact Form */}
                        <div className="flex-1 xl:max-w-md">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-sm">
                                    2
                                </div>
                                Your Details
                            </h3>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            placeholder="Your Full Name *"
                                            value={clientName}
                                            onChange={(e) => setClientName(e.target.value)}
                                            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 backdrop-blur-sm transition-all duration-300 focus:bg-white/15 focus:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400/25"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            placeholder="Your Email Address *"
                                            value={clientEmail}
                                            onChange={(e) => setClientEmail(e.target.value)}
                                            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 backdrop-blur-sm transition-all duration-300 focus:bg-white/15 focus:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400/25"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <textarea
                                            placeholder="What would you like to discuss? (Optional)"
                                            value={clientMessage}
                                            onChange={(e) => setClientMessage(e.target.value)}
                                            rows={4}
                                            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 backdrop-blur-sm transition-all duration-300 focus:bg-white/15 focus:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400/25 resize-none"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleBooking}
                                    disabled={!selectedSlot || !clientName || !clientEmail || status?.type === "loading"}
                                    className="w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 active:scale-95"
                                >
                                    {status?.type === "loading" ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Booking...
                                        </div>
                                    ) : (
                                        "Book My Free Consultation"
                                    )}
                                </button>

                                {status && (
                                    <div
                                        className={`p-4 rounded-xl backdrop-blur-sm transition-all duration-500 animate-fadeIn ${
                                            status.type === "success"
                                                ? "bg-green-500/20 border border-green-400/30 text-green-100"
                                                : status.type === "error"
                                                    ? "bg-red-500/20 border border-red-400/30 text-red-100"
                                                    : "bg-blue-500/20 border border-blue-400/30 text-blue-100"
                                        }`}
                                    >
                                        <div className="text-center font-medium">{status.message}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 mb-4 text-purple-200">
                    <p className="text-sm">🔒 Your information is secure and will never be shared with third parties</p>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    33% {
                        transform: translateY(-30px) rotate(120deg);
                    }
                    66% {
                        transform: translateY(30px) rotate(240deg);
                    }
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-float {
                    animation: float linear infinite;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .hover\\:scale-102:hover {
                    transform: scale(1.02);
                }
            `}</style>
        </div>
    );
};

export default ScheduleConsultation;
