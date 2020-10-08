import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { socket } from "./Layout";
import { NewBusInfo } from "./NewBusInfo";
import { Search } from "./Search";
import { Step } from "./Step";
import { Title } from "./Title";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
    marginBottom: "1rem",
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  busInfoPaper: {
    marginBottom: "2rem",
  },
  infoListItemName: {
    marginLeft: "5px",
  },
  stepperPaper: {
    marginBottom: "2rem",
  },
}));

const defaultInfo = {
  bus: "",
  direction: "",
  stop: "",
};

export function Add() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const [routesInfo, set__routesInfo] = React.useState([]);
  const [directionsInfo, set__directionsInfo] = React.useState([]);
  const [stopsInfo, set__stopsInfo] = React.useState([]);

  const [routeID, set__routeID] = React.useState(undefined);
  const [directionNum, set__directionNum] = React.useState(undefined);
  const [stopID, set__stopID] = React.useState(undefined);

  const [searchType, set__searchType] = React.useState("search");
  // const [newBusInfo, set__newBusInfo] = React.useState({ ...defaultInfo });
  const [newBusInfo, set__newBusInfo] = React.useState({ ...defaultInfo });
  // const [newBusInfo, set__newBusInfo] = React.useState({
  //   bus: "17H",
  //   direction: "North",
  //   stop: "Gainsborough Dr + Eastlake Dr + Bet # 5317",
  // });

  React.useEffect(() => {
    socket.emit("getRoutes", (routes) => {
      console.log("routes = ", routes);
      set__routesInfo(routes);
    });
  }, []);

  const handlesearchTypeChange = (event) => {
    set__searchType(event.target.value);
  };

  const handleNext = (step) => {
    if (step === "after-route" && routeID) {
      socket.emit("getDirections", routeID, (directions) => {
        console.log("directions = ", directions);
        set__directionsInfo(directions);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      });
    } else if (step === "after-direction" && directionNum) {
      socket.emit("getStops", routeID, directionNum, (_stops) => {
        console.log("_stops = ", _stops);
        set__stopsInfo(_stops);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      });
    } else if (step === "after-stop" && stopID) {
      console.log("success!!");
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleAdd = () => {
    // do some
  };

  const handleRouteChange = (_, choice) => {
    set__routeID(choice.value);
    set__newBusInfo({
      ...newBusInfo,
      bus: choice.value,
    });
  };

  const handleDirectionChange = (_, choice) => {
    set__directionNum(choice.value);
    set__newBusInfo({
      ...newBusInfo,
      direction: choice.name,
    });
  };

  const handleStopChange = (_, choice) => {
    if (choice && choice.value && choice.name) {
      set__stopID(choice.value);
      set__newBusInfo({
        ...newBusInfo,
        stop: choice.name,
      });
    } else {
      set__stopID(undefined);
      set__newBusInfo({
        ...newBusInfo,
        stop: "",
      });
    }
  };

  const nextLabel = activeStep === 2 ? "Finish" : "Next";

  return (
    <Container fixed>
      <div className={classes.root}>
        {newBusInfo.bus && <NewBusInfo newBusInfo={newBusInfo} />}

        <Title text="Find a Bus" />
        <Paper className={classes.stepperPaper}>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step
              stepLabel="Select bus number"
              backDisabled={activeStep === 0}
              nextDisabled={!routeID}
              handleBack={handleBack}
              handleNext={() => handleNext("after-route")}
              nextLabel={nextLabel}
            >
              <Search
                label="Bus number"
                options={routesInfo.map((x) => ({
                  name: x.routeName,
                  value: x.routeID,
                }))}
                value={routeID}
                handleChange={handleRouteChange}
              />
            </Step>

            <Step
              stepLabel="Select direction"
              backDisabled={activeStep === 0}
              nextDisabled={!directionNum}
              handleBack={handleBack}
              handleNext={() => handleNext("after-direction")}
              nextLabel={nextLabel}
            >
              <Search
                label="Bus direction"
                options={directionsInfo.map((x) => ({
                  name: x.directionName,
                  value: x.directionNum,
                }))}
                value={directionNum}
                handleChange={handleDirectionChange}
              />
            </Step>

            <Step
              stepLabel="Select bus stop"
              backDisabled={activeStep === 0}
              nextDisabled={!stopID}
              handleBack={handleBack}
              handleNext={() => handleNext("after-stop")}
              nextLabel={nextLabel}
            >
              <Search
                label="Bus stop"
                options={stopsInfo.map((x) => ({
                  name: x.stopName,
                  value: x.stopID,
                }))}
                value={stopID}
                handleChange={handleStopChange}
              />
            </Step>
          </Stepper>
        </Paper>
        {activeStep === 3 && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button
              onClick={handleAdd}
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    </Container>
  );
}
