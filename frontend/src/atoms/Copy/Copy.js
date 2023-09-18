import { Button, Snackbar } from '@mui/material'
import { useState } from 'react'
import './Copy.css'
import SnackbarContent from '@mui/material/SnackbarContent';
import CopyIcon from '../../assets/copy.png'

const CopyToClipboardButton = ({textCopy}) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
    setOpen(true)
    navigator.clipboard.writeText(textCopy)
}
    
    return (
        <div>
            <Button onClick={handleClick}>
                <img src={CopyIcon} alt="Copy" />
                <span className="copy-text">Copy</span>
            </Button>

            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                <SnackbarContent
                    className="snackbar"
                    message="Copied to clipboard"
                />
            </Snackbar>

            
        </div>
    )
}

export default CopyToClipboardButton