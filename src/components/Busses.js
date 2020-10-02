import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import DirectionsBus from "@material-ui/icons/DirectionsBus";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function Busses() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemIcon>
          <DirectionsBus color="primary" />
        </ListItemIcon>
        <ListItemText primary="17H" secondary="Jan 9, 2014" />
        <ListItemSecondaryAction>
          <Chip label="25min" variant="outlined" />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <DirectionsBus color="primary" />
        </ListItemIcon>
        <ListItemText primary="17H" secondary="Jan 9, 2014" />
        <ListItemSecondaryAction>
          <Chip label="25min" variant="outlined" />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <DirectionsBus color="primary" />
        </ListItemIcon>
        <ListItemText primary="17H" secondary="Jan 9, 2014" />
        <ListItemSecondaryAction>
          <Chip label="25min" variant="outlined" />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
