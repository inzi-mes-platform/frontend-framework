import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography

} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { getImessageBroker } from '../../utils/InternalMessageBroker';

const ThemeSettings = (props) => {

    const location = useLocation();

    const [orgThemeName, setOrgThemeName] = React.useState(props.themeProps.selectedThemeInfo.name);
    const [themeSelected, setThemeSelected] = React.useState(orgThemeName);

    React.useEffect(()=>{
        const persist=localStorage.getItem("settings.saveToStorage");
        if(persist==="true") {
            const temp=localStorage.getItem("settings.theme");
            if(temp!==null) {
                setOrgThemeName(temp);
                setThemeSelected(temp);
                dispatch(temp);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dispatch = (themeName) => {
        messageBroker.dispatch({
            kind: "THEME_SETTINGS",
            themeName: themeName
        });
    }

    const messageBroker = React.useMemo(()=>{
        return getImessageBroker();
    }, [])

    const handleOnThemeChanged = () => {
        setOrgThemeName(themeSelected);
        props.themeProps.onThemeSelectionChanged(themeSelected);
        dispatch(themeSelected);
        const persist=localStorage.getItem("settings.saveToStorage");
        if(persist==="true") {
            localStorage.setItem("settings.theme", themeSelected);
        }
    }

    const handleOnCancel = () => {
        setThemeSelected(orgThemeName);
        props.themeProps.onThemeSelectionChanged(orgThemeName);
        dispatch(orgThemeName);
    }

    const handleOnThemeChangedTemp = (e) => {
        setThemeSelected(e.target.value);
        props.themeProps.onThemeSelectionChanged(e.target.value);
        dispatch(e.target.value);
    }

    return (
        <Box width="550px" sx={{ mt: 2, ml: 0 }}>
            <Box>
                <Typography fontSize={ 16 }>Theme</Typography>
            </Box>
            <Box sx={{ mt: 1, ml:1, display: "flex", justifyContent: "flex-start" }}>
                <Box sx={{ minWidth: 265 }}>
                    <FormControl variant="standard" sx={{ minWidth: 200 }}>
                        <InputLabel id="theme-select-standard-label" sx={{ fontSize: 14 }}>Select Theme</InputLabel>
                        <Select
                            labelId="theme-select-standard-label"
                            id="theme-select-standard"
                            label="Theme"
                            value={ themeSelected }
                            // InputLabelProps={{ shrink: true, sx: { fontSize: 18 } }}
                            onChange={ handleOnThemeChangedTemp }
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                props.themeProps.themes.map((themeInfo, index) => {
                                return (
                            <MenuItem key={ "theme-"+index } value={ themeInfo.name }>{ themeInfo.name }</MenuItem>
                                )
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
                { (props.showAction || (location.state&&location.state.showAction))&&
                <Box 
                    sx={{ 
                        ml: 1,
                        mt: 1,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                >
                    <Button
                        startIcon={ <CancelIcon />}
                        variant='contained'
                        color='inherit'
                        fontSize='14'
                        sx={{ ml: 1, width: 90, height: "35px", }}
                        onClick={ handleOnCancel }
                    >
                        <Typography fontSize={ 12 }>Cancel</Typography>
                    </Button>
                    <Button
                        startIcon={ <CheckCircleIcon />}
                        variant='contained'
                        // color='inherit'
                        size='small'
                        sx={{ m:0, p:0, ml: 1, width: 90, height: "35px", bgcolor: "secondary.light", color: "info.contrastText" }}
                        onClick={ handleOnThemeChanged }
                    >
                        <Typography fontSize={ 12 }>OK</Typography>
                    </Button>
                </Box>
                }
            </Box>
      </Box>
    )
}

export default ThemeSettings;
