import Button from "@material-ui/core/Button";
import _Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
}));

export function Step({
  children,
  stepLabel,
  backDisabled,
  nextDisabled,
  handleBack,
  handleNext,
  nextLabel,
}) {
  const classes = useStyles();

  return (
    <_Step>
      <StepLabel>{stepLabel}</StepLabel>
      <StepContent>
        <Typography>{children}</Typography>
        <div className={classes.actionsContainer}>
          <div>
            <Button
              disabled={backDisabled}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={nextDisabled}
              onClick={handleNext}
              className={classes.button}
            >
              {nextLabel}
            </Button>
          </div>
        </div>
      </StepContent>
    </_Step>
  );
}
