import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CloseIcon from '@material-ui/icons/Close';
import * as errorActions from '../../../store/actions/error'
import useStyles from './style'
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";

export default function Alert() {
    const {message, open} = useSelector(state =>
        ({message: state.error.error.message,
            open: state.error.error.open})
    );
    const dispatch = useDispatch();
    const classes = useStyles();

    const closeMessage = () => {
        errorActions.openError({open:false, message: null})(dispatch);
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