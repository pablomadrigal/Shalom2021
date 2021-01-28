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
import Rally from "../Pages/Rally"

import SantoCard from '../Components/Santos/SantosCard'
import AvatarGenerator from '../Components/Avataaar/AvatarGenerator'

import { santos } from '../Data/santosData'
import { auth } from '../Services/firebase';
import {getAvataaar} from "../Services/database"
import { AVATAAAR_TYPES } from "../Data/avataaarData";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
        flexGrow: 1,
        backgroundColor: 'black'
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

    useEffect(() => {
      getAvatar();
    },[]);


  const getAvatar = () =>{
    if(getAvataaar()!==null){
      getAvataaar().then((data) =>{
        setAvatarState(data.val().avataaar);
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

  const homeContent = pagina =>{
    return(<div>
      {(()=>{
        switch (pagina) {
          case 0:
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
              <Grid item xs={6} align="center">
                  <button className="a-n2" onClick={() => setPage(3)}>Recursos</button>
              </Grid>
            </Grid>;
          case 1:
            return (
              <Grid
              container
              direction="row"
              justify="center"
              alignItems="center" 
              spacing={5}
              style={{ minHeight: '90vh'}}> 
                {santos.map((santo, index) => {
                  return <Grid key={index} item lg={4} sm={12}> <SantoCard santo={santo}/></Grid>;
                })}
              </Grid>
            );
          case 2:
            return <div><Rally/></div>;
          case 3:
            return <div>Pagina 3</div>;
          case 4:
            return <div><AvatarGenerator initialAvatarState={avatarState}/></div>;
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
        <div>
            <Header Login={handleLogin} Signup={handleSignup} Signout={handleSignout} Home={handleHome} Avatar={()=>setPage(4)} AvatarState={avatarState}  Page={page}/>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openModal}>
                {modalBody}
            </Dialog>
            <Container bgcolor="text.primary" component="main">
                {homeContent(page)}
            </Container>
        </div>
    );
}

export default HomePage;