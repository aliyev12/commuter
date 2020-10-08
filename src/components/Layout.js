import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import socketIOClient from "socket.io-client";
import clsx from "clsx";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));

var socket;

function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();

  const [open, set__open] = React.useState(false);

  const toggleDrawer = (val) => (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) return;
    set__open(val);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => history.push("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem button onClick={() => history.push("/edit")}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary={"Edit List"} />
        </ListItem>
        <ListItem button onClick={() => history.push("/add")}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Add new item"} />
        </ListItem>
      </List>
    </div>
  );

  socket = socketIOClient(process.env.REACT_APP_SOCKETIO_ENDPOINT);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Commuter
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        {list("left")}
      </Drawer>
      {children}
    </div>
  );
}

export { Layout, socket };
