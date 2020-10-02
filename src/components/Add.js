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
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { SelectChoice } from "./SelectChoice";
import { Search } from "./Search";

const useStyles = makeStyles((theme) => ({
  root: {
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
}));

export function Add() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [searchType, set__searchType] = React.useState("search");

  const handlesearchTypeChange = (event) => {
    set__searchType(event.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container fixed>
      <div className={classes.root}>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <div>
                  <strong>Bus:</strong>
                  <span>17H</span>
                </div>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemText
              primary={
                <div>
                  <strong>Direction:</strong>
                  <span>North</span>
                </div>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemText
              primary={
                <div>
                  <strong>Stop:</strong>
                  <span>Gainsborough Dr + Eastlake Dr + Bet # 5317</span>
                </div>
              }
            />
          </ListItem>
        </List>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>Select bus number</StepLabel>
            <StepContent>
              <Typography>
                <Search />
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
            <StepLabel>Select direction</StepLabel>
            <StepContent>
              <Typography>
                <Search />
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
                <Search />
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
        {activeStep === 3 && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    </Container>
  );
}

{
  /* <SelectChoice
searchType={searchType}
handlesearchTypeChange={handlesearchTypeChange}
/> */
}
