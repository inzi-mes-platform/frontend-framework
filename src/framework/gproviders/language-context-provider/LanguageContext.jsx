import React from 'react';

export const LanguageContext = React.createContext({
    languagePack: {},
    get: () => {},
})

export const LanguageContextProvider = ({ children, languagePack }) => {

    const [lpack, setLpack] = React.useState(languagePack);

    React.useEffect(()=>{
        setLpack( languagePack );
    }, [ languagePack ]);

    const LanguagePack = {
        get ( code, defaultValue=undefined ) {
            return get( code, defaultValue );
        },
    }

    const get = ( code, defaultValue=undefined ) => {
        if(lpack === undefined) return code;

        const v = lpack[code];
        if( v === undefined ) {
            if(defaultValue === undefined) return code;
            return defaultValue;
        }
        return v;
    }

    return (
        <LanguageContext.Provider value={{ LanguagePack, get }}>
            { children }
        </LanguageContext.Provider>
    )
}

export default LanguageContextProvider;
