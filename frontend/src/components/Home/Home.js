import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Home.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DefaultButton from '../../atoms/Button/Button';
import TimePicker from '../../atoms/TimePicker/TimePicker';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CopyToClipboardButton from '../../atoms/Copy/Copy';

const BE_API_URL = process.env.BE_API_URL || 'http://localhost:4000';

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
    {key:'Never' , value: {never: true}}, 
    {key:'5 minutes', value: {minutes: 5}}, 
    {key:'30 minutes', value: {minutes: 30}},
    {key:'1 hour', value: {hours: 1}}, 
    {key:'1 day', value: {days: 1}},
    {key:'1 week', value: {weeks: 1}},
    {key:'1 month', value: {months: 1}},
    {key:'1 year', value: {years: 1}},
    {key:'Custom', value: 'Custom'}
];

export const Home = () => {
    const [option, setOption] = React.useState([]);
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [custom,setCustom] = React.useState({})
    const [disabled, setDisabled] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [url, setUrl] = React.useState('');


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

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async() => {
        try {
            const response = await fetch(`${BE_API_URL}/api/snippets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    tte: option === 'Custom' ? custom : option
                })
            })
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error)
            } 

            setOpen(true);
            setMessage(data.message)
            setUrl(`http://localhost:3000/view-snippet/${data.id}`)
            // alert(`${data.message}\nHere's your link: http://localhost:3000/view-snippet/${data.id}`)
            clearInputs();
        } catch (error) {
            console.log(error);
        }
    }

    const clearInputs = () => {
        setTitle('');
        setContent('');
        setOption([]);
        setCustom({});
    }
    
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
                            {options.map((option) => (
                                <MenuItem
                                key={option.key}
                                value={option.value}
                                >
                                {option.key}
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
                <DefaultButton label ={'Create Snippet'} disabled = {disabled} variant={variant} align='center' onClick={handleSubmit}/> 
            </span>

            <Dialog
                sx={{width: 'auto', margin: 'auto'}}
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{message}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">

                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            Your unique URL: {url}
                        </Grid>
                        <Grid item xs={3} className="copy-button">
                            <CopyToClipboardButton textCopy={url}/>
                        </Grid>
                        
                    </Grid>
                </DialogContentText>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default Home