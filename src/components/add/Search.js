import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";

const useStyles = makeStyles({
  root: {
    marginTop: "2rem",
  },
});

export function Search({
  label = "Bus number",
  options = [],
  value,
  inputValue,
  handleChange,
  handleInputChange,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option) => option.name}
        // getOptionSelected={(option, value) => {
        //   if (option.name === value.name) {
        //     console.log("option = ", option);
        //     console.log("value = ", value);
        //   }
        //   return option.name === value.name;
        // }}
        value={value}
        inputValue={inputValue}
        onChange={handleChange}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
      />
    </div>
  );
}
