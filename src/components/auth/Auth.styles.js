import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",

    // width: "100%",
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  paper: {
    // marginTop: "2rem",
    padding: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& .MuiFormControl-root": {
      marginBottom: "20px",
    },
  },
  submitBtn: {
    marginTop: "20px",
  },
  signUpText: {
    marginTop: "20px",
  },
  oAuthOrText: {
    marginTop: "30px",
  },
}));
