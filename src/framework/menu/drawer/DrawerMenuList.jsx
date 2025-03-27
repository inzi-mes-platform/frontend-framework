import React from 'react';

import { useTheme } from '@mui/material/styles';

import {
    Divider,
    isMuiElement,
    List,
    ListItemButton,
    ListItemIcon,
    Tooltip
} from '@mui/material';

const DrawerMenuList = ( props ) => {

    const theme = useTheme();

    const { getIcon, menus, onMenuChange } = props;

    const [menuList, setMenuList] = React.useState([]);
    const [menuSelected, setMenuSelected] = React.useState([]);

    React.useEffect(()=>{
        if(menus===undefined || menus.length<=0) {
            setMenuSelected([]);
            return;
        }
        setMenuList(menus);
        const temp = [];
        temp.push(true);
        for(var i=1;i<menus.length;i++) {
            temp.push(false);
        }
        setMenuSelected(temp);
    }, [menus]);

    const handleOnMenuSelectionChanged = (name, num) => {
        var idx;
        for(idx=0;idx<menuList.length;idx++) {
            if(num === idx) menuSelected[idx] = true;
            else menuSelected[idx] = false;
        }
        onMenuChange(name, num);
    }

    return (
        <List component="div">
        { 
            menuList && menuList.map((menu, index) => {
                let Icon = menu.icon;
                if( typeof Icon === 'string' ) {
                    Icon = getIcon(menu.icon);
                }

                if(menu.type === "Divider") {
                    return <Divider key={ "drawer-menu-" + index } sx={{ my: 1 }} />
                }

                return (
                    <Tooltip key={ "drawer-menu-" + index } title={ menu.name } arrow = { true } placement = "right">
                        <ListItemButton 
                            sx={{ 
                                backgroundColor: menuSelected[index] ? theme.menu.main.selected : "",
                                ":hover": {
                                    backgroundColor: theme.menu.main.hover,
                                }
                            }}
                            onClick={ () => handleOnMenuSelectionChanged(menu.name, index) }
                        >
                            <ListItemIcon>
                                <Icon />
                            </ListItemIcon>
                        </ListItemButton>
                    </Tooltip>
                )
            })
        }
        </List>
    )
}

export default DrawerMenuList;