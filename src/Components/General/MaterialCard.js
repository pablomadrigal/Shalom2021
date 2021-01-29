import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 150
  },
  media: {
    width: 150
  }
}));

export default function MaterialCard(props) {
  const classes = useStyles();
  const material = props.material;

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea onClick={() => openInNewTab(material.link)}>
          <img
            className={classes.media}
            alt={material.foto}
            src={material.foto}
          />
          <CardContent>
            <Typography gutterBottom variant="p" component="h2">
              {material.nombre}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
