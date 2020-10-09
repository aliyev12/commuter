import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { useStyles } from "./EditBusses.styles";

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
