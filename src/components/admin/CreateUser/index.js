import React, {useState, useEffect} from 'react'import {    CssBaseline,    Typography,    Container,} from '@material-ui/core'import {ValidatorForm} from "react-material-ui-form-validator";import CreateUserForm from './CreateUserForm'import {useStyles} from './style'import UserAPI from "../../../services/UserAPI";export default () => {    const classes = useStyles();    const [submitted, setStateSubmitted] = useState(false);    const [formData, setStateFormData] = useState({        email: '',        password: '',        repeatPassword: '',        firstName: '',        lastName: '',        permission: 'waiter',    });    useEffect(() => {        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {            return value === formData.password;        });    });    const handleInputChange = event => {         const {value, name} = event.target;         setStateFormData({...formData, ...{[name]: value}});    }    const onSubmit = event => {        event.preventDefault();        setStateSubmitted(true);        new UserAPI().addUser(formData)            .then(res => {                if (res.status === 201) {                    window.location.href = '/admin-panel'                } else {                    setStateSubmitted(false)                    setStateFormData(prevState => {                        return {...prevState, ...{password: '', repeatPassword: ''}}                    });                    alert(res.data.errmsg);                }            })    }    return (        <Container component="main" maxWidth="xs">            <CssBaseline/>            <div className={classes.paper}>                <Typography className={classes.h1} component="h1" variant="h5">                    Create new user                </Typography>                <CreateUserForm                    onSubmit={onSubmit}                    handleInputChange={handleInputChange}                    submitted={submitted}                    formData={formData}                />            </div>        </Container>    )}