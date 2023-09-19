import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Snippets.css';
import ViewIcon from '../../assets/visible.png'
import Pagination from '../../atoms/Pagination/Pagination';
import Button from '../../atoms/Button/Button'
import Stack from '@mui/material/Stack';
import Sort from '../../atoms/Sort/Sort'
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import useFetch from '../../components/ViewSnippet/useFetch';

const BE_API_URL = process.env.BE_API_URL || 'http://localhost:4000';

export const Snippets = () => {
  const [rowdata, setRowData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = React.useState('Recent Upload');
  const [totalPage, setTotalPage] = React.useState(1);

  useEffect(() => {
    console.log("page:", page)
    let queryString = `?page=${page? page : 1}&limit=${rowsPerPage? rowsPerPage :10}`;
    if ( rowdata.length  && sort === 'Recent Upload') {
      queryString += '&orderBy=createdAt';
    } else if (rowdata.length && sort === 'View Count') {
      queryString += '&orderBy=viewCount';
    }
    customFetch(`${BE_API_URL}/api/snippets` + queryString);
  }, [sort, page, rowdata.length, rowsPerPage]);

  const customFetch = async (url) => {
    try {
      const response = await fetch(url);
      const results = await response.json();
      console.log(results.snippets)
      if (results.snippets) {
        setRowData(results.snippets);
        setTotalPage(results.totalPages);
        setPage(results.currentPage);
      }
    } catch (err) {
      console.log(err);
      alert('Error fetching snippets');
    }
  }

  // Utility function to convert date to local time
  const convertDate = (date) => {
    const newDate = new Date(date)
    console.log(newDate);
    return newDate.toLocaleString('en-SG',{timeZone:'Asia/Singapore'});
  }

  const nextPage = () => {
    setPage(page+1);
  }

  const previousPage = () => {
    setPage(page-1);
  }

  const renderPagination = () => {
    return(
        <div className="pagi-align">
            {
              page>1 && 
              <span>
                <Button label ={'Prev Page'} disabled = {false} variant='pagi' align='center'  onClick={()=>{previousPage()}}/> 
              </span>
            }
            <Pagination currPageNum={page} totalPage={totalPage}/>
            {
              page<totalPage && 
              <span>
                  <Button label ={'Next Page'} disabled = {false} variant='pagi' align='center' onClick={() => {nextPage()}}/> 
              </span>
            }
        </div>
    )
  }

  return (
      <div data-testid = "snippets" className="snippets-page">

        <Grid container spacing={2} sx={{marginBottom: 1.5}}>
          <Grid item xs={10}>
            <h1>View All Snippets</h1>
          </Grid>
          <Grid item xs={2}>
            <Sort sort={sort} setSort={setSort}/>
          </Grid>
        </Grid>
        
        
        <TableContainer component={Paper} sx={{backgroundColor: "#FFFBFF"}}>
          <Table size="small" aria-label="a dense table" className="table-body">
            <TableHead>
              <TableRow className="header-row">
                <TableCell className="header">Title</TableCell>
                <TableCell align="right" className="header">Uploaded Time</TableCell>
                <TableCell align="right" className="header">Views</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { rowdata.length>0 && rowdata.map((row,index) => (
                <TableRow
                  key={index} 
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link to={`/view-snippet/${row.id}`}>
                        {row.title}
                    </Link>
                  </TableCell>
                  <TableCell className="cell" align="right">{convertDate(row.createdAt)}</TableCell>
                  <TableCell className="cell" align="right">{row.viewCount}<img src={ViewIcon} alt="view"/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
        </TableContainer>
        
          <div style={{float: 'right', marginTop:'1%'}}>
						<Stack spacing={4} direction="row">
							{renderPagination()}
						</Stack>
          </div>
      </div>

    );
}

export default Snippets