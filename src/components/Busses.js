import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import DirectionsBus from "@material-ui/icons/DirectionsBus";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

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
