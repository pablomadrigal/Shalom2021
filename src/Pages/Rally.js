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
    getRally().once('value').then(function(dataSnapshot) {
      dataSnapshot.forEach((childSnapshot) => {
        foo.push(childSnapshot.val());
      });
      setLoad(true);
      setRallyState(foo);
    });
  },[]);

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center" 
        spacing={5}
        style={{ minHeight: '90vh'}}> 
        {load
          ?rallyState.map((equipo, index) => {
            return <Grid key={index} item lg={4} sm={12} className="logo tituloMediano"> {equipo.Nombre}</Grid>;
          })
          :null}
          <div className="logo tituloMediano">HOLA</div>
      </Grid>
    </div>
    
  );
}