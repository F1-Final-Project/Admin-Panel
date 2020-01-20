import React from 'react'
import Button from '@material-ui/core/Button/index'
import {useDispatch, useSelector} from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import * as alertActions from '../../../store/actions/alert'
import useStyles from './style'
import Box from '@material-ui/core/Box'

export default function Alert() {
    const {message, open} = useSelector(state =>
        ({message: state.alert.alert.message,
            open: state.alert.alert.open})
    );
    const dispatch = useDispatch();
    const classes = useStyles();

    const closeDialog = () => {
        alertActions.openAlert({open:false, message: null})(dispatch);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={closeDialog}
            >
                <Box border={1} borderColor='#7a6c5b' borderRadius={3} className={classes.dialog}>
                    <DialogTitle >
                        <>
                        {message? message: null}
                        </>
                    </DialogTitle>
                    <DialogActions >
                        <Button className={classes.button} variant="outlined" onClick={closeDialog}>
                            ok
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
}