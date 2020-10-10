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
import { RoutesContext } from "../../contexts/RoutesContext";
import { Title } from "../global/Title";

export function EditBusses() {
  const classes = useStyles();
  const history = useHistory();
  const { routesState, dispatch } = React.useContext(RoutesContext);
  const { bussesToTrack } = routesState;

  const [thCells, set__thCells] = React.useState([
    {
      name: "Bus",
      class: "",
      prop: "routeID",
    },
    {
      name: "Direction",
      class: "",
      prop: "directionName",
    },
    {
      name: "Trip Headsign",
      class: classes.tripHeadsignCol,
      prop: "tripHeadsign",
    },
    {
      name: "Stop",
      class: classes.stopCol,
      prop: "stopName",
    },
    {
      name: "Route Name",
      class: classes.routeNameCol,
      prop: "routeName",
    },
    {
      name: "Stop Routes",
      class: classes.stopRoutesCol,
      prop: "stopRoutes",
    },
  ]);

  if (!bussesToTrack) return null;

  const handleMove = (index, direction) => {
    const newBussesToTrack = [...bussesToTrack];
    if (direction === "up") {
      if (index >= 1) {
        let temp = newBussesToTrack[index - 1];
        newBussesToTrack[index - 1] = newBussesToTrack[index];
        newBussesToTrack[index] = temp;
      }
    } else {
      if (index <= newBussesToTrack.length - 2) {
        let temp = newBussesToTrack[index + 1];
        newBussesToTrack[index + 1] = newBussesToTrack[index];
        newBussesToTrack[index] = temp;
      }
    }
    dispatch({
      type: "UPDATE_BUSSES_TO_TRACK",
      payload: { bussesToTrack: newBussesToTrack },
    });
  };

  const handleDelete = (id) => {
    dispatch({
      type: "DELETE_BUSS_TO_TRACK",
      payload: { id },
    });
  };

  const generateThs = () =>
    thCells.map((th) => <TableCell className={th.class}>{th.name}</TableCell>);

  const generateTds = (busToTrack) =>
    thCells.map((th) => <TableCell>{busToTrack[th.prop]}</TableCell>);

  return (
    <div className={classes.root}>
      <Title text="Edit busses to track" />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              {generateThs()}
            </TableRow>
          </TableHead>
          <TableBody>
            {bussesToTrack.map((_busToTrack, i) => {
              const busToTrack = { ..._busToTrack };
              const joinedStopRoutes = busToTrack.stopRoutes.join(", ");
              busToTrack.stopRoutes = joinedStopRoutes;

              return (
                <TableRow key={busToTrack.id}>
                  <TableCell className={classes.moveRowBtnsCell}>
                    <ButtonGroup
                      orientation="vertical"
                      color="primary"
                      variant="text"
                      aria-label="vertical outlined primary button group"
                    >
                      <Button
                        className={clsx(classes.moveBtn)}
                        onClick={() => handleMove(i, "up")}
                        disabled={i < 1}
                      >
                        <ArrowUpwardIcon className={clsx(classes.arrow)} />
                      </Button>
                      <Button
                        className={clsx(classes.moveBtn)}
                        onClick={() => handleMove(i, "down")}
                        disabled={i > bussesToTrack.length - 2}
                      >
                        <ArrowDownwardIcon className={clsx(classes.arrow)} />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell className={classes.deleteIconBtnCell}>
                    <IconButton
                      className={classes.deleteIconBtn}
                      aria-label="delete"
                      title="Delete"
                      onClick={() => handleDelete(busToTrack.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  {generateTds(busToTrack)}
                </TableRow>
              );
            })}
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
