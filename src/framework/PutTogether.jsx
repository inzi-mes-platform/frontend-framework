import React from 'react';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';

import themeList from './themes';
import UIComposer from './UIComposer';

import LanguageContextProvider from './gproviders/language-context-provider/LanguageContext';
import GlobalAlertContextProvider from './gproviders/alert-context-provider/GlobalAlertContext';
import ConfirmContextProvider from './gproviders/confirm-context-provider/ConfirmContext';
import LongTextCommonDialogContextProvider from './gproviders/long-text-common-dialog-context-provider/LongTextCommonDialogContext';
import { registerIcons } from './icons';

console.log("STORE =====>" + store);

const PutTogether = (props) => {

    /** Can apply custom Themes, Menus, Routes, Header, Footer, languagePack */
    const {
        additionalThemes,
        // bodyType,
        // breadcrumbNavProps,
        menuProps, 
        iconInfos, 
        routeInfos,
        headerProps, 
        bodyProps,
        footerProps, 
        languagePack,
        initializeAuth
    } = props;

    const [themes, setThemes] = React.useState(themeList);
    const [selectedThemeInfo, setSelectedThemeInfo] = React.useState(themes[0]);

    React.useEffect(()=>{
        if(additionalThemes === undefined || additionalThemes === null) return;
        setThemes([ ...themeList, ...additionalThemes ]);
    }, [additionalThemes]);

    React.useEffect(()=>{
        if( iconInfos === undefined || iconInfos === null) return;
        registerIcons( iconInfos );
    }, [ iconInfos ])

    const fontext = React.useMemo( ()=>{
        return (
            {
                galert: selectedThemeInfo.theme.galert !== undefined ? selectedThemeInfo.theme.galert : {
                    position : { right: 0, top: 60 },
                    width: "600px"
                },
                drawer: {
                    fullWidth: selectedThemeInfo.theme.drawer !== undefined ? selectedThemeInfo.theme.drawer.fullWidth : 280,
                    iconWidth: selectedThemeInfo.theme.drawer !== undefined ? selectedThemeInfo.theme.drawer.iconWidth : 55,
                }
            }
        )
    }, [selectedThemeInfo]);

    const handleOnThemeSelectionChanged = (themeName) => {
        for(var i = 0; i < themes.length; i++) {
            const theme = themes[i];
            if(theme.name === themeName) {
                setSelectedThemeInfo(theme);
                break;
            }
        }
    }

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <BrowserRouter>
                <ThemeProvider theme={ selectedThemeInfo.theme }>
                    <CssBaseline />
                    <Provider store={ store } >
                        <PersistGate loading={ null } persistor={ persistor }>
                            <LanguageContextProvider languagePack={ languagePack }>
                                <GlobalAlertContextProvider 
                                    position={ fontext.galert.position } 
                                    width={ fontext.galert.width }
                                >
                                    <ConfirmContextProvider>
                                        <LongTextCommonDialogContextProvider>
                                            <UIComposer 
                                                // bodyType = { bodyType }
                                                drawerWidth = { fontext.drawer.fullWidth }
                                                menuProps = { menuProps }
                                                headerProps = { headerProps }
                                                bodyProps = { bodyProps }
                                                footerProps = { footerProps }
                                                // breadcrumbNavProps = { breadcrumbNavProps }
                                                themeProps = {{ 
                                                    themes : themes,
                                                    selectedThemeInfo : selectedThemeInfo,
                                                    onThemeSelectionChanged : handleOnThemeSelectionChanged
                                                }}
                                                routeInfos = { routeInfos }
                                                initializeAuth = { initializeAuth }
                                            />
                                        </LongTextCommonDialogContextProvider>
                                    </ConfirmContextProvider>
                                </GlobalAlertContextProvider>
                            </LanguageContextProvider>
                        </PersistGate>
                    </Provider>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}

export default PutTogether;