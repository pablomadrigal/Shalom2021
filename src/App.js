import React, {useState} from 'react';
import './App.css'
import { 
  Grid,
  CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HomePage from './Pages/Home';
import {material} from './Data/materialData'
import MaterialCard from './Components/General/MaterialCard'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    margin: 0,
    padding: 0,
    backgroundColor: 'black'
  },
}));

function App() {
  const classes = useStyles();
  const [intro, setIntro] = useState(true);

  const renderIntro = () => {
    return(
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}>
          <CssBaseline />
        <Grid item xs = {12} className="tituloGrande logo">
          <b>E<span>N</span>T<span>E</span>R       <span>T</span>H<span>E</span>         <span>G</span>A<span>M</span>E</b>
        </Grid>
        <Grid item xs = {12}>
          <button className="a-n2" onClick={() => setIntro(false)}>
            Entrar
          </button>        
        </Grid>
      </Grid>
    );
  }


  return (
    <div className={classes.root} >
      {intro ? renderIntro():<HomePage/>}
    </div>
  );
}

export default App;