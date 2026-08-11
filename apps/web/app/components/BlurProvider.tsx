'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import dynamic from 'next/dynamic';

const OptInModal = dynamic(() => import('./OptInModal'), {
    ssr: false
});

const BlurContext = createContext<{
    isBlurred: boolean;
    setIsBlurred: (value: boolean) => void;
}>({
    isBlurred: true,
    setIsBlurred: () => { },
});

export const useBlur = () => useContext(BlurContext);

export default function BlurProvider({ children }: { children: ReactNode }) {
    const [isBlurred, setIsBlurred] = useState(true);

    return (
        <BlurContext.Provider value={{ isBlurred, setIsBlurred }}>
            <div className={`transition-all duration-500 ${isBlurred ? 'blur-sm' : ''}`}>
                {children}
            </div>
            <OptInModal onAccept={() => setIsBlurred(false)} />
        </BlurContext.Provider>
    );
} 