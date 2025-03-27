import React from 'react';

import { SplitPane, Pane }  from '@rexxars/react-split-pane';
import Body from './Body';
import HeaderWrapper from './HeaderWrapper';
import FooterWrapper from './FooterWrapper';

const AuthenticatedPageRoot = (props) => {

    const { 
        bodyType,
        breadcrumbNavProps,
        headerProps, 
        footerProps, 
        menuProps,
        drawerWidth 
    } = props;

    var theight = document.documentElement.clientHeight;
    const headerHeight = 64;
    const footerHeight = 37;
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [bodyHeight, setBodyHeight] = React.useState(theight-headerHeight-footerHeight-3);
    const [width, setWidth] = React.useState(document.documentElement.clientWidth-3);
    
    React.useEffect(()=>{
        window.addEventListener("resize", (e)=>{
            // eslint-disable-next-line react-hooks/exhaustive-deps
            theight = document.documentElement.clientHeight;
            setBodyHeight(theight-headerHeight-footerHeight-3);
            var cwidth = document.documentElement.clientWidth-3;
            setWidth(cwidth);
        });
    }, []);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <SplitPane split="horizontal" minSize={ headerHeight } style={{ height: "100%", width: width }}>
                <Pane style={{ height: headerHeight }}>
                    <div 
                        key="header-pane" 
                        // size={ headerHeight + "px" } 
                        // minSize="0px" 
                        // maxSize={ headerHeight + "px" }
                        style={{ height: headerHeight+"px", width: "100%" }}  
                    >
                        <HeaderWrapper 
                            bodyHeight = { bodyHeight }
                            customHeader = { headerProps.customHeader }
                            defaultHeaderOptions = {
                                headerProps.customHeader ? undefined : headerProps.defaultHeaderOptions
                            }
                            drawerMenuInfos = { menuProps.menuInfos }
                            drawerMenuPaddingTop = { menuProps.menuPaddingTop }
                            drawerOpen = { drawerOpen } 
                            drawerWidth = { drawerWidth }
                            toggleDrawer = { toggleDrawer }
                            // { ...props }
                        />
                    </div>
                </Pane>
                <SplitPane split="horizontal" allowResize={ true } minSize={ bodyHeight } style={{ height: "100%", width: width }}>
                    <Pane minSize={ bodyHeight } style={{ height: bodyHeight, width: width }}>
                        <div 
                            key = "body-pane" 
                            style = {{ height: bodyHeight+"px", width: "100%" }}
                        >
                            <Body
                                bodyHeight = { bodyHeight }
                                bodyType = { bodyType }
                                breadcrumbNavProps = { breadcrumbNavProps }
                                drawerOpen = { drawerOpen }
                                footerHeight = { footerHeight }
                                toggleDrawer = { toggleDrawer }
                                { ...props }
                            />
                        </div>
                    </Pane>    
                    <Pane>
                        <div 
                            key = "footer-pane" 
                            size = { footerHeight+"px" }
                            style = {{ height: footerHeight+"px", width: "100%" }}  
                        >
                            <FooterWrapper 
                                customFooter = { footerProps.customFooter } 
                                defaultFooterOptions = {
                                    footerProps.customFooter ? undefined : footerProps.defaultFooterOptions
                                }
                                { ...props }
                            />
                        </div>
                    </Pane>
                </SplitPane>
            </SplitPane>
        </div>
    )
}

export default AuthenticatedPageRoot;