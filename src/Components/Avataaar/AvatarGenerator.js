//https://github.com/fangpenlin/avataaars-generator
import React, { useReducer } from "react";
import { Grid, IconButton } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import {addAvataaar} from "../../Services/database"
import Avataaar from "./Avatar";
import {
  randomlyOneOfList,
  avatar_options,
  AVATAAAR_TYPES,
  CHANGE_BUTTONS_TYPES
} from "../../Data/avataaarData";

const StyledIconButton = withStyles((theme) => ({
  root: {
    color: "rgb(0, 40, 70)",
    '&:hover': {
      color: "#33f1ff",
      boxShadow: '0 0 15px -1px #33f1ff, 0 0 12px -1px #33f1ff inset'
    }
  },
}))(IconButton);

/*const initialAvatarState = {
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
};*/

function reducer(state, action) {
  return {
    ...state,
    [action.type]: action.payload
  };
}

export default function AvatarGenerator(props) {
  const [avatarState, avatarDispatch] = useReducer(reducer, props.initialAvatarState);

  const randomGenerator = () => {
    for (var prop in AVATAAAR_TYPES) {
      if (Object.prototype.hasOwnProperty.call(AVATAAAR_TYPES, prop)) {
        var property = AVATAAAR_TYPES[prop];
        var randomProp = randomlyOneOfList(avatar_options[property]);
        avatarDispatch({
          type: property,
          payload: randomProp.id
        });
      }
    }
  };

  const handleArrowClick = (suma, type) => {
    var cant = avatar_options[type].length - 1;
    var valor = avatarState[type];
    if (suma) {
      valor++;
      if (valor > cant) valor = 0;
    } else {
      valor--;
      if (valor < 0) valor = cant;
    }
    avatarDispatch({
      type: type,
      payload: valor
    });
  };

  const handleSaveAvatar = () => {
    addAvataaar(avatarState);
  };

  const botones = () => {
    return Object.keys(AVATAAAR_TYPES).map(function (prop, index) {
      return (
        <Grid
          key={index.toString()}
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ color: '#ffffff'}}> 
          <StyledIconButton
            onClick={() => handleArrowClick(false, AVATAAAR_TYPES[prop])}
          >
            <ArrowBackIosIcon fontSize="small" />
          </StyledIconButton>
          {CHANGE_BUTTONS_TYPES[prop]}
          <StyledIconButton
            onClick={() => handleArrowClick(true, AVATAAAR_TYPES[prop])}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </StyledIconButton>
        </Grid>
      );
    });
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={5}
          >
            <Grid>
              <Avataaar
                avatarStyle={avatarState.avatarStyle}
                topType={avatarState.topType}
                accessoriesType={avatarState.accessoriesType}
                //hatColor={avatarState.hatColor}
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
            <Grid>
              <button className="a-n2" onClick={() => randomGenerator()}> Random </button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item align="center">{botones()}</Grid>
        <Grid item xs={12} lg={12} align="center">
              <button className="a-n2" onClick={() => handleSaveAvatar()}> Guardar </button>
        </Grid>
      </Grid>
    </div>
  );
}
