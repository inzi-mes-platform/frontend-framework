import React from 'react';

import { LanguageContext } from './LanguageContext';

export function useLanguageContext () {
    const value = React.useContext(LanguageContext);
    if(value === undefined) {
        console.log( "LanguageContext is null. Check please!") ;
    }
    return value;
}