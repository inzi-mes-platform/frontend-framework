import React from 'react';

import DefaultFooter from './DefaultFooter';

const FooterWrapper = ( props ) => {
        
    const { customFooter, defaultFooterOptions } = props;

    return (
        <>
            { 
                customFooter !== undefined 
                ?
                customFooter
                :
                <DefaultFooter 
                    companyName = { defaultFooterOptions.companyName }
                    companyWebSite = { defaultFooterOptions.companyWebSite }
                    personSecurityText = { defaultFooterOptions.personSecurityText }
                    onPersonSecurityPolicyShow = { defaultFooterOptions.onPersonSecurityPolicyShow }
                />
            }
        </>
    )
}

export default FooterWrapper;
