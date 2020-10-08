import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DirectionsIcon from "@material-ui/icons/Directions";
import AssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Title } from "./Title";
import { socket } from "./Layout";
import { SelectChoice } from "./SelectChoice";
import { Search } from "./Search";
import { NewBusInfo } from "./NewBusInfo";

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

  const [routeID, set__routeID] = React.useState();
  const [searchType, set__searchType] = React.useState("search");
  // const [newBusInfo, set__newBusInfo] = React.useState({ ...defaultInfo });
  const [newBusInfo, set__newBusInfo] = React.useState({
    bus: "17H",
    direction: "North",
    stop: "Gainsborough Dr + Eastlake Dr + Bet # 5317",
  });

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
  };

  return (
    <Container fixed>
      <div className={classes.root}>
        {newBusInfo.bus && <NewBusInfo newBusInfo={newBusInfo} />}

        <Title text="Find a Bus" />
        <Paper className={classes.stepperPaper}>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Select bus number</StepLabel>
              <StepContent>
                <Typography>
                  {/* routeID: "16C", routeName */}
                  <Search
                    label="Bus number"
                    options={routesInfo.map((x) => ({
                      name: x.routeName,
                      value: x.routeID,
                    }))}
                    value={routeID}
                    handleChange={handleRouteChange}
                  />
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
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
                  <Search label="Bus direction" />
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
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
                  <Search label="Bus stop" />
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
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
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    </Container>
  );
}
