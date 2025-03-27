import React from 'react';

import { GlobalAlertContext } from './GlobalAlertContext';

export function useAlertContext () {
    const value=React.useContext(GlobalAlertContext);
    if(value===undefined) {
        console.log("GlobalAlertContext is null. Check please!");
    }
    return value;
}