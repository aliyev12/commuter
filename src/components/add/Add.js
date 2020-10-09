import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React from "react";
import { useHistory } from "react-router-dom";
import { RoutesContext } from "../../contexts/RoutesContext";
import { socket } from "../global/Layout";
import { Title } from "../global/Title";
import { NewBusInfo } from "./NewBusInfo";
import { Search } from "./Search";
import { useStyles } from "./Add.styles";

const defaultInfo = {
  routeID: "",
  routeName: "",
  directionName: "",
  directionNum: "",
  tripHeadsign: "",
  stopID: "",
  stopName: "",
  stopRoutes: [],
};

export function Add() {
  const classes = useStyles();
  const history = useHistory();
  const { routesState, dispatch } = React.useContext(RoutesContext);
  const { routesInfo, directionsInfo, stopsInfo } = routesState;

  const [activeStep, setActiveStep] = React.useState(0);

  const [routeID, set__routeID] = React.useState(undefined);
  const [routeInputValue, set__routeInputValue] = React.useState("");

  const [directionNum, set__directionNum] = React.useState(undefined);
  const [stopID, set__stopID] = React.useState(undefined);

  const [newBusInfo, set__newBusInfo] = React.useState({ ...defaultInfo });

  React.useEffect(() => {
    socket.emit("getRoutes", (_routes) => {
      console.log("routes = ", _routes);
      dispatch({ type: "ADD_ROUTES_INFO", payload: { routesInfo: _routes } });
    });
  }, []);

  const handleNext = (step) => {
    if (step === "after-route" && routeID) {
      socket.emit("getDirections", routeID, (_directions) => {
        console.log("_directions = ", _directions);
        dispatch({
          type: "ADD_DIRECTIONS_INFO",
          payload: { directionsInfo: _directions },
        });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      });
    } else if (step === "after-direction" && directionNum) {
      socket.emit("getStops", routeID, directionNum, (_stops) => {
        console.log("_stops = ", _stops);
        dispatch({ type: "ADD_STOPS_INFO", payload: { stopsInfo: _stops } });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      });
    } else if (step === "after-stop" && stopID) {
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
    dispatch({ type: "ADD_NEW_BUS_TO_TRACK", payload: { newBusInfo } });
    handleReset();
    history.push("/");
  };

  const handleRouteChange = (_, choice) => {
    if (choice && choice.value && choice.name) {
      const foundRoute = routesInfo.find((x) => x.routeID === choice.value);
      set__routeID(choice.value);
      set__newBusInfo({
        ...newBusInfo,
        ...foundRoute,
      });
    } else {
      set__routeID(undefined);
      set__newBusInfo({
        ...newBusInfo,
        routeID: "",
        routeName: "",
      });
    }
  };

  const handleRouteInputChange = (_, newInput) => {
    set__routeInputValue(newInput);
  };

  const handleDirectionChange = (_, choice) => {
    if (choice && choice.value && choice.name) {
      const foundDirection = directionsInfo.find(
        (x) => x.directionNum === choice.value
      );
      set__directionNum(choice.value);
      set__newBusInfo({
        ...newBusInfo,
        ...foundDirection,
      });
    } else {
      set__directionNum(undefined);
      set__newBusInfo({
        ...newBusInfo,
        directionName: "",
        directionNum: "",
        tripHeadsign: "",
      });
    }
  };

  const handleStopChange = (_, choice) => {
    if (choice && choice.value && choice.name) {
      const foundStop = stopsInfo.find((x) => x.stopID === choice.value);
      set__stopID(choice.value);
      set__newBusInfo({
        ...newBusInfo,
        ...foundStop,
      });
    } else {
      set__stopID(undefined);
      set__newBusInfo({
        ...newBusInfo,
        stopID: "",
        stopName: "",
        stopRoutes: [],
      });
    }
  };

  return (
    <Container fixed>
      <div className={classes.root}>
        <NewBusInfo
          newBusInfo={{
            bus: newBusInfo.routeID,
            direction: newBusInfo.directionName
              ? `${newBusInfo.directionName} → ${newBusInfo.tripHeadsign}`
              : "",
            stop: newBusInfo.stopName,
          }}
        />

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
                  {routesInfo ? (
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
                  ) : null}
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
                  {directionsInfo ? (
                    <Search
                      label="Bus direction"
                      options={directionsInfo.map((x) => ({
                        name: x.directionName,
                        value: x.directionNum,
                      }))}
                      value={directionNum}
                      handleChange={handleDirectionChange}
                    />
                  ) : null}
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
                  {stopsInfo ? (
                    <Search
                      label="Bus stop"
                      options={stopsInfo.map((x) => ({
                        name: x.stopName,
                        value: x.stopID,
                      }))}
                      value={stopID}
                      handleChange={handleStopChange}
                    />
                  ) : null}
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
