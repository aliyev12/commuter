import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    marginTop: "2rem",
  },
  infoBtn: {},
});

export function SelectChoice({ searchType, handlesearchTypeChange }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Select type of results
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <>
                  <p>
                    Complete list is list of all routes and their information
                    that is retrieved form WMATA at certain days/times when
                    WMATA usually provides information on most of the routes.
                  </p>
                  <p>
                    The second option is using the current information from
                    WMATA (Based on current availability). This is not
                    recomended because depending of the time of the day and day
                    of the week, much of the information on certain routes will
                    be missing.
                  </p>
                </>
              }
            >
              <IconButton
                onClick={handleTooltipOpen}
                aria-label="delete"
                className={classes.infoBtn}
              >
                <ContactSupportIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
        </FormLabel>
        <RadioGroup
          aria-label="select options"
          name="selectOptions"
          value={searchType}
          onChange={handlesearchTypeChange}
        >
          <FormControlLabel
            value="complete"
            control={<Radio />}
            label="Complete list (recommended)"
          />
          <FormControlLabel
            value="current"
            control={<Radio />}
            label="Based on current availability"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
