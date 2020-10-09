import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles({
  root: {
    marginTop: "2rem",
  },
});

export function SelectChoice({ searchType, handlesearchTypeChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="select options"
          name="selectOptions"
          value={searchType}
          onChange={handlesearchTypeChange}
        >
          <FormControlLabel value="search" control={<Radio />} label="Search" />
          <FormControlLabel
            value="select"
            control={<Radio />}
            label="Select from list"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
