import React from 'react';

import ManualView from './manual/ManualView';
import SearchView from './search/SearchView';
import SettingsView from './settings/SettingsView';
import { Divider, Typography } from '@mui/material';

const Toolbox = (props) => {

    const [open, setOpen] = React.useState(props.open);
    const [toolName, setToolName] = React.useState("");

    React.useEffect(()=>{
        setOpen(props.open);
    }, [props.open]);

    React.useEffect(()=>{
        setToolName(props.toolName);
    }, [props.toolName])

    return (
        <div
            style={{
                display : (open === true ? "block" : "none"),
                position: "absolute",
                top: 0,
                right: 33,
                width: "500px",
                height: "100%",
                // backgroundColor: "#eeeeee",
                borderLeft: "1px solid #eeeeee",
                transition: "all 1s",
                transitionBehavior: "allow-discrete",
                // webkitAnimation: "fadeinout 4s linear forwards",
                // animation: "fadeinout 4s linear forwards"
                // opacity: 1,
                // scale: 1
            }}
        >
            <div style={{ marginLeft: 5, marginTop: 30 }}>
                <Typography fontSize={ 24 }>{ toolName }</Typography>
            </div>
            <Divider sx={{ mt: 1, mb: 2 }}/>
            <div style={{ marginLeft: 10 }}>
                {
                    toolName === "Settings" 
                    ?
                    <SettingsView { ...props }/>
                    :
                    ( toolName === "Search" ? <SearchView /> : <ManualView/>)
                }
            </div>
        </div>
    )
}

export default Toolbox;