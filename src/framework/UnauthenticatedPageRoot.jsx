import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const UnauthenticatedPageRoot = (props) => {

    const { presenterMap } = props;

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <Suspense fallback={ <p>Loading...</p> }>
                <Routes>
                {presenterMap && presenterMap.map((route, index)=>{
                    return (
                        <Route 
                            key={ index }
                            path={ route.key }
                            element={ route.presenter }
                            { ...props }
                        />
                    )
                })}
                </Routes>
            </Suspense>
        </div>
    )
}

export default UnauthenticatedPageRoot;