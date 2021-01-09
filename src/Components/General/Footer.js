import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        top: 'auto',
        bottom: 0,
        width: "100%",
        position: "fixed",
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));



function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <Container maxWidth="sm">
                <Typography variant="body2" color="textSecondary" align="center">

                    {'Copyright © '}
                    <Link color="inherit" href="https://es.carmenta.co/">
                        Carmenta
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>

        </div>
    );
}

export default Footer;