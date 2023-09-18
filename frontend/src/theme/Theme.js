import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
    typography:{
        fontFamily: 'Poppins',
        h1:{
            fontWeight: 'bold',
            fontSize: '20px',
        },
        tablePagi:{
            fontSize: '14px',
            color: '#727272'
        },
        sort: {
            fontSize: '14px'
        },
        
    },

    components:{
        MuiTypography:{
            defaultProps:{
                variantMapping:{
                    header: 'body1'
                }
            }
        },

        MuiCssBaseline:{
            styleOverrides:
                `
                @font-face{
                    font-family: 'Poppins';
                    font-style: normal
                    font-display:swap;
                    font-weight: normal;
                    color: '#1F160F';
                }
                `
        }
    }
})

export default Theme;