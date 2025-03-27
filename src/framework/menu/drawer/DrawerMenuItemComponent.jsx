import React from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';

const DrawerMenuItemComponent = ( props ) => {

    const theme = useTheme();

    const { className, onClick, link, state, children } = props;

    const handleOnClick = (e, seq) => {
        if(onClick !== undefined) {
            onClick(e)
        }
        props.onSelect(seq);
    }

    // If link is not set return the original ListItem
    if(!link || typeof link !== 'string') {
        return (
            <ListItemButton 
                button
                className= { className }
                children = { children }
                onClick = { (e) => handleOnClick(e, props.seq) }
                slotProps = {{

                }}
                sx={{
                    width: (theme.drawer !== undefined ? theme.drawer.fullWidth-theme.drawer.iconWidth : "225"),
                    paddingLeft: theme.spacing(2),
                    backgroundColor: props.selected ? (props.level===1 ? theme.menu.level1.selected : theme.menu.level2.selected) : "",
                    ":hover": {
                        backgroundColor: (props.level === 1 ? theme.menu.level1.hover:theme.menu.level2.hover)
                    }
                }}
            />
        )
    }

    // Return a ListItem with a link component
    return (
        <ListItem 
            className = { className }
            children  = { children  }
            // below is just example for using component property
            // component={forwardRef((props, ref) => <NavLink exact {...props} innerRef={ref} />)}
            // component={forwardRef((props: NavLinkProps, ref: any) => <NavLink to={{ pathname: '', state: {state}}} />)}
            component = { RouterLink }
            // to에서의 state는 router에서 사용함 
            to = {{ pathname: link, state: state } }
            onClick={ ()=>props.onSelect(props.seq) }
            // authFocus={ true }
            // state를 넣어줘야 마지막 목표 페이지에서 (useLocation을 통해서) 
            // state로부터 정보를 가져다 사용할 수 있음음
            state = { state }
            slotProps = {{

            }}
            sx = {{
                width: (theme.drawer !== undefined ? theme.drawer.fullWidth-theme.drawer.iconWidth : "225"),
                paddingLeft: theme.spacing(2),
                backgroundColor: props.selected ? (props.level===1 ? theme.menu.level1.selected:theme.menu.level2.selected) : "",
                ":hover": {
                    backgroundColor: (props.level===1 ? theme.menu.level1.hover:theme.menu.level2.hover)
                },
                // "&.active": {
                //     background: 'rgba(255, 255, 255, 0)',
                //     '& .MuiListItemIcon-root': {
                //         color: theme.palette.success.contrastText,
                //     },
                // },
            }}
        />
    )
}

export default DrawerMenuItemComponent;