import React, { createContext, useState, useContext, useMemo } from 'react';

const LocaleContext = createContext();

function LocaleProvider({ children }) {
    const [locale, setLocale] = useState(() => {
        return localStorage.getItem('locale') || 'id';
    });

    const toggleLocale = () => {
        setLocale((prevLocale) => {
            const newLocale = prevLocale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return newLocale;
        });
    };

    const contextValue = useMemo(() => ({ locale, toggleLocale }), [locale]);

    return (
        <LocaleContext.Provider value={contextValue}>
            {children}
        </LocaleContext.Provider>
    );
}

function useLocale() {
    return useContext(LocaleContext);
}

export { LocaleProvider, useLocale };
export default LocaleContext;
