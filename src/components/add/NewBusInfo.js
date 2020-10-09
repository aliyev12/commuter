import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import AssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";
import DirectionsIcon from "@material-ui/icons/Directions";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import { Title } from "../global/Title";

const useStyles = makeStyles(() => ({
  busInfoPaper: {
    marginBottom: "2rem",
  },
  infoListItemName: {
    marginLeft: "5px",
  },
}));

export function NewBusInfo({ newBusInfo }) {
  const classes = useStyles();
  if (!newBusInfo.bus) return null;

  return (
    <>
      <Title text="New Bus Info" />
      <Paper className={classes.busInfoPaper}>
        <List>
          <ListItem>
            <ListItemIcon>
              <DirectionsBusIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <div>
                  <strong>Bus:</strong>
                  <span className={classes.infoListItemName}>
                    {newBusInfo.bus}
                  </span>
                </div>
              }
            />
          </ListItem>
          {newBusInfo.direction && (
            <>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemIcon>
                  <DirectionsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div>
                      <strong>Direction:</strong>
                      <span className={classes.infoListItemName}>
                        {newBusInfo.direction}
                      </span>
                    </div>
                  }
                />
              </ListItem>
            </>
          )}
          {newBusInfo.stop && (
            <>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemIcon>
                  <AssistantPhotoIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div>
                      <strong>Stop:</strong>
                      <span className={classes.infoListItemName}>
                        {newBusInfo.stop}
                      </span>
                    </div>
                  }
                />
              </ListItem>
            </>
          )}
        </List>
      </Paper>
    </>
  );
}
