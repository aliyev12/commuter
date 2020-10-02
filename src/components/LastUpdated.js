import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SyncIcon from "@material-ui/icons/Sync";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1rem",
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      //   height: theme.spacing(16),
    },
  },
  paper: {
    padding: "6px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  updateBtn: {
    padding: "5px",
  },
}));

export function LastUpdated() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        {/* <Typography variant="h6" component="h1">
              Repeat
            </Typography> */}
        <Typography>Last updated on 10/30 at 3:32 PM</Typography>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          className={classes.updateBtn}
        >
          <SyncIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
