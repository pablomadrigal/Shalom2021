import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350
  },
  media: {
    height: 140
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  listRoot: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  }
}));

export default function SantoCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const santo = props.santo;
  const handleOpenCardClick = () => {
    if(openCard){
      setExpanded(false)
    }
    setOpenCard(!openCard);

  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea onClick={handleOpenCardClick}>
          <Grid container justify="center" alignItems="center">
            <Avatar
              alt={santo.nombre}
              src={santo.foto}
              className={classes.large}
            />
            <Grid item>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {santo.nombre}
                </Typography>

                <Typography color="textSecondary">{santo.subtitulo}</Typography>
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>
        <Collapse in={openCard} timeout="auto" unmountOnExit>
          <CardContent>
            {santo.resumen.map((item) => {
              return (
                <Typography variant="body2" color="textSecondary" component="p">
                  {item}
                  <br />
                  <br />
                </Typography>
              );
            })}
          </CardContent>
          <CardActions>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Collapse>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {santo.datos.map((item) => {
              return (
                <div>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.tipo}
                  </Typography>
                  {item.links!==undefined 
                  ? item.links.map((link) => {
                    return (
                      <div>
                        <a href={link}> {link}</a>
                        <br />
                        <br />
                      </div>
                    );
                  })
                  : null}

                  {item.libros!==undefined 
                  ? item.libros.map((libro) => {
                    return (
                      <div>
                        <p> {libro}</p>
                        <br />
                        <br />
                      </div>
                    );
                  })
                  : null}
                </div>
              );
            })}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
