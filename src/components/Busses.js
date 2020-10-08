import React from "react";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import DirectionsBus from "@material-ui/icons/DirectionsBus";
import { socket } from "./Layout";
import clsx from "clsx";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DirectionsIcon from "@material-ui/icons/Directions";
import AssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    marginTop: "2rem",
  },
  accordionSummary: {
    "& .MuiAccordionSummary-content": {
      display: "flex",
      alignItems: "center",
    },
  },
  busInfoItem: {
    "&:first-child": {
      marginBottom: "1rem",
    },
  },
  icon: {
    marginRight: "5px",
  },
  timeChip: {
    marginLeft: "auto",
  },
  accordionDetails: {
    flexDirection: "column",
  },
  sectionName: {
    display: "flex",
  },
}));

export function Busses() {
  const classes = useStyles();
  const [busInfo, set__busInfo] = React.useState({
    StopName: "Georgia Ave + New Hampshire Ave",
    Predictions: [
      {
        RouteID: "70",
        DirectionText: "North to Silver Spring Station",
        DirectionNum: "0",
        Minutes: 0,
        VehicleID: "7353",
        TripID: "1563695070",
      },
    ],
  });

  React.useEffect(() => {
    // socket.emit("realtimeBusInfo", (res) => {
    //   console.log("res = ", res);
    // set__busInfo(res);
    // });

    return () => socket.off("realtimeBusInfo");
  }, []);

  return (
    <>
      <Container fixed>
        <Paper elevation={3} className={classes.paper}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.accordionSummary}
            >
              <DirectionsBus color="primary" className={classes.icon} />
              <Typography className={classes.heading}>
                {busInfo.Predictions[0].RouteID}
              </Typography>
              <Chip
                label={`${busInfo.Predictions[0].Minutes}min`}
                variant="outlined"
                className={classes.timeChip}
              />
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <div className={classes.busInfoItem}>
                <div className={classes.sectionName}>
                  <AssistantPhotoIcon className={classes.icon} />
                  <Typography>Bus stop:</Typography>
                </div>
                <Typography>{busInfo.StopName}</Typography>
              </div>
              <div className={classes.busInfoItem}>
                <div className={classes.sectionName}>
                  <DirectionsIcon className={classes.icon} />
                  <Typography>Direction:</Typography>
                </div>
                <Typography>{busInfo.Predictions[0].DirectionText}</Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Container>
    </>
  );
}
