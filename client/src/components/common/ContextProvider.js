import React, { createContext, useEffect, useState } from 'react';
export const ContextEnvironment = createContext();

const ContextProvider = ({ children }) => {
    const [scrollToView, setScrollToView] = useState(false);
    const [resize, setResize] = useState(false);
    const [deviceSize, changeDeviceSize] = useState(window.innerWidth);

    useEffect(() => {
        deviceSize <= 1024 ? setResize(true) : setResize(false);
    }, [deviceSize]);

    useEffect(() => {
        const resizeW = () => changeDeviceSize(window.innerWidth);
        window.addEventListener('resize', resizeW); // Update the width on resize
        return () => window.removeEventListener('resize', resizeW);
    }, []);

    const handleScrollToView = () => {
        setScrollToView(prev => !prev);
    };

    return (
        <ContextEnvironment.Provider value={{ handleScrollToView, scrollToView, resize }}>
            {children}
        </ContextEnvironment.Provider>
    );
};

export default ContextProvider;
