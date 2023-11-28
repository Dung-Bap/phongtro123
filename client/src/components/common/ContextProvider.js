import React, { createContext, useState } from 'react';
export const ContextEnvironment = createContext();

const ContextProvider = ({ children }) => {
    const [scrollToView, setScrollToView] = useState(false);

    const handleScrollToView = () => {
        setScrollToView(prev => !prev);
    };

    return (
        <ContextEnvironment.Provider value={{ handleScrollToView, scrollToView }}>
            {children}
        </ContextEnvironment.Provider>
    );
};

export default ContextProvider;
