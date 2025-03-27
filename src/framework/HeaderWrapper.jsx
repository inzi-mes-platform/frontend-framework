import React from 'react';

import DefaultHeader from './DefaultHeader';
import DrawerMenu from './menu/drawer/DrawerMenu';

const HeaderWrapper = (props) => {

    const { 
        drawerMenuPaddingTop,
        customHeader,
        defaultHeaderOptions,
        drawerMenuInfos, 
        drawerOpen, 
        drawerWidth,
        toggleDrawer 
    } = props;

    return (
        <>
            { /* customHeader에 drawerOpen과 toggleDrawer를 props로 전달함 */ }
            { 
                customHeader !== undefined 
                ?
                React.cloneElement( customHeader, { drawerOpen, toggleDrawer } )
                :
                <DefaultHeader 
                    title = { defaultHeaderOptions.title }
                    iconLogo = { defaultHeaderOptions.iconLogo }
                    user = { defaultHeaderOptions.user }
                    onBookmarkAddReq = { defaultHeaderOptions.onBookmarkAddReq }
                    onBookmarkFetchReq = { defaultHeaderOptions.onBookmarkFetchReq }
                    onQnaShowReq = { defaultHeaderOptions.onQnaShowReq }
                    onAboutShowReq = { defaultHeaderOptions.onAboutShowReq }
                    onLogoutReq = { defaultHeaderOptions.onLogoutReq }
                    onMyInfoShowReq = { defaultHeaderOptions.onMyInfoShowReq }
                    onNotificationShowReq = { defaultHeaderOptions.onNotificationShowReq }
                    drawerOpen = { drawerOpen }
                    toggleDrawer = { toggleDrawer }
                />
            } 

            <DrawerMenu 
                open = { drawerOpen }
                toggleDrawer = { toggleDrawer }
                menus = { drawerMenuInfos }
                drawerPaddingTop = { drawerMenuPaddingTop }
                width = { drawerWidth }
                { ...props }
            />
        </>
    )
}

export default HeaderWrapper;