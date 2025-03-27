import {
    CheckBoxOutlineBlank as NoIconFoundIcon
 } from '@mui/icons-material';

const iconMap = new Map();

export const registerIcons = ( iconInfos ) => {
    if(iconInfos === undefined || iconInfos === null) return;

    iconInfos.forEach( (iconInfos, index) => {
        registerIcon (iconInfos.name, iconInfos.icon );
    });
}

export const registerIcon = ( name, icon ) => {
    iconMap.set(name, icon);
}

export const getIcon = ( name ) => {
    let icon = iconMap.get(name);
    if(icon === undefined) {
        icon = NoIconFoundIcon
    }
    return icon;
}