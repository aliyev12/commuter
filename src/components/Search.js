import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const useStyles = makeStyles({
  root: {
    marginTop: "2rem",
  },
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function Search({
  label = "Bus number",
  options = [],
  value,
  handleChange,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option) => option.name}
        // getOptionSelected={(option, value) => option.name === value.name}
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
      />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { name: "The Shawshank Redemption", value: 1994 },
  { name: "The Godfather", value: 1972 },
];
