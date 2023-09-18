import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SortIcon from '../../assets/sort.png'

export default function Sort({sort, setSort}) {

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{minWidth: '100% '}}>
        <InputLabel id="demo-simple-select-autowidth-label" sx={{backgroundColor: '#FFFBFF'}}><img src={SortIcon} style={{marginRight: '5px'}} alt="sorter"/>Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={sort}
          defaultValue='Recent Upload'
          onChange={handleSortChange}
          autoWidth
          label="Sort By"
        >
          <MenuItem value={'Recent Upload'}>Recent Upload</MenuItem>
          <MenuItem value={'View Count'}>View Count</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}