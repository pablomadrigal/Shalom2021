import React, {useState, useEffect} from 'react';
import {
  Grid
} from '@material-ui/core'

import {getRally} from "../Services/database"

export default function Perfil() {
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
            return <Grid key={index} item lg={4} sm={12} className="logo tituloPequeno"
            style={{ height: '150px'}}> {equipo.Nombre}</Grid>;
          })
          :null}
      </Grid>
    </div>
    
  );
}