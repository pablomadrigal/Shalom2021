import React from "react";
import Avatar from "avataaars";

import { avatar_options } from "../../Data/avataaarData";

const avatar = (props) => {

  var ancho = '200px';
  var alto = '200px';
  
  if(props.tamano === "pequeno"){
    ancho = '60px';
    alto = '60px';
  }
  
  return (
    <Avatar
    style={{width: ancho, height: alto}}
      avatarStyle={avatar_options.avatarStyle[props.avatarStyle].label}
      topType={avatar_options.topType[props.topType].label}
      accessoriesType={
        avatar_options.accessoriesType[props.accessoriesType].label
      }
      //hatColor={avatar_options.hatColor[props.hatColor].label}
      hairColor={avatar_options.hairColor[props.hairColor].label}
      facialHairType={avatar_options.facialHairType[props.facialHairType].label}
      facialHairColor={
        avatar_options.facialHairColor[props.facialHairColor].label
      }
      clotheType={avatar_options.clotheType[props.clotheType].label}
      clotheColor={avatar_options.clotheColor[props.clotheColor].label}
      eyeType={avatar_options.eyeType[props.eyeType].label}
      eyebrowType={avatar_options.eyebrowType[props.eyebrowType].label}
      mouthType={avatar_options.mouthType[props.mouthType].label}
      skinColor={avatar_options.skinColor[props.skinColor].label}
    />
  );
};

export default avatar;
