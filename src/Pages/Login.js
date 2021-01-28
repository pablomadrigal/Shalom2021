import React, { useState } from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Typography,
    Container,
    makeStyles,
    Link,
    FormControlLabel,
    Checkbox
} from '@material-ui/core'
import { signinRemember, signinNoRemember } from '../Services/auth';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        marginBottom: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignIn(props) {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    async function login() {
        console.log(remember);
        try {
            if (remember) {
                await signinRemember(email, password).then(props.closeModal())
            } else {
                await signinNoRemember(email, password).then(props.closeModal())
            }
            props.actualizarAvatar();
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
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={e => e.preventDefault() && false}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
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
                        <FormControlLabel
                            control={<Checkbox value={remember} onChange={(event) => setRemember(event.target.checked)} color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={login}
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link onClick={()=>props.noTieneCuenta()} variant="body2">
                                    No tienes cuenta? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );
}

export default SignIn;