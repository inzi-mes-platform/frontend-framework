import React from 'react';
import {
    Box,
    Tab,
    Tabs,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SwipeableViews from 'react-swipeable-views';

import TabPanel, { a11yProps } from './TabPanel';

const DynamicTabs = React.forwardRef((props, ref) => {

    const { name, options } = props;

    const [tname, setTname] = React.useState("");
    const [tabs, setTabs] = React.useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const [maxWidth, setMaxWidth] = React.useState(0);

    React.useEffect(()=>{
        var ro = new ResizeObserver( entry => {
            handleOnResize(entry)
        });
        ro.observe(document.querySelector('#tabs-box'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(()=>{
        const tabsName = props.name===undefined ? "" : props.name;
        setTname(tabsName);
    }, [props.name]);

    // Parent component can call methods defined in useImperativeHandle function
    React.useImperativeHandle(ref, () => ({
        addTab,
        removeTab,
    }));

    const handleOnChange = (event, newSelection) => {
        setSelectedIndex(newSelection);
    }

    const handleOnChangeIndex = (index) => {
        setSelectedIndex(index);
    }

    const addTab = (tab) => {
        var tabList = [ ...tabs ];
        let focusIndex = tabs.length;
        if(options.allowSameKey===true) {
            tabList.push(tab);
            setTabs(tabList);
        } else {
            let found = false;
            for(let idx in tabs) {
                if(tabs[idx].key === tab.key) {
                    focusIndex = Number(idx);    
                    found = true;
                    break;
                }
            }
            if(found === false) {
                tabList.push(tab);
                setTabs(tabList);
            }
        }
        setSelectedIndex(focusIndex);
    }

    const removeTab = (event, index) => {
        // stopPropagation()을 해줘야 handleOnChange 함수가 호출되지 않음
        event.stopPropagation();
        if(index<0 || index>=tabs.length) return;

        var tabList = [ ...tabs ]; 
        tabList.splice(index, 1);
        setTabs(tabList);

        let focusIndex = selectedIndex;
        if(index===selectedIndex) {
            focusIndex = index-1;
        } else if(index<selectedIndex) {
            focusIndex = selectedIndex-1;
        }
        if(focusIndex<0) focusIndex=0;
        setSelectedIndex(focusIndex);
    }

    const handleOnResize = (entries) => {
        const cr = entries[0].contentRect;
        setMaxWidth(cr.width);
    }

    return (
        <div id="tab-div" style={{ width: "100%" }} >
            { 
            tname !== "" && 
            <Typography color="textPrimary" variant="body1">{ name }</Typography>
            }
            <Box id="tabs-box" sx={{ backgroundColor: "#eeeeee" }}>
                <Tabs
                    value={ selectedIndex }
                    onChange={ handleOnChange }
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    // allowScrollButtonsMobile
                    aria-label="scrollable dynamic auto tabs"
                    // 아래 코드를 넣으면 tab에서의 icon 클릭 이벤트가 tabs로 전달됨
                    // selectionFollowsFocus={ true }
                    style={{ 
                        // borderBottom: '1px solid #eeeeee', 
                        minHeight: "28px", 
                        height: "28px", 
                        alignItems: "center",
                        maxWidth : maxWidth,
                        borderColor : "divider",
                    }}
                >
                    {tabs.map((tab, index) => 
                    <Tab
                        key={ "Tab-" +index }
                        label={
                            <Typography 
                                sx={{ 
                                    fontSize: "8pt", 
                                    alignItems: "center",
                                    textOverflow: "ellipsis",
                                    width: "130px",
                                }}
                                noWrap
                            >
                                { tab.dispName }
                            </Typography>
                        }
                        icon={ 
                            index >= 0 
                            ? 
                            <CloseIcon 
                                onClick={(e) => removeTab(e,index)} 
                                sx={{ 
                                    fontSize : 16, m:0, p:0, zIndex: 100 
                                }} 
                            /> 
                            : 
                            "" 
                        }
                        iconPosition='end'
                        style={{ 
                            width: 150, 
                            minHeight: 28,
                            height: 28,
                            borderRight: "1px solid #ccceee" 
                        }}
                        wrapped
                        { ...a11yProps(index) }
                    >

                    </Tab>
                    )}
                </Tabs>
            </Box>
            <SwipeableViews
                index={ selectedIndex }
                onChangeIndex={ handleOnChangeIndex }
                resistance={false}
                animateTransitions = {false}
                animateHeight={false}
                style={{ paddingLeft: 5, maxWidth: maxWidth }}
            >
                {tabs.map( (tab, index) =>
                <TabPanel value={ selectedIndex } key={index} index={ index } maxWidth={ maxWidth }>
                    { tab.children }
                </TabPanel>
                )}
            </SwipeableViews>
        </div>
    )
});

export default DynamicTabs;
