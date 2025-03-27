import React from 'react';

import {
    BodyLayoutType1,
    BodyLayoutType2,
    BodyLayoutType3
} from './layouts';

const BodyRouteWrapper = (props) => {

    const presenter = props.presenter;
    let layout = undefined;

    switch(props.layout) {
        case "layout-1":
            layout = <BodyLayoutType1 { ...props }> { presenter } </BodyLayoutType1>
            break;
        case "layout-2":
            layout = <BodyLayoutType2 { ...props }> { presenter } </BodyLayoutType2>
            break;
        case "layout-3":
            layout = <BodyLayoutType3 { ...props }> { presenter } </BodyLayoutType3>
            break;
        default:
            layout = <BodyLayoutType1 { ...props }> { presenter } </BodyLayoutType1>
        
    }

    return (
        <div
            style={{ 
                width: "99.4%", 
                height: (props.bodyHeight-props.footerHeight) + "px", 
                marginLeft: "10px", 
                // marginTop: "15px", 
                marginRight: "auto",
                scrollbarWidth: 'thin', 
                overflow: "auto" 
            }} 
        >
            { layout }
        </div>
    )
}

export default BodyRouteWrapper;