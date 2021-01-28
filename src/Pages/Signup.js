import React, { useState } from 'react'
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    makeStyles,
    Container
} from '@material-ui/core';


import { signup } from '../Services/auth';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
}));

function SignUp(props) {
    const classes = useStyles();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function onRegister(event) {
        event.preventDefault();
        try {
            await signup(email, password).then(props.closeModal());
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onRegister}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link onClick={()=>props.yaTieneCuenta()} variant="body2">
                                    Ya tienes cuenta? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );
}

export default SignUp;