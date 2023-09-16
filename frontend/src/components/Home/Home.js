import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Home.css';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DefaultButton from '../../atoms/Button/Button';
import TimePicker from '../../atoms/TimePicker/TimePicker';
import Grid from '@mui/material/Grid';

// dropdown styling
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = [
    'Never', 
    'Burn after read', 
    '5 minutes', 
    '30 minutes', 
    '1 hour', 
    '1 day', 
    '1 week', 
    '1 month', 
    '1 year', 
    'Custom'
];

export const Home = () => {
    const [option, setOption] = React.useState([]);
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [custom,setCustom] = React.useState({})
    const [disabled, setDisabled] = React.useState(true);

    React.useEffect(() => {
        console.log(option)
        console.log(custom)
        setDisabled(title === '' || content === '' || option.length === 0 || (option === 'Custom' && Object.keys(custom).length === 0));
    }, [title, content, option, custom]);
    
    const variant = disabled ? 'disabled' : 'save';

    const handleOptionChange = (event) => {
        setOption(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
    
    return (
        <Box
        component="form"
        sx={{
            maxWidth: '100%',
        }}
        className="homebody"
        noValidate
        autoComplete="off"
        >
            <h1>Create New Snippet</h1>
            <p>Title</p>
            <TextField
                fullWidth
                required
                id="outlined-required"
                placeholder="Enter title here"
                value={title} 
                onChange={handleTitleChange}
            />

            <p>Content</p>
            <TextField
                fullWidth
                required
                id="outlined-multiline-flexible"
                placeholder="Insert snippet content here"
                multiline
                minRows = {8}
                value={content} 
                onChange={handleContentChange}
            />

            <Grid container spacing={2} sx={{my:1}}>
                <Grid item xs={12} md={5} className="expiry">
                    Time to Expiry:
                    <FormControl sx={{ mx: 1, width: 300 }}> 
                        <InputLabel>Time</InputLabel>
                        <Select
                            value={option}
                            onChange={handleOptionChange}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                            >
                            {options.map((input) => (
                                <MenuItem
                                key={input}
                                value={input}
                                >
                                {input}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={7}>
                    {option === 'Custom' && 
                        <TimePicker setCustom={setCustom}/>}
                </Grid>
            </Grid>

            <span>
                <DefaultButton label ={'Create Snippet'} disabled = {disabled} variant={variant} align='center' onClick={()=>{}}/> 
            </span>
        </Box>
    )
}

export default Home