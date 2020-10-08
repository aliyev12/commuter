import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";
import DirectionsIcon from "@material-ui/icons/Directions";
import DirectionsBus from "@material-ui/icons/DirectionsBus";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { RoutesContext } from "../contexts/RoutesContext";
import { socket } from "./Layout";

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

/*
directionName: "EAST"
directionNum: "0"
routeID: "16G"
routeName: "16G - DINWIDDIE+COLUMBIA - PENTAGON CITY"
stopID: "6001349"
stopName: "COLUMBIA PK + S FOUR MILE RUN DR"
stopRoutes: (5) ["16A", "16C", "16E", "16G", "16H"]
tripHeadsign: "PENTAGON CITY - PIKE RIDE"
*/

export function Busses() {
  const classes = useStyles();
  const { routesState, dispatch } = React.useContext(RoutesContext);
  const { bussesToTrack } = routesState;
  const [busPredictions, set__busPredictions] = React.useState([]);

  const handleBusPredictions = (busData) => {
    console.log("bussesToTrack = ", bussesToTrack);

    /*
      directionName: "EAST"
      directionNum: "0"
      routeID: "1C*2"
      routeName: "1C - FAIR OAKS MALL - DUNN LORING"
      stopID: "5004693"
      stopName: "FAIRFAX GOVERNMENT CTR RDWY + BUS SHELTER #1"
      stopRoutes: (3) ["1C*1", "1C*2", "1C/"]
      tripHeadsign: "DUNN LORING STATION"
    */
    const trackedRouteIds = bussesToTrack.map((r) => r.routeID);
    busData.forEach((item) => {
      const itemPredictions = item.Predictions;
      const foundPrediction = itemPredictions.forEach((pred) => {
        const newPrediction = {
          routeID: "",
          minutes: 0,
          stopName: item.StopName,
          direction: "",
        };

        if (trackedRouteIds.includes(pred.RouteID)) {
          // push a new prediction into newBusPredictions array
        }
      });
    });
    const x = [
      {
        StopName: "Monument Dr + Fair Lakes Pkwy",
        Predictions: [
          {
            RouteID: "1C",
            DirectionText: "East to Dunn Loring Station",
            DirectionNum: "0",
            Minutes: 16,
            VehicleID: "7201",
            TripID: "1609754020",
          },
        ],
      },
      {
        StopName: "N Glebe Rd + Wilson Blvd",
        Predictions: [
          {
            RouteID: "25B",
            DirectionText: "South to Van Dorn St Station",
            DirectionNum: "1",
            Minutes: 10,
            VehicleID: "2916",
            TripID: "1620155020",
          },
          {
            RouteID: "25B",
            DirectionText: "South to Southern Towers",
            DirectionNum: "1",
            Minutes: 20,
            VehicleID: "2940",
            TripID: "1620154020",
          },
          {
            RouteID: "25B",
            DirectionText: "South to Van Dorn St Station",
            DirectionNum: "1",
            Minutes: 36,
            VehicleID: "3106",
            TripID: "1620153020",
          },
        ],
      },
    ];

    const newBusPredictions = [
      {
        routeID: "17H",
        minutes: 9,
        stopName: "Georgia Ave + New Hampshire Ave",
        direction: "North to Silver Spring Station",
      },
      {
        routeID: "17K",
        minutes: 9,
        stopName: "Georgia Ave + New Hampshire Ave",
        direction: "North to Silver Spring Station",
      },
      {
        routeID: "17L",
        minutes: 9,
        stopName: "Georgia Ave + New Hampshire Ave",
        direction: "North to Silver Spring Station",
      },
    ];

    set__busPredictions(newBusPredictions);
  };

  React.useEffect(() => {
    const stopIDs = bussesToTrack.map((x) => x.stopID);
    socket.emit("realtimeBusInfo", stopIDs, handleBusPredictions);
    return () => socket.off("realtimeBusInfo");
  }, []);

  console.log("routesState = ", routesState);

  return (
    <>
      <Container fixed>
        <Paper elevation={3} className={classes.paper}>
          {busPredictions.map(({ routeID, minutes, stopName, direction }) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.accordionSummary}
              >
                <DirectionsBus color="primary" className={classes.icon} />
                <Typography className={classes.heading}>{routeID}</Typography>
                <Chip
                  label={`${minutes}min`}
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
          ))}
        </Paper>
      </Container>
    </>
  );
}
