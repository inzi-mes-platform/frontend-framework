import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import BodyRouteWrapper from './BodyRouteWrapper';

const BodyRouter = (props) => {

    const [presenterMap, setPresenterMap] = React.useState([]);

    React.useEffect(()=>{
        setPresenterMap(props.presenterMap);
    }, [props.presenterMap]);

    return (
        <div style={{ height: "100%", width: "100%" }}>
            { /* Apply code splitting && Micro frontend */ }
            <Suspense fallback={ <p>Loading...</p> }>
                <Routes>
                    {
                        presenterMap.map(( route, index )=>{
                            return (
                                <Route 
                                    key={ index }
                                    path={ route.key }
                                    element={
                                        <BodyRouteWrapper
                                            path={ route.key }
                                            presenter={ route.presenter }
                                            layout={ route.layout }
                                            { ...props }
                                        />
                                    }
                                    { ...props }
                                />
                            )
                        })
                    }
                </Routes>
            </Suspense>
        </div>
    )
}

export default BodyRouter;