import React from 'react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import ThemeSettings from './ThemeSettings';
import AlertSettings from './AlertSettings';
import SseSettings from './SseSettings';
import PersistentSettings from './PersistentSettings';
import { IconButton } from '@mui/material';

const SettingsView = (props) => {
    return (
        <div>
            <ThemeSettings 
                showAction={ true }
                { ...props }
            />
            <AlertSettings/>
            <SseSettings />
            <PersistentSettings />
            <IconButton>
                <MoreHorizIcon />
            </IconButton>
        </div>
    )
}

export default SettingsView;
