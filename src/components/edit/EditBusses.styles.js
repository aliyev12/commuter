import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
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
