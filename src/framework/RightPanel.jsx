import React from 'react';

import { useTheme } from '@mui/material';
import {
    Divider,
    IconButton,
    Tooltip
} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

import Toolbox from './tools/Toolbox';

const RightPanel = (props) => {

    const theme = useTheme();

    const [toolboxOpened, setToolboxOpened] = React.useState(false);
    const [selectedTool, setSelectedTool] = React.useState({
        number: 0,
        name: "Settings"
    });

    const handleOnArrowLeftIconClick = () => {
        setToolboxOpened(true);
    }

    const handleOnArrowRightIconClick = () => {
        setToolboxOpened(false);
    }

    const handleOnToolClick = (number, name) => {
        setSelectedTool({
            number : number,
            name : name
        });
        if(!toolboxOpened) {
            setToolboxOpened(true);
        }
    }

    return (
        <div
            style={{ 
                // display: "flex",
                // flexDirection: "row",
                // alignContent: "flex-end",
                height: "100%",
                backgroundColor: theme.rightPanel.background,
                borderLeft: theme.rightPanel.borderLeft,
                width: "33px",
                // justifyContent: "center"
            }}
            // onResize="vertical"
        >
            <div style={{ height: "100%" }}>                
                <div 
                    style={{ 
                        height: 28,
                        display: "flex",
                        flexFlow: "column",
                        backgroundColor: "#eeeeee",
                        alignContent: "center"
                    }}
                >
                {
                    toolboxOpened === false
                    ?
                    <IconButton 
                        color="inherit" 
                        sx={{ p: 0, m: 0, mt: 0.5 }}
                        onClick={ handleOnArrowLeftIconClick }
                    >
                        <ArrowLeftIcon fontSize = "medium" sx={{ p: 0, m: 0 }} />
                    </IconButton>
                    :
                    <IconButton 
                        color="inherit" 
                        sx={{ p: 0, m: 0, mt: 0.5 }}
                        onClick={ handleOnArrowRightIconClick }
                    >
                        <ArrowRightIcon fontSize = "medium" sx={{ p: 0, m: 0 }} />
                    </IconButton>
                }
                </div>
                {/* <Divider sx={{ mb: 1 }} /> */}
                <div style={{ justifyItems: "center" }}>
                    <Tooltip title="Settings">
                        <IconButton 
                            color={ selectedTool.number === 0 && toolboxOpened ? "inherit" : "" } 
                            sx={{ p: 0, m: 0, mt: 2, mb: 1 }}
                            onClick={ () => handleOnToolClick(0, "Settings") }
                        >
                            <SettingsIcon fontSize = { selectedTool.number === 0  && toolboxOpened ? "medium" : "small" }sx={{ p: 0, m: 0 }} />
                        </IconButton>
                    </Tooltip>
                    <Divider />
                    <Tooltip title="Search">
                        <IconButton 
                            color={ selectedTool.number === 1  && toolboxOpened ? "inherit" : "" } 
                            sx={{ p: 0, m: 0, mt: 1, mb: 1 }}
                            onClick={ () => handleOnToolClick(1, "Search") }
                        >
                            <SearchIcon fontSize = { selectedTool.number === 1  && toolboxOpened ? "medium" : "small" } sx={{ p: 0, m: 0 }} />
                        </IconButton>
                    </Tooltip>
                    <Divider />
                    <Tooltip title="Manual">
                        <IconButton 
                            color={ selectedTool.number === 2  && toolboxOpened ? "inherit" : "" }  
                            sx={{ p: 0, m: 0, mt: 1, mb: 1 }}
                            onClick={ () => handleOnToolClick(2, "Manual") }
                        >
                            <MenuBookIcon fontSize = { selectedTool.number === 2  && toolboxOpened ? "medium" : "small" } sx={{ p: 0, m: 0 }} />
                        </IconButton>
                    </Tooltip>
                </div>
                {/* <Divider sx={{ mt: 1 }} /> */}
            </div>
            <Toolbox open={ toolboxOpened } toolName={ selectedTool.name } { ...props }/>
        </div>
    )
}

export default RightPanel;