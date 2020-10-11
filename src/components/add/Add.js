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
import { SelectChoice } from "./SelectChoice";
import { Alert } from "./Alert";

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

const noDirectionsAlert = {
  title: "Directions",
  body:
    "Sorry, at this moment, no directions information has been provided by WMATA. Try changing type of results by clicking on one of the radio buttons below.",
};

const noStopsAlert = {
  title: "Stops",
  body:
    "Sorry, at this moment, no stops information has been provided by WMATA. Try changing type of results by clicking on one of the radio buttons below.",
};

export function Add() {
  const classes = useStyles();
  const history = useHistory();
  const { routesState, dispatch } = React.useContext(RoutesContext);
  const { routesInfo, directionsInfo, stopsInfo } = routesState;

  const [activeStep, setActiveStep] = React.useState(0);

  const [routeID, set__routeID] = React.useState(undefined);
  const [routeIDInput, set__routeIDInput] = React.useState("");
  const [directionNum, set__directionNum] = React.useState(undefined);
  const [directionNumInput, set__directionNumInput] = React.useState("");
  const [stopID, set__stopID] = React.useState(undefined);
  const [stopIDInput, set__stopIDInput] = React.useState("");

  const [newBusInfo, set__newBusInfo] = React.useState({ ...defaultInfo });
  const [resultsType, set__resultsType] = React.useState("complete"); // complete or current
  const [showAlert, set__showAlert] = React.useState(false);
  const [alertContent, set__alertContent] = React.useState({
    title: "",
    body: "",
  });

  React.useEffect(() => {
    socket.emit("getRoutes", resultsType, (_routes) => {
      // console.log("routes = ", _routes);
      dispatch({ type: "ADD_ROUTES_INFO", payload: { routesInfo: _routes } });
    });
  }, [resultsType]);

  const handleNext = (step) => {
    if (step === "after-route" && routeID) {
      socket.emit("getDirections", resultsType, routeID, (_directions) => {
        // console.log("_directions = ", _directions);

        if (!_directions.length) {
          set__alertContent(noDirectionsAlert);
          set__showAlert(true);
        } else {
          dispatch({
            type: "ADD_DIRECTIONS_INFO",
            payload: { directionsInfo: _directions },
          });
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      });
    } else if (step === "after-direction" && directionNum) {
      socket.emit("getStops", resultsType, routeID, directionNum, (_stops) => {
        // console.log("_stops = ", _stops);
        if (!_stops.length) {
          set__alertContent(noStopsAlert);
          set__showAlert(true);
        } else {
          dispatch({ type: "ADD_STOPS_INFO", payload: { stopsInfo: _stops } });
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
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
    set__routeIDInput("");
    set__directionNumInput("");
    set__stopIDInput("");
    set__newBusInfo({ ...defaultInfo });
  };

  const handleAdd = () => {
    dispatch({ type: "ADD_NEW_BUS_TO_TRACK", payload: { newBusInfo } });
    handleReset();
    history.push("/");
  };

  const handleChange = ({ choice, resetProps, items, idProp, setter }) => {
    let newVal = undefined;
    let foundItem = { ...resetProps };
    if (choice && choice.value) {
      foundItem = items.find((x) => x[idProp] === choice.value);
      newVal = choice.value;
    }
    setter(newVal);
    set__newBusInfo({
      ...newBusInfo,
      ...foundItem,
    });
  };

  const handleResultsTypeChange = (event) => {
    handleReset();
    const newResultsType = event.target.value;
    set__resultsType(newResultsType);
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
                      inputValue={routeIDInput}
                      handleInputChange={(_, v) => set__routeIDInput(v)}
                      handleChange={(_, c) =>
                        handleChange({
                          choice: c,
                          resetProps: { routeID: "", routeName: "" },
                          items: routesInfo,
                          idProp: "routeID",
                          setter: set__routeID,
                        })
                      }
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
                      inputValue={directionNumInput}
                      handleInputChange={(_, v) => set__directionNumInput(v)}
                      handleChange={(_, c) =>
                        handleChange({
                          choice: c,
                          resetProps: {
                            directionName: "",
                            directionNum: "",
                            tripHeadsign: "",
                          },
                          items: directionsInfo,
                          idProp: "directionNum",
                          setter: set__directionNum,
                        })
                      }
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
                      inputValue={stopIDInput}
                      handleInputChange={(_, v) => set__stopIDInput(v)}
                      handleChange={(_, c) =>
                        handleChange({
                          choice: c,
                          resetProps: {
                            stopID: "",
                            stopName: "",
                            stopRoutes: [],
                          },
                          items: stopsInfo,
                          idProp: "stopID",
                          setter: set__stopID,
                        })
                      }
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

        <SelectChoice
          searchType={resultsType}
          handlesearchTypeChange={handleResultsTypeChange}
        />
      </div>
      <Alert
        showAlert={showAlert}
        alertContent={alertContent}
        handleAlertOpen={() => set__showAlert(true)}
        handleAlertClose={() => set__showAlert(false)}
        handleOkClick={() => {
          set__showAlert(false);
          handleReset();
        }}
      />
    </Container>
  );
}
