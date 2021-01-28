import React, {useState, useEffect} from 'react';
import {
  Grid
} from '@material-ui/core'

import {getRally} from "../Services/database"

export default function Rally() {
  const [rallyState, setRallyState] = useState([{Nombre:"Hola"},{Nombre:"Adios"}]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    var foo = [];
    getRally().once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        foo.add(childSnapshot.val());
        console.log(childSnapshot.val());
      });
    });
  },[]);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center" 
      spacing={5}
      style={{ minHeight: '90vh'}}> 
        {/*load
          ?null
          :rallyState.map((equipo, index) => {
            console.log(equipo);
            return <Grid key={index} item lg={4} sm={12}> </Grid>;
          })*/}
      </Grid>
  );
}