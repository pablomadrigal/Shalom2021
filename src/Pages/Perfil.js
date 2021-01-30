import React, {useState, useEffect} from 'react';
import {
  Grid
} from '@material-ui/core';

import '../App.css'
import {getUserInfo, addUserName} from "../Services/database"
import { AVATAAAR_TYPES } from "../Data/avataaarData";
import Avataaar from "../Components/Avataaar/Avatar";

import valentia from "../Data/valentia.png"
import diligencia from "../Data/diligencia.png"
import fe from "../Data/fe.png"
import sacrificio from "../Data/sacrificio.png"

const initialAvatarState = {
  [AVATAAAR_TYPES.AVATARSTYLE]: 0,
  [AVATAAAR_TYPES.TOPTYPE]: 0,
  [AVATAAAR_TYPES.ACCESSORIESTYPE]: 0,
  [AVATAAAR_TYPES.HATCOLOR]: 0,
  [AVATAAAR_TYPES.HAIRCOLOR]: 0,
  [AVATAAAR_TYPES.FACIALHAIRTYPE]: 0,
  [AVATAAAR_TYPES.FACIALHAIRCOLOR]: 0,
  [AVATAAAR_TYPES.CLOTHETYPE]: 0,
  [AVATAAAR_TYPES.CLOTHECOLOR]: 0,
  [AVATAAAR_TYPES.GRAPHICTYPE]: 0,
  [AVATAAAR_TYPES.EYETYPE]: 0,
  [AVATAAAR_TYPES.EYEBROWTYPE]: 0,
  [AVATAAAR_TYPES.MOUTHTYPE]: 0,
  [AVATAAAR_TYPES.SKINCOLOR]: 0
};

const initialInsigniasState = {
  valentia: false,
  fe: false,
  sacrificio: false,
  diligencia: false
};

export default function Perfil(props) {
  const [nombre, setNombre] = useState("");
  const [avatarState, setAvatarState] = useState(initialAvatarState);
  const [insigniasState, setInsigniasState] = useState(initialInsigniasState);

  useEffect(() => {
    if(getUserInfo()!==null){
      getUserInfo().then((data) =>{
        if(data.val().nombre !== undefined && data.val().nombre !== null){
          setNombre(data.val().nombre);
        }
        if(data.val().avataaar !== undefined){
          setAvatarState(data.val().avataaar);
        }
        if(data.val().insignias !== undefined){
          setInsigniasState(data.val().insignias);
        }
      });
    }
  },[]);

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center" 
        spacing={5}
        style={{ minHeight: '90vh'}}> 
        <Grid item> 
          <Avataaar
            avatarStyle={avatarState.avatarStyle}
            topType={avatarState.topType}
            accessoriesType={avatarState.accessoriesType}
            hairColor={avatarState.hairColor}
            facialHairType={avatarState.facialHairType}
            facialHairColor={avatarState.facialHairColor}
            clotheType={avatarState.clotheType}
            clotheColor={avatarState.clotheColor}
            eyeType={avatarState.eyeType}
            eyebrowType={avatarState.eyebrowType}
            mouthType={avatarState.mouthType}
            skinColor={avatarState.skinColor}
          />
        </Grid>
        <Grid item>
        <input type="text" value={nombre} className={"letraNormal nameInput"} style={{ width: '100%'}} onChange={e => setNombre(e.target.value)}/>
        </Grid>
        <Grid container
        direction="row"
        justify="center"
        alignItems="center" 
        spacing={5}>
          {insigniasState.valentia === true 
          && <Grid item >
              <img  src={valentia} className={"insignias"} alt="valentia"/>
          </Grid>}
          {insigniasState.fe === true 
          && <Grid item>
          <img  src={fe} className={"insignias"} alt="valentia"/>
          </Grid>}
          {insigniasState.sacrificio === true 
          && <Grid item>
          <img  src={sacrificio} className={"insignias"} alt="valentia"/>
          </Grid>}
          {insigniasState.diligencia === true 
          && <Grid item>
          <img  src={diligencia} className={"insignias"} alt="valentia"/>
          </Grid>}
        </Grid>
        <Grid item><button className="a-n2" onClick={() => addUserName(nombre)}>Actualizar Nombre</button></Grid>
        <Grid item><button className="a-n2" onClick={() => props.setPage(4)}>Cambiar Avatar</button></Grid>
      </Grid>
    </div>
    
  );
}