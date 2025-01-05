import React, { createContext, useState, useContext } from 'react';

// Create a context to store the search query
export const SearchContext = createContext();

// Custom hook to use the search context
export const useSearch = () => {
    return useContext(SearchContext);
};

// Provider component that wraps the app and provides the search query
export const SearchProvider = ({ children }) => {
    const [query, setQuery] = useState('tesla'); // Default search query
    const [frm, setfrm] = useState(); // Default search query
    const [td, settd] = useState(); // Default search query
    const [srcc, setsrcc] = useState(''); // Default search query
    const updateQuery = (newQuery) => {
        setQuery(newQuery);
    };
    const updatefrm=(newQuery)=>{
        setfrm(newQuery)
    }
    const updatd=(newQuery)=>{
        settd(newQuery);
    }
    const updatesrcc=(newQuery)=>{
        setsrcc(newQuery);
    }

    return (
        <SearchContext.Provider value={{ query, updateQuery,frm,updatefrm,td,updatd,srcc,updatesrcc }}>
            {children}
        </SearchContext.Provider>
    );
};
