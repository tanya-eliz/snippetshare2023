import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './TimePicker.css';

export const TimePicker = ({setCustom}) => {
    const [days, setDay] = React.useState(null);
    const [minutes, setMinutes] = React.useState(null);
    const [hours, setHours] = React.useState(null);
    const [weeks, setWeeks] = React.useState(null);

    React.useEffect(() => {
        const custom = {};
        if (days) {
            custom.days = days;
        }
        if (minutes) {
            custom.minutes = minutes;
        }
        if (weeks) {
            custom.weeks = weeks;
        }
        if (hours) {
            custom.hours = hours;
        }
        setCustom(custom);
    }, [days, minutes, hours, weeks]);

    const handleDayChange = (event) => {
        setDay(event.target.value);
    };

    const handleMinChange = (event) => {
        setMinutes(event.target.value);
    };

    const handleHrsChange = (event) => {
        setHours(event.target.value);
    };

    const handleWeekChange = (event) => {
        setWeeks(event.target.value);
    };
    
    return (
        <div className='custom'>
            Custom: 
            <TextField 
                sx={{m:0.75, '& input': {maxWidth: '50px'}}}
                id="outlined-basic" 
                label="Weeks" 
                variant="outlined" 
                type="number"
                defaultValue="0"
                value={weeks}
                onChange={handleWeekChange}
                inputProps={{ min: "0" }}
                /> 

            <TextField 
                sx={{m:0.75, '& input': {maxWidth: '50px'}}}
                id="outlined-basic" 
                label="Days" 
                variant="outlined" 
                type="number"
                defaultValue="0"
                value={days} 
                onChange={handleDayChange}
                inputProps={{ min: "0" }}
                /> 

            <TextField 
                sx={{m:0.75, '& input': {maxWidth: '50px'}}}
                id="outlined-basic" 
                label="Hours" 
                variant="outlined" 
                type="number"
                defaultValue="0"
                value={hours} 
                onChange={handleHrsChange}
                inputProps={{ min: "0" }}
                /> 

            <TextField 
                sx={{m:0.75, '& input': {maxWidth: '50px'}}}
                id="outlined-basic" 
                label="Min." 
                variant="outlined" 
                type="number"
                defaultValue="0"
                value={minutes} 
                onChange={handleMinChange}
                inputProps={{ min: "0" }}
                /> 
        </div>
    )
  }


export default TimePicker;