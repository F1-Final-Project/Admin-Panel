import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {
    Avatar,
    CssBaseline,
    Box,
    Typography,
    Container,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Grow from '@material-ui/core/Grow';
import {useStyles} from './style'
import LoginForm from './LoginForm'
import Copyright from '../common/Copyright'
import AuthAPI from '../../services/AuthService'
import Error from '../common/Error'

export default (props) => {
    const classes = useStyles()

    const [submitted, setStateSubmitted] = useState(false);
    const [formData, setStateFormData] = useState({'email': '', 'password': ''});
    const [checked, setChecked] = React.useState(true);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(false);

    const handleInputChange = event => {
        const {value, name} = event.target;
        setStateFormData({...formData, ...{[name]: value}});
    }

    const onSubmit = event => {
        event.preventDefault()

        setStateSubmitted(true)
        new AuthAPI()
            .postAuth(formData)
            .then(res => {
                if (res.status === 200) {
                    setChecked(false);
                    if(res.data.permission === 'admin'){
                        setTimeout(() => {window.location.href = '/admin-panel'}, 2000)
                    }else if(res.data.permission === 'cook'){
                        setTimeout(() => {window.location.href = '/kitchen'}, 2000)
                    }else {
                        setTimeout(() => {window.location.href = '/menu'}, 2000)
                    }
                } else {
                    setStateSubmitted(false)
                    setStateFormData(prevState => {
                        return {...prevState, ...{password: ''}}
                    });
                    setMessage(res.data.error);
                    setOpen(true);
                }
            })
    }

    return (
        <>
        <Grow
            in={checked}
            className={classes.grow}
            {...{timeout: 2000}}
        >
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <LoginForm
                        onSubmit={onSubmit}
                        handleInputChange={handleInputChange}
                        submitted={submitted}
                        formData={formData}
                    />
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        </Grow>
            <Error open={open} setOpen={setOpen} message={message}/>
        </>
    )
}
