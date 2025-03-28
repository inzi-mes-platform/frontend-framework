import React from 'react';
import { useLocation } from 'react-router-dom';

import DynamicTabs from './widgets/tabs/DynamicTabs';

const TabsTypeBody = (props) => {

    const { options, presenterMap } = props;

    const dynamicTabsRef = React.useRef(null);
    const [presenterList, setPresenterList] = React.useState([]);

    let location = useLocation();
    let pathName = location.pathname;

    React.useEffect(()=>{
        setPresenterList(presenterMap);
    }, [presenterMap]);

    React.useEffect(()=>{
        let target = presenterList.filter(presenter=>{
            return presenter.key === location.pathname;
        });
        if(target.length===0) return;
        addTab({
            key: target[0].key,
            dispName: target[0].dispName,
            children: target[0].presenter
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathName]);

    const addTab = (tab) => {
        dynamicTabsRef.current.addTab(tab);
    }

    return (
        <DynamicTabs 
            name =""
            options = { options }
            ref = { dynamicTabsRef }
        />
    )
}

export default TabsTypeBody;
