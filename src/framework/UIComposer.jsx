import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { History } from './History';
import AuthenticatedPageRoot from './AuthenticatedPageRoot';
import UnauthenticatedPageRoot from './UnauthenticatedPageRoot';

const logggedInChannel = new BroadcastChannel("loggedIn");

const UIComposer = (props) => {

    const { routeInfos, initializeAuth } = props;

    // init custom history object to allow navigation from anywhere in the react app (inside or outside components)
    History.navigate=useNavigate();
    History.location=useLocation();

    const dispatch = useDispatch();
    const initAuth = ( auth ) => dispatch( initializeAuth( auth ) );

    const authInfo = useSelector(state=>state.auth);

    if(authInfo === undefined || authInfo.loginInfo === undefined || authInfo.loginInfo.data === undefined || authInfo.loginInfo.data.logined === false) {
        logggedInChannel.postMessage({ type: "ASK" });
    }

    const [authenticated, setAuthenticated] = React.useState(true
        // (authInfo === undefined || authInfo.loginInfo.data === undefined || authInfo.loginInfo.data.logined === false) ? false : true
    );

    React.useEffect(()=>{
        function listenLoggedInAsk ( event ) {
            if(event.data.type === "ASK" && authInfo !== undefined) {
                logggedInChannel.postMessage({ type: "REP", val: authInfo.loginInfo.data });
            } else if(event.data.type === 'REP') {
                if(event.data.val !== undefined && initializeAuth !== undefined) {
                    initAuth(event.data.val);
                }
            }
        }

        logggedInChannel.addEventListener("message", listenLoggedInAsk);
        return () => {
            logggedInChannel.removeEventListener("message", listenLoggedInAsk);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(()=>{
        // setAuthenticated( (authInfo === undefined || authInfo.loginInfo.data === undefined || authInfo.loginInfo.data.logined === false) ? false : true);
        setAuthenticated(true);
    }, [authInfo]);

    return (
        <div style={{ height: "100%", width: "100%" }}>
            { authenticated === true 
            ?
            <AuthenticatedPageRoot 
                presenterMap={ routeInfos.authRouteInfos }
                { ...props } 
            /> 
            :
            <UnauthenticatedPageRoot 
                presenterMap={ routeInfos.unAuthRouteInfos }
                { ...props } 
            />
            }
        </div>
    )
}

export default UIComposer;