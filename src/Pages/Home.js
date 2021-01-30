import React, { useState, useEffect } from 'react';
import {
    Container,
    makeStyles,
    Dialog,
    Grid
} from '@material-ui/core'

import '../App.css'
import Header from '../Components/General/Header';
import SignIn from "../Pages/Login";
import SignUp from "../Pages/Signup"
import Perfil from "../Pages/Perfil"

import SantoCard from '../Components/Santos/SantosCard'
import MaterialCard from '../Components/General/MaterialCard'
import AvatarGenerator from '../Components/Avataaar/AvatarGenerator'

import { material } from '../Data/materialData'
import { santos } from '../Data/santosData'
import { auth } from '../Services/firebase';
import {getUserInfo, getRally, getMaterial} from "../Services/database"
import { AVATAAAR_TYPES } from "../Data/avataaarData";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'black'
  },
  paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  paperCard: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

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

function HomePage() {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [registro, setRegistro] = useState(true);
  const [page, setPage] = useState(0);
  const [avatarState, setAvatarState] = useState(initialAvatarState);
  const [rallyState, setRallyState] = useState([{Nombre:"Hola"},{Nombre:"Adios"}]);
  const [materialState, setMaterialState] = useState(material);

  useEffect(() => {
    getAvatar();
    var rallyList = [];
    var materialList = [];
    getRally().once('value').then(function(dataSnapshot) {
      dataSnapshot.forEach((childSnapshot) => {
        rallyList.push(childSnapshot.val());
      });
      setRallyState(rallyList);
    });
    
    getMaterial().once('value').then(function(dataSnapshot) {
      dataSnapshot.forEach((childSnapshot) => {
        materialList.push(childSnapshot.val());
      });
      setMaterialState(materialList);
      console.log(materialList);
    });
  },[]);

  const getAvatar = () =>{
    if(getUserInfo()!==null){
      getUserInfo().then((data) =>{
        if(data.val().avataaar !== null){
          setAvatarState(data.val().avataaar);
        }
      });
    }
  }

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleLogin = () => {
    setOpenModal(true);
    setRegistro(false);
  };

  const handleHome = () => {
    setPage(0);
    getAvatar();
  };
  const handleSignout= () => {
    auth().signOut();
  };

  const handleSignup = () => {
    setOpenModal(true);
    setRegistro(true);
  };

  const homeContent = () =>{
    return(<div>
      {(()=>{
        switch (page) {
          case 0: //Inicio
            return <Grid 
              container
              direction="row"
              justify="center"
              alignItems="center" 
              spacing={10}
              style={{ minHeight: '90vh'}}> 
              <Grid item className="logo tituloMediano">
                  <b>A        <span>L</span>I<span>G</span>HT     <span>O</span>F<span>         H</span>O<span>P</span><span>E</span></b>
                </Grid>
              <Grid item xs={6} align="center">
                  <button className="a-n2" onClick={() => setPage(1)}>Santos</button>
              </Grid>
              <Grid item xs={6} align="center">
                  <button className="a-n2" onClick={() => setPage(2)}>Rally</button>
              </Grid>
              {<Grid item xs={6} align="center">
                  <button className="a-n2" onClick={() => setPage(3)}>Recursos</button>
                </Grid>}
            </Grid>;
          case 1: //Santos
            return (
              <div
              className={"flex-section"}
              style={{ height: '650px'}}>
              <Grid
              container
              direction="row"
              justify="center"
              alignItems="center" 
              spacing={5}
              className={"flex-col-scroll"}
              > 
                {santos.map((santo, index) => {
                  return <Grid key={index} item lg={4} sm={12} > <SantoCard santo={santo}/></Grid>;
                })}
              </Grid>
              </div>
            );
          case 2: //Rally
            return (
              <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={"flex-section"}
              >
                {rallyState.map((equipo, index) => {
                  console.log(equipo)
                  return <Grid key={index} item 
                  className={"logo tituloPequeno"}  style={{ height: '150px'}}>
                  <b>{equipo.Nombre}<span>     -     </span><span>{equipo.Puntaje}</span></b>
                </Grid>;
                })}
            </Grid>);
          case 3: //Material
            return (
              <div
              className={"flex-section"}>
                <div
              className={"flex-col-scroll"}
              style={{ height: '650px'}}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center" 
              spacing={5}
              >  
                {materialState.map((mat, index) => {
                  return <Grid key={index} item> <MaterialCard material={mat}/></Grid>;
                })}
              </Grid></div></div>
            ); //MaterialCard
          case 4: //Avatar
            return <div><AvatarGenerator initialAvatarState={avatarState}/></div>;
          case 5: //Profile
            return <div><Perfil setPage={setPage}/></div>;
          default:
            return null;
        }
      })()}
    </div>);
  }

  var modalBody = (
    <div className={classes.paper}>
      {registro?<SignUp closeModal={handleClose} yaTieneCuenta={handleLogin}/>:<SignIn closeModal={handleClose} actualizarAvatar={getAvatar} noTieneCuenta={handleSignup}/>}
    </div>
  );

    return (
        <div className={classes.root}>
            <Header Login={handleLogin} Signup={handleSignup} Signout={handleSignout} Home={handleHome} Avatar={()=>setPage(4)} Perfil={()=>setPage(5)} AvatarState={avatarState}  Page={page}/>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openModal}>
                {modalBody}
            </Dialog>
            <Container >
                {homeContent(page)}
            </Container>
        </div>
    );
}

export default HomePage;