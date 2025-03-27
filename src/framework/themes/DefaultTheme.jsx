import { createTheme } from '@mui/material/styles';

import { blue, grey } from '@mui/material/colors';

const DefaultTheme = createTheme({
    name: "default",
    palette: {
        mode: "light",
        background: {
            footer: grey[200],
            nav: grey[200],
            tableHead: grey[200]
        }
    },
    menu: {
        main: {
            hover: grey[300],
            selected: grey[600]
        },
        level1: {
            hover: grey[200],
            selected: grey[400]
        },
        level2: {
            hover: grey[100],
            selected: grey[300]
        }
    },
    nav: {
        background: grey[200]
    },
    rightPanel: {
        background: "none",
        borderLeft: "1px solid #eeeeee"
    },
    table: {
        background: grey[200],
    },
    footer: {
        background: grey[200],
    }
});

export default DefaultTheme;