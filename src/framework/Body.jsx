import React from 'react';

import { SplitPane } from '@rexxars/react-split-pane';

import BodyRouter from './routes/BodyRouter';
import BreadcrumbNav from './widgets/breadcrumbs/BreadcrumbNav';
import RightPanel from './RightPanel';
import TabsTypeBody from './TabsTypeBody';

const Body = ( props ) => {

    const { bodyProps, presenterMap, themeProps } = props;

    const [drawerOpen, setDrawerOpen] = React.useState(props.drawerOpen);

    React.useEffect(()=>{
        setDrawerOpen(props.drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.drawerOpen]);

    const marginLeft = drawerOpen ? props.drawerWidth-1 : 56;
    
    return (
        <SplitPane split="vertical" primary="second" minSize={ 33 }>
            { bodyProps.bodyType === "Tab"
                ?
            <div style={{ marginLeft: marginLeft }}>
                <TabsTypeBody 
                    options={ bodyProps.tabsOptions }
                    presenterMap={ presenterMap }
                />
            </div>    
                :
            <div style={{ marginLeft: marginLeft }}>
            { 
                bodyProps.breadcrumbNavOptions && bodyProps.breadcrumbNavOptions.use 
                ?
                (bodyProps.breadcrumbNavOptions.customBreadcrumbNav !== undefined 
                    ? 
                    bodyProps.breadcrumbNavOptions.customBreadcrumbNav
                    : 
                <BreadcrumbNav height = { bodyProps.breadcrumbNavOptions.height }/>
                )
                :
                undefined
            }
                <BodyRouter { ...props } />
            </div>
            }
            {/* <RightPanel onPanelOpen = { handleOnRightPanelOpen }/> */}
            <RightPanel { ...bodyProps.rightPanelOptions } themeProps={ themeProps } />
        </SplitPane>
    )
}

export default Body;
