import {useState, useEffect} from 'react';
import useFetch from "./useFetch";
import {useParams} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import ViewIcon from '../../assets/visible.png'
import './View.css';
import TextField from '@mui/material/TextField';
import CopyToClipboardButton from '../../atoms/Copy/Copy';

export const View = () => {
    const {id} = useParams();
    const {data: snippets, isPending, error} = useFetch('http://localhost:4000/api/snippets/' + id);
    const [seconds, setSeconds] = useState(0);
    const [countDown, setCountDown] = useState(null);

    useEffect(() => {
        if (!isPending && snippets && snippets.expiry) {
            setSeconds(getTimeLeftTillExpiry(snippets.expiry));
        }
    }, [snippets, isPending]);

    useEffect(() => {
        
        if (seconds < 0) {
            clearInterval(countDown);
        } else if (countDown === null && seconds >= 0) {
            setCountDown(setInterval(() => {
                setSeconds((second) => second - 1 );
            }, 1000));
        }
    }, [seconds, countDown]);

    const getTimeLeftTillExpiry = (expiry) => {
        const now = new Date();
        const expiryDate = new Date(expiry);
        const diff = expiryDate.getTime() - now.getTime();
        const seconds = Math.floor(diff / 1000);
        console.log(expiryDate, seconds)
        return seconds;
    }

    const renderCountdown = (seconds) => {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor(seconds % (3600 * 24) / 3600);
        const minutes = Math.floor(seconds % 3600 / 60);
        const secs = Math.floor(seconds % 60);

        if (seconds >= 0) {
            return  <div>Expiring in {days} days, {hours} hours, {minutes} minutes, {secs} seconds</div>
        } else {
            return <div>Expired</div>
        }
    }

    return (
        <div>
            {
                isPending ? 
                <div>Loading...</div> : 
                error ? <div>{error}</div> :
                snippets && (
                    <div className="view-body">
                        <Grid container spacing={0} className="view-header">
                            <Grid item xs={10}>
                                <h1>{snippets.title}</h1>
                            </Grid>
                            <Grid item xs={2}>
                                <span className="view-count">{snippets.viewCount}<img src={ViewIcon} alt="view"/></span>
                            </Grid>
                            <Grid item xs={12}>
                                <p style={{fontStyle: 'Italic'}}>{snippets.expiry? renderCountdown(seconds) : <div>Never</div>}</p>
                            </Grid>
                        </Grid>

                            <Grid container spacing={0} className="content-body">
                                <Grid item xs={10}>
                                    Content
                                </Grid>
                                <Grid item xs={2} className="copy-button">
                                    <CopyToClipboardButton textCopy={snippets.content}/>
                                </Grid>
                            </Grid>

                            <TextField
                                className="content-body"
                                multiline
                                fullWidth
                                minRows = {12}
                                maxRows = {30}
                                value={snippets.expiry && seconds>0 ? snippets.content : 'expired'}
                                InputProps={{readOnly: true}}
                            />
                    </div>
                )
            }
        </div>
    )
}