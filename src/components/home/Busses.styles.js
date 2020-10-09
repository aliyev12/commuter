import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    marginTop: "2rem",
  },
  accordionSummary: {
    "& .MuiAccordionSummary-content": {
      display: "flex",
      alignItems: "center",
    },
  },
  busInfoItem: {
    "&:first-child": {
      marginBottom: "1rem",
    },
  },
  icon: {
    marginRight: "5px",
  },
  timeChip: {
    marginLeft: "auto",
  },
  accordionDetails: {
    flexDirection: "column",
  },
  sectionName: {
    display: "flex",
  },
}));
