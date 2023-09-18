import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
const styles = {
    "&.MuiButton-root":{
        borderRadius: '6px',
        textTransform: 'unset ! important',
        fontSize: '16px'
    },
    "&.MuiButton-save":{
        backgroundColor: '#14213D',
        border: '1px solid #14213D',
        color: '#FFFFFF',
        padding: '1%',
        marginTop: '1%',
        width: '20%',
        minHeight: '50px',
        maxWidth: '250px',
        minWidth: '175px',
        maxHeight: '50px',
    },
    "&.MuiButton-pagi":{
        backgroundColor: 'none',
        minWidth: '102px',
        fontSize: '14px',
        color: '#727272'
    },
    "&.Mui-disabled":{
        backgroundColor: '#9FA1AD',
        border: '1px solid #9FA1AD',
        color: '#ffffff',
        padding: '1%',
        marginTop: '1%',
        width: '20%',
        minHeight: '50px',
        maxWidth: '250px',
        minWidth: '175px',
        maxHeight: '50px',
    },
};

const DefaultButton = ({label, disabled, variant, width, className, align, onClick,}) => {
    
    return(
        <Box
            sx={{
                width: {width},
                align: {align},
            }}
        >
            <Button disabled={disabled} sx={styles} variant={variant} className={className} onClick={onClick}>
                {label}
            </Button>
        </Box>
    );
}

export default DefaultButton;
