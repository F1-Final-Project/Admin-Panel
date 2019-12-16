import React, {useState} from 'react'
import {
    Avatar,
    CssBaseline,
    Box,
    Typography,
    Container,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Grow from '@material-ui/core/Grow';

import LoginForm from './LoginForm'
import Copyright from '../common/Copyright'
import AuthAPI from '../../services/AuthService'

import useStyle from './style'

export default (props) => {
    const classes = useStyle()

    const [submitted, setStateSubmitted] = useState(false);
    const [formData, setStateFormData] = useState({'email': '', 'password': ''});
    const [checked, setChecked] = React.useState(true);

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
                    setTimeout(() => {window.location.href = '/admin'}, 2000)
                } else {
                    setStateSubmitted(false)
                    setStateFormData(prevState => {
                        return {...prevState, ...{password: ''}}
                    });
                    alert(res.data.error)
                }
            })
    }

    return (
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
    )
}
