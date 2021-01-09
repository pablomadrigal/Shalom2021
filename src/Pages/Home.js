import React, { useState } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    makeStyles,
    Link,
    FormControlLabel,
    Checkbox
} from '@material-ui/core'

import Header from '../Components/General/Header';
import Footer from '../Components/General/Footer';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

function HomePage(props) {
    const classes = useStyles();
    
    return (
        <div>
            <Header />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Home Page
                    </Typography>
                </div>
            </Container>
            <Box mt={8}>
                <Footer />
            </Box>
        </div>
    );
}

export default HomePage;