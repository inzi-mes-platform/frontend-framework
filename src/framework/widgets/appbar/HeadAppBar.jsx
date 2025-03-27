import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
    Avatar,
    Badge,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import InfoIcon from '@mui/icons-material/Info';
// import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';

import Bookmark from '../bookmark/Bookmark';

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    paddingLeft: 0
}));

const Icons = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "12px",
    alignItems: "center",
}));

const HeadAppBar = React.forwardRef((props, ref) => {

    const { 
        title,
        iconLogo,
        user,
        onBookmarkAddReq,
        onBookmarkFetchReq,
        onNotificationsShowReq,
        onMyInfoShowReq,
        onLogoutReq,
        onQnaShowReq,
        onAboutShowReq,
        toggleDrawer,
    } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notificationCount, setNotificationCount] = React.useState(0);
    const onNewNotificationArrived = (notification) => {
        if(notification===undefined) return;
        setNotificationCount(notificationCount+1);
    }

    React.useImperativeHandle(ref, () => ({
        onNewNotificationArrived,
    }));

    const handleOnMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOnClose = () => {
        setAnchorEl(null);
    };

    const handleOnBookmarkAddReq = (name, url, description) => {
        onBookmarkAddReq(name, url, description);
    }

    const handleOnBookmarkFetchReq = () => {
        onBookmarkFetchReq (user.id);
    }

    const handleOnNotificationShowReq = () => {
        onNotificationsShowReq(user.id);
        setNotificationCount(0);
    }

    const handleOnMyInfoShowReq = () => {
        onMyInfoShowReq(user.id);
        handleOnClose();
    }

    const handleOnLogoutReq = () => {
        onLogoutReq(user.id);
        handleOnClose();        
    }

    const handleOnQnaShowReq = () => {
        onQnaShowReq();
    }

    const handleOnAboutShowReq = () => {
        onAboutShowReq();
    }

    return (
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <AppBar position="absolute">
                <Toolbar sx={{ pr: '20px' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={ toggleDrawer }
                    >
                        {
                            iconLogo !== undefined ? iconLogo : <MenuIcon />
                        }
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component={ RouterLink }
                        to="/"
                        color="common.white"
                        sx={{ display: { xs: 'none', sm: 'block' }, textDecoration: "none" }}
                    >
                        { title }
                    </Typography>
                    
                    <Box sx={{ display: { xs: 'none', md: 'flex'}, ml: 6 }}>
                        <Bookmark 
                            user = { user }
                            onBookmarkAddReq = { handleOnBookmarkAddReq }
                            onBookmarkFetchReq = { handleOnBookmarkFetchReq }
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Icons>
                        <Tooltip title="Notification">
                            <IconButton size="large" color="inherit" sx={{ p: 0, m: 0, pr: 1 }}>
                                <Badge badgeContent = { notificationCount } color="error">
                                    <NotificationsIcon 
                                        fontSize = 'medium'
                                        onClick = { handleOnNotificationShowReq }
                                        sx={{ cursor: "pointer"}}
                                    />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="QNA">
                            <IconButton size="large" color="inherit" sx={{ p: 0, m: 0 }}>
                                <QuestionAnswerIcon 
                                    fontSize="medium"
                                    onClick = { handleOnQnaShowReq }
                                    sx={{ cursor: "pointer"}}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="About">
                            <IconButton size="large" color="inherit" sx={{ p: 0, m: 0 }}>
                                <InfoIcon 
                                    fontSize = "medium"
                                    onClick = { handleOnAboutShowReq }
                                    sx = {{ cursor: "pointer"}}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={ user && user.email }>
                            <Avatar 
                                sx={{ width: 36, height: 36, cursor: "pointer", ml: 2 }}
                                onClick={ handleOnMenu }
                                src={ user.photoUrl }
                            />
                        </Tooltip>
                    </Icons>
                </Toolbar>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={ handleOnClose }
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={ handleOnMyInfoShowReq }>Profile</MenuItem>
                    <MenuItem onClick={ handleOnMyInfoShowReq }>My account</MenuItem>
                    <MenuItem onClick={ handleOnLogoutReq }>Logout</MenuItem>
                </Menu>
            </AppBar>
        </Box>
    )
});

export default HeadAppBar;
