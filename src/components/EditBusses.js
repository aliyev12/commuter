import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Table from "@material-ui/core/Table";
import clsx from "clsx";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import NavigationIcon from "@material-ui/icons/Navigation";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    marginTop: "2rem",
  },
  table: {
    minWidth: 650,
  },
  deleteIconBtnCell: {
    width: "6px",
    padding: "0 3px",
  },
  moveRowBtnsCell: {
    width: "6px",
    padding: "0 3px",
  },
  deleteIconBtn: {
    color: red.A400,
    // padding: "3px",
  },
  moveBtn: {
    padding: "5px",
    minWidth: "20px",
  },
  arrow: {
    fontSize: "1rem",
  },
  addNewBtn: {
    marginTop: "2rem",
  },
});

function createData(bus, direction, stop) {
  return { bus, direction, stop };
}

const rows = [
  createData("17H", "North", "Guinea Rd + Burke Rd"),
  createData("17L", "North", "Gainsborough Dr + Eastlake Dr + Bet # 5317"),
  createData("17K", "North", "Gainsborough Dr + Commonwealth Blvd"),
];

export function EditBusses() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Bus</TableCell>
              <TableCell>Direction</TableCell>
              <TableCell>Stop</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.bus}>
                <TableCell className={classes.moveRowBtnsCell}>
                  <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    variant="text"
                    aria-label="vertical outlined primary button group"
                  >
                    <Button className={clsx(classes.moveBtn)}>
                      <ArrowUpwardIcon className={clsx(classes.arrow)} />
                    </Button>
                    <Button className={clsx(classes.moveBtn)}>
                      <ArrowDownwardIcon className={clsx(classes.arrow)} />
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell className={classes.deleteIconBtnCell}>
                  <IconButton
                    className={classes.deleteIconBtn}
                    aria-label="delete"
                    title="Delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{row.bus}</TableCell>
                <TableCell>{row.direction}</TableCell>
                <TableCell>{row.stop}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        onClick={() => history.push("/add")}
        variant="contained"
        color="primary"
        className={classes.addNewBtn}
        startIcon={<AddIcon />}
      >
        Add new
      </Button>
    </div>
  );
}
