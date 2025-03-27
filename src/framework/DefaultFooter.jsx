import React from 'react';

import {
    Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import Copyright from "./widgets/copyright/Copyright";

const OuterBox = styled(Box)(({ theme }) => ({
    fontSize: '10px',
    width: "100%",
    textAlign: 'justify',
    display: 'flex',
    padding: '0px',
    backgroundColor: theme.palette.background.footer
}))

export default function DefaultFooter (props) {

    const {
        companyName,
        companyWebSite,
        personSecurityText,
        onPersonSecurityPolicyShow
    } = props;

    const handlePersonSecurityPolicyShow = () => {
        onPersonSecurityPolicyShow();
    }

    return (
        <OuterBox>
            <Copyright
                style = {{ padding: 2 }}
                companyName = { companyName }
                companyWebSite = { companyWebSite }
                personSecurityText = { personSecurityText }
                onPersonSecurityPolicyShow={ handlePersonSecurityPolicyShow }
            />
        </OuterBox>
    )
}
