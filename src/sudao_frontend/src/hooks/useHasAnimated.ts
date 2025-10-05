import { useState } from 'react';
import { getAnimationPlayedStatus, setAnimationPlayedStatus } from '@/utils/animationState';

interface AnimationState {
    hasAnimated: boolean;
    setAnimationPlayed: () => void;
}

export const useHasAnimated = (): AnimationState => {
    // 1. Initialize state by reading the in-memory variable
    const initialValue = getAnimationPlayedStatus();
        
    const [hasAnimated, setHasAnimated] = useState<boolean>(initialValue);

    // 2. Function to set the flag in memory and state
    const setAnimationPlayed = () => {
        if (!hasAnimated) { 
            // Update the global in-memory variable
            setAnimationPlayedStatus();
            setHasAnimated(true);
        }
    };

    return { hasAnimated, setAnimationPlayed };
};