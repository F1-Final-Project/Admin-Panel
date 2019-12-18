import React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './style'
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";

export default function Alert(props) {
    const {message, open, setOpen} =props;
    const classes = useStyles();

    const closeMessage = () => {
        setOpen(false);
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={closeMessage}
            >
                <SnackbarContent
                    className={classes.error}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className={classes.icon} >
                <ErrorIcon/>
                         {message}
                    </span>
                    }
                    action={
                        <IconButton key="close" aria-label="close" color="inherit" onClick={closeMessage}>
                            <CloseIcon  className={classes.close}/>
                        </IconButton>
                    }
                />
            </Snackbar>
        </>
    );
}