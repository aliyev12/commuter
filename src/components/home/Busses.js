import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";
import DirectionsIcon from "@material-ui/icons/Directions";
import DirectionsBus from "@material-ui/icons/DirectionsBus";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import React from "react";
import { RoutesContext } from "../../contexts/RoutesContext";
import { socket } from "../global/Layout";
import { useStyles } from "./Busses.styles";
import { getNewBusPredictions } from "./getNewBusPredictions";
import { LastUpdated } from "./LastUpdated";

export function Busses() {
  const classes = useStyles();
  const { routesState, dispatch } = React.useContext(RoutesContext);
  const { bussesToTrack } = routesState;
  const [busPredictions, set__busPredictions] = React.useState([]);
  const [lastUpdatedOn, set__lastUpdatedOn] = React.useState(Date.now());
  console.log("bussesToTrack = ", bussesToTrack);
  React.useEffect(() => {
    socket.emit("realtimeBusInfo", bussesToTrack, handleBusPredictions);

    let interval,
      count = 0;
    interval = setInterval(() => {
      if (count < 1000) {
        socket.emit("realtimeBusInfo", bussesToTrack, handleBusPredictions);
        count += 1;
      }
    }, 60000);

    return () => {
      clearInterval(interval);
      socket.off("realtimeBusInfo");
    };
  }, [bussesToTrack]);

  const handleBusPredictions = (busData) => {
    const newBusPredictions = getNewBusPredictions(busData);
    set__busPredictions(newBusPredictions);
    set__lastUpdatedOn(Date.now());
  };

  return (
    <>
      <Container fixed>
        <LastUpdated
          lastUpdatedOn={lastUpdatedOn}
          handleUpdate={() => {
            socket.emit("realtimeBusInfo", bussesToTrack, handleBusPredictions);
          }}
        />
        <Paper elevation={3} className={classes.paper}>
          {busPredictions.map(
            ({ predictionExists, routeID, minutes, stopName, direction }) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className={classes.accordionSummary}
                >
                  <DirectionsBus color="primary" className={classes.icon} />
                  <Typography className={classes.heading}>{routeID}</Typography>
                  {predictionExists ? (
                    <Chip
                      label={`${minutes}min`}
                      variant="outlined"
                      className={classes.timeChip}
                    />
                  ) : (
                    <NotInterestedIcon
                      className={classes.timeChip}
                      title="No preditions available"
                    />
                  )}
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                  <div className={classes.busInfoItem}>
                    <div className={classes.sectionName}>
                      <AssistantPhotoIcon className={classes.icon} />
                      <Typography>Bus stop:</Typography>
                    </div>
                    <Typography>{stopName}</Typography>
                  </div>
                  <div className={classes.busInfoItem}>
                    <div className={classes.sectionName}>
                      <DirectionsIcon className={classes.icon} />
                      <Typography>Direction:</Typography>
                    </div>
                    <Typography>{direction}</Typography>
                  </div>
                </AccordionDetails>
              </Accordion>
            )
          )}
        </Paper>
      </Container>
    </>
  );
}

// React.useEffect(() => {
//   socket.on("bussesToTrackInfo", handleBusPredictions);

//   return () => socket.off("bussesToTrackInfo");
// }, []);

// React.useEffect(() => {
//   socket.on("bussesToTrackInfo", handleBusPredictions);

//   return () => {
//     socket.off("bussesToTrackInfo");
//   };
// }, [bussesToTrack]);
