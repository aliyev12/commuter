import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { red } from "@material-ui/core/colors";

import React from "react";
import { socket } from "./Layout";
import { NewBusInfo } from "./NewBusInfo";
import { Search } from "./Search";
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
  resetButton: {
    marginTop: "24px",
    marginLeft: "24px",
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
  const [routeInputValue, set__routeInputValue] = React.useState("");

  const [directionNum, set__directionNum] = React.useState(undefined);
  const [stopID, set__stopID] = React.useState(undefined);

  const [newBusInfo, set__newBusInfo] = React.useState({ ...defaultInfo });

  React.useEffect(() => {
    socket.emit("getRoutes", (routes) => {
      console.log("routes = ", routes);
      set__routesInfo(routes);
    });
  }, []);

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

  const handleReset = () => {
    setActiveStep(0);
    set__routeID(undefined);
    set__directionNum(undefined);
    set__stopID(undefined);
    set__newBusInfo({ ...defaultInfo });
  };

  const handleAdd = () => {
    // do some
  };

  const handleRouteChange = (_, choice) => {
    if (choice && choice.value && choice.name) {
      set__routeID(choice.value);
      set__newBusInfo({
        ...newBusInfo,
        bus: choice.value,
      });
    } else {
      set__routeID(undefined);
      set__newBusInfo({
        ...newBusInfo,
        bus: "",
      });
    }
  };

  const handleRouteInputChange = (_, newInput) => {
    set__routeInputValue(newInput);
  };

  const handleDirectionChange = (_, choice) => {
    if (choice && choice.value && choice.name) {
      set__directionNum(choice.value);
      set__newBusInfo({
        ...newBusInfo,
        direction: choice.name,
      });
    } else {
      set__directionNum(undefined);
      set__newBusInfo({
        ...newBusInfo,
        direction: "",
      });
    }
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

  return (
    <Container fixed>
      <div className={classes.root}>
        {newBusInfo.bus && <NewBusInfo newBusInfo={newBusInfo} />}

        <Title text="Find a Bus" />

        <Paper className={classes.stepperPaper}>
          <Button
            onClick={handleReset}
            variant="contained"
            color="primary"
            className={classes.resetButton}
            startIcon={<RotateLeftIcon />}
          >
            Reset
          </Button>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Select bus number</StepLabel>
              <StepContent>
                <Typography>
                  <Search
                    label="Bus number"
                    options={routesInfo.map((x) => ({
                      name: x.routeName,
                      value: x.routeID,
                    }))}
                    value={routeID}
                    inputValue={routeInputValue}
                    handleChange={handleRouteChange}
                    handleInputChange={handleRouteInputChange}
                  />
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!routeID}
                      onClick={() => handleNext("after-route")}
                      className={classes.button}
                    >
                      {activeStep === 2 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>Select direction</StepLabel>
              <StepContent>
                <Typography>
                  <Search
                    label="Bus direction"
                    options={directionsInfo.map((x) => ({
                      name: x.directionName,
                      value: x.directionNum,
                    }))}
                    value={directionNum}
                    handleChange={handleDirectionChange}
                  />
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!directionNum}
                      onClick={() => handleNext("after-direction")}
                      className={classes.button}
                    >
                      {activeStep === 2 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Select bus stop</StepLabel>
              <StepContent>
                <Typography>
                  <Search
                    label="Bus stop"
                    options={stopsInfo.map((x) => ({
                      name: x.stopName,
                      value: x.stopID,
                    }))}
                    value={stopID}
                    handleChange={handleStopChange}
                  />
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!stopID}
                      onClick={() => handleNext("after-stop")}
                      className={classes.button}
                    >
                      {activeStep === 2 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
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
          </Paper>
        )}
      </div>
    </Container>
  );
}

// const [newBusInfo, set__newBusInfo] = React.useState({
//   bus: "17H",
//   direction: "North",
//   stop: "Gainsborough Dr + Eastlake Dr + Bet # 5317",
// });
