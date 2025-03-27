import * as React from 'react';

import { 
    styled, 
    useTheme 
} from '@mui/material/styles';

import {
    Divider,
    IconButton,
    Drawer as MuiDrawer,
    Typography
 } from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { getIcon } from '../../icons'
import DrawerMenuList from './DrawerMenuList';
import DrawerSubMenuList from './DrawerSubMenuList';

const openedMixin = (theme, options) => ({
    // width: drawerWidth,
    width: options.drawerWidth,
    height: options.height,
    marginTop: 60,
    paddingLeft: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
const closedMixin = (theme, options) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    marginTop: 60,
    width: `calc(${theme.spacing(5)} + 1px)`,
    height: options.height,
    paddingLeft: 0,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(7)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme, paddingTop }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-left',
    padding: theme.spacing(0, 1),
    paddingTop: paddingTop,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, options }) => ({
        position: "relative",
        width: options.drawerWidth,
        height: options.height,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        padding: theme.spacing(0, 1),
        paddingTop: 0,
        ...(open && {
            ...openedMixin(theme, options),
            '& .MuiDrawer-paper': openedMixin(theme, options),
        }),
        ...(!open && {
            ...closedMixin(theme, options),
            '& .MuiDrawer-paper': closedMixin(theme, options),
        }),
    }),
);

const DrawerMenu = (props) => {

    const theme = useTheme();

    const { 
        drawerPaddingTop,
        open, 
        bodyHeight, 
        drawerWidth, 
        toggleDrawer, 
        width, 
        menus 
    } = props;

    const [menuName, setMenuName] = React.useState("Main Menu");
    const [selectedMenuNum, setSelectedMenuNum] = React.useState(0);

    const handleOnMenuSelectionChange = (menuName, num) => {
        setMenuName(menuName);
        setSelectedMenuNum(num);
        if(open === false) {
            toggleDrawer();
        }
    }

    return (
        <Drawer 
            variant="permanent" 
            open={ open } 
            options={{ height: bodyHeight, drawerWidth: drawerWidth }}
        >
            <DrawerHeader paddingTop={ drawerPaddingTop }>
                <IconButton onClick={ toggleDrawer } >
                    { open ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
                </IconButton>
                <Typography variant="h7" noWrap component="div" style={{ paddingLeft: 24}}>
                    { menuName }
                </Typography>
            </DrawerHeader>
            <Divider />
            <div style={{ display: "flex", height: "100%", overflowY: 'auto', scrollbarWidth: "thin", overflowX: "hidden" }}>
                <div style={{ width: 56, height: "100%", borderRight: props.open ? "1px solid " + theme.palette.background.footer : "0px" }}>
                    <DrawerMenuList 
                        onMenuChange={ handleOnMenuSelectionChange }
                        getIcon={ getIcon }
                        menus={ menus }
                    />
                </div>
                <div style={{ width: (width-56), height: "100%" }}>
                    <DrawerSubMenuList 
                        selectedMenuNum={ selectedMenuNum } 
                        getIcon={ getIcon }
                        menus={ menus }
                    />
                </div>
            </div>
        </Drawer>
    )
}

export default DrawerMenu;