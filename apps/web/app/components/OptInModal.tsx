'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { Righteous } from 'next/font/google';

const righteous = Righteous({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

const StickFigure = () => {
    return (
        <div className="absolute bottom-4 right-4">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="7" r="4" fill="#ff4f4f" />
                <line x1="15" y1="11" x2="15" y2="20" stroke="#ff4f4f" strokeWidth="2" />
                <line x1="15" y1="20" x2="10" y2="28" stroke="#ff4f4f" strokeWidth="2" />
                <line x1="15" y1="20" x2="20" y2="28" stroke="#ff4f4f" strokeWidth="2" />
                <line x1="15" y1="15" x2="8" y2="20" stroke="#ff4f4f" strokeWidth="2" />
                <line x1="15" y1="15" x2="22" y2="20" stroke="#ff4f4f" strokeWidth="2" />
            </svg>
        </div>
    );
};

interface OptInModalProps {
    onAccept: () => void;
}

export default function OptInModal({ onAccept }: OptInModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isHoveredAccept, setIsHoveredAccept] = useState(false);
    const [isHoveredDecline, setIsHoveredDecline] = useState(false);

    useEffect(() => {
        // Check if the user has already accepted
        const hasAccepted = Cookies.get('nidalee-opt-in');
        if (!hasAccepted) {
            setIsVisible(true);
        } else {
            onAccept();
        }
    }, [onAccept]);

    const handleAccept = () => {
        // Set cookie to expire in 1 year
        Cookies.set('nidalee-opt-in', 'true', { expires: 365 });
        setIsVisible(false);
        onAccept();
    };

    const handleDecline = () => {
        window.location.href = 'https://www.leagueoflegends.com';
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-neutral-100 border-2 border-[#ff4f4f] rounded-lg p-8 max-w-md mx-4 shadow-xl overflow-hidden"
                    >
                        {/* Decorative Corner Elements */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ff4f4f] -translate-x-0.5 -translate-y-0.5" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ff4f4f] translate-x-0.5 -translate-y-0.5" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ff4f4f] -translate-x-0.5 translate-y-0.5" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ff4f4f] translate-x-0.5 translate-y-0.5" />

                        <div className="text-center mb-6">
                            <h2 className={`${righteous.className} text-3xl font-bold text-[#ff4f4f] mb-2`}>
                                PLAYER NOTICE
                            </h2>
                            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#ff4f4f] to-transparent" />
                        </div>

                        <p className="text-neutral-700 mb-8 text-center leading-relaxed">
                            By joining Nidalee, you're allowing us to display your gameplay stats and data through our interface. Your gaming journey, your choice.
                        </p>

                        <div className="flex flex-col gap-4 items-center mb-8">
                            <motion.button
                                onClick={handleAccept}
                                onHoverStart={() => setIsHoveredAccept(true)}
                                onHoverEnd={() => setIsHoveredAccept(false)}
                                className={`w-48 px-6 py-3 bg-[#ff4f4f] text-white rounded relative overflow-hidden shadow-md ${righteous.className}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10">ACCEPT</span>
                                {isHoveredAccept && (
                                    <motion.div
                                        className="absolute inset-0 bg-[#ff8f8f]"
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    />
                                )}
                            </motion.button>

                            <motion.button
                                onClick={handleDecline}
                                onHoverStart={() => setIsHoveredDecline(true)}
                                onHoverEnd={() => setIsHoveredDecline(false)}
                                className={`w-48 px-6 py-3 bg-neutral-50 text-[#ff4f4f] border-2 border-[#ff4f4f] rounded relative overflow-hidden shadow-md ${righteous.className}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10">DECLINE</span>
                                {isHoveredDecline && (
                                    <motion.div
                                        className="absolute inset-0 bg-[#ff4f4f] opacity-10"
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    />
                                )}
                            </motion.button>
                        </div>

                        <StickFigure />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
} 