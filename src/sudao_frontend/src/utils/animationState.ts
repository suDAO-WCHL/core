let hasIntroAnimationPlayed = false;

export const getAnimationPlayedStatus = () => hasIntroAnimationPlayed;

export const setAnimationPlayedStatus = () => {
    hasIntroAnimationPlayed = true;
};