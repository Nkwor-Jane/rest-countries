import axios from 'axios';
import React, {useContext, useState, useEffect, createContext} from 'react'

export const CountryContext = createContext();

export function CountryContextProvider({children}) {
    const [apiData, setApiData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const baseURL = "https://restcountries.com/v2/all";
    useEffect(() =>{
        axios.get(baseURL)
        .then((response) => {
            const myCountries = response.data;
            const filteredCountry = myCountries?.filter((count) => count);
            setApiData(filteredCountry);
        })
        .catch((error) =>{
            setError(error);
        })
        .finally(() =>{
            setLoading(false);
        })
    }, [])
    return (
        <CountryContext.Provider value={{apiData, error, loading}}>
            {children}
        </CountryContext.Provider>
    )
}



export function useCountryContext() {
    const context = useContext(CountryContext);
    if (context === undefined){
        throw new Error("Context must be used within Provider")
    }
    return context;
}