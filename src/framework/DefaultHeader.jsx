import React from 'react';

import TuneIcon from '@mui/icons-material/Tune';

import HeadAppBar from './widgets/appbar/HeadAppBar';

const DefaultHeader = (props) => {

    const { 
        title,
        iconLogo,
        user,
        onBookmarkAddReq,
        onBookmarkFetchReq,
        onQnaShowReq,
        onAboutShowReq,
        onLogoutReq,
        onMyInfoShowReq,
        onNotificationShowReq
    } = props;

    const appBarApiRef = React.useRef(null);

    React.useEffect(()=>{
        // SSE Listener 등록
        handleOnNewNotificationArrived("")
    }, []);

    const handleOnNewNotificationArrived = (notification) => {
        appBarApiRef.current.onNewNotificationArrived(notification);
    }

    const handleOnBookmarkAddReq = (name, url, description) => {
        onBookmarkAddReq(name, url, description);
    }

    const handleOnBookmarkFetchReq = () => {
        onBookmarkFetchReq(user.id);
    }

    const handleOnQnaShowReq = () => {
        onQnaShowReq();
    }

    const handleOnAboutShowReq = () => {
        onAboutShowReq();
    }

    const handleOnLogoutReq = (userId) => {
        onLogoutReq(userId);
    }

    const handleOnNotificationsShow = (userId) => {
        onNotificationShowReq(userId);
    }

    const handleOnMyInfoShowReq = (userId) => {
        onMyInfoShowReq(userId);
    }

    return (
        <HeadAppBar 
            title = { title }
            iconLogo = { iconLogo }
            user = { user }
            onBookmarkAddReq = { handleOnBookmarkAddReq }
            onBookmarkFetchReq = { handleOnBookmarkFetchReq }
            onNotificationsShowReq={ handleOnNotificationsShow }
            onMyInfoShowReq={ handleOnMyInfoShowReq }
            onLogoutReq = { handleOnLogoutReq }
            onQnaShowReq = { handleOnQnaShowReq }
            onAboutShowReq = { handleOnAboutShowReq}
            toggleDrawer={ props.toggleDrawer }

            ref = { appBarApiRef }
        />
    )
}

export default DefaultHeader;
