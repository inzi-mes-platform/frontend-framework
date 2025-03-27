import React from 'react';

import List from '@mui/material/List';

// import {
//     createSubMenuGroupList
//  } from './DrawerSubMenuListHelper';
import DrawerSubMenuItem from './DrawerSubMenuItem';

import { getIcon } from '../../icons/IconMap';

const DrawerSubMenuList = (props) => {

    const [open, setOpen] = React.useState([]);
    const [subMenuGroupList, setSubMenuGroupList] = React.useState(props.menus);
    const [selectedMenuNum, setSelectedMenuNum] = React.useState(props.selectedMenuNum);
    const [selectedSubMenuNum, setSelectedSubMenuNum] = React.useState(-1);

    React.useEffect(()=>{
        applyMenuSelection(props.selectedMenuNum);
        setSelectedMenuNum(props.selectedMenuNum);
        setSelectedSubMenuNum(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.selectedMenuNum]);

    React.useEffect(()=>{
        setSubMenuGroupList(props.menus);
    }, [props.menus]);

    const applyMenuSelection = (selectedMenuNum) => {
        var temp = open;
        var index = 0;
        for(; index < subMenuGroupList.length; index++) {
            if(selectedMenuNum === index) temp[index] = true;
            else temp[index] = false;
        }
        setOpen(temp);
    }

    // if(subMenuGroupList.length === 0) {
    //     setSubMenuGroupList(createSubMenuGroupList());
    // }

    const handleOnSubMenuSelect = (num) => {
        setSelectedSubMenuNum(num);
    }

    return(
        <div>
            <List component="nav" sx={{ m: 0 }}>
            {
                subMenuGroupList[selectedMenuNum].items.map((item, index) => {
                    let Icon = item.icon;
                    if( typeof Icon === 'string' ) {
                        Icon = getIcon(item.icon);
                    }

                    return (
                        <DrawerSubMenuItem 
                            key  ={ index }
                            seq  ={ index }
                            level={ 1 }
                            type ={ item.type }
                            name ={ item.name }
                            link ={ item.link }
                            Icon ={ Icon }
                            items={ item.items }
                            state={ item.state }
                            open ={ open }
                            selected={ selectedSubMenuNum===index ? true: false }
                            onSelect={ handleOnSubMenuSelect }
                        />
                    )
                })
            }
            </List>
        </div>
    );
}

export default DrawerSubMenuList;