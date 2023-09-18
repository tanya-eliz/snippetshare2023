import { Typography } from '@mui/material';
import React from 'react';

const Pagination = ({currPageNum, totalPage}) => {

    return(
        <div> 
            <Typography variant='tablePagi'>
               | Page {currPageNum} of {totalPage} |
            </Typography>
        </div>
    )
}

export default Pagination;