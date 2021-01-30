import React, { useState, useEffect } from 'react';
import { auth } from '../../Services/firebase';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';


import Avataaar from "../Avataaar/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledMenu = withStyles((theme) => ({
  paper: {
    backgroundColor: 'transparent',
  },
}))((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
    '&:focus': {
      backgroundColor: 'transparent',
    },
    '&:selected': {
      backgroundColor: 'transparent',
    }
  },
}))(MenuItem);

export default function Header(props) {
  const classes = useStyles();
  const [sign, setSign] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    if(auth().currentUser){
      setSign(true);
    }
    else{
      setSign(false);
    }
  },[props]);

  const handleSignout= () => {
    auth().signOut();
    setSign(false);
    props.Home()
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <StyledMenu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={() => setAnchorEl(null)}
    >
      <StyledMenuItem>
        {sign
        ? <button className="a-n2" onClick={() => {setAnchorEl(null);props.Perfil()}}>Perfil</button> 
        : <button className="a-n2" onClick={() => {setAnchorEl(null);props.Login()}}>Login</button> 
        }
      </StyledMenuItem>
      <StyledMenuItem>
        {sign
        ? <button className="a-n2" onClick={() => {setAnchorEl(null);handleSignout()}}>Logout</button> 
        : <button className="a-n2" onClick={() => {setAnchorEl(null);props.Signup()}}>Signup</button>
        }
      </StyledMenuItem>
    </StyledMenu>
  );

  return (
    <div className={classes.root}>
      <Toolbar>
          {props.Page === 0
          ? <button className="a-n2" onClick={() => props.Home()} >A LIGHT OF HOPE</button>
          : <button className="a-n2" onClick={() => props.Home()} >Atrás</button>}
          <Typography variant="h6" className={classes.title}>
          </Typography>
          <div className="navbar-nav">
                <IconButton
                  edge="end"
                  aria-label="Current user"
                  aria-haspopup="true"
                  size="small"
                  onClick={handleProfileMenuOpen}
                  style={{ color: 'white' }}
                >
                  {sign
                  ? <Avataaar
                    tamano={"pequeno"}
                    avatarStyle={props.AvatarState.avatarStyle}
                    topType={props.AvatarState.topType}
                    accessoriesType={props.AvatarState.accessoriesType}
                    hairColor={props.AvatarState.hairColor}
                    facialHairType={props.AvatarState.facialHairType}
                    facialHairColor={props.AvatarState.facialHairColor}
                    clotheType={props.AvatarState.clotheType}
                    clotheColor={props.AvatarState.clotheColor}
                    eyeType={props.AvatarState.eyeType}
                    eyebrowType={props.AvatarState.eyebrowType}
                    mouthType={props.AvatarState.mouthType}
                    skinColor={props.AvatarState.skinColor}
                  />
                  :<AccountCircle /> 
                  }
                </IconButton>
              {renderMenu}
            </div>
        </Toolbar>
    </div>
  );
}