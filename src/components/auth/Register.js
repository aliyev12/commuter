import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useStyles } from "./Auth.styles";
import Container from "@material-ui/core/Container";
import { Title } from "../global/Title";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Name is too short")
    .max(200, "Name is too long")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(12, "Password is too short")
    .max(200, "Password is too long")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(12, "Password is too short")
    .max(200, "Password is too long")
    .required("Confirmation password is required"),
});

export function Register() {
  const classes = useStyles();
  const [showPassword, set__showPassword] = React.useState({
    password: false,
    passwordConfirm: false,
  });

  return (
    <Container fixed>
      <div className={classes.root}>
        <Title text="Sign up for a new account" />
        <Paper elevation={3} className={classes.paper}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("values = ", values);

              setTimeout(() => {
                setSubmitting(false);
                alert(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {({ submitForm, isSubmitting, errors, touched }) => (
              <Form className={classes.form}>
                <Field
                  component={TextField}
                  name="name"
                  type="text"
                  label="Name"
                />
                {errors.name && touched.name ? <div>{errors.name}</div> : null}

                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
                <div className={classes.passwordFieldWrapper}>
                  <Field
                    className={classes.passwordField}
                    component={TextField}
                    type={showPassword.password ? "text" : "password"}
                    name="password"
                    label="Password"
                  />
                  <IconButton
                    aria-label="show-hide-password"
                    className={classes.showHideBtn}
                    onClick={() =>
                      set__showPassword({
                        ...showPassword,
                        password: !showPassword.password,
                      })
                    }
                  >
                    {showPassword.password ? (
                      <VisibilityOffIcon fontSize="small" />
                    ) : (
                      <VisibilityIcon fontSize="small" />
                    )}
                  </IconButton>
                </div>

                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}

                <div className={classes.passwordFieldWrapper}>
                  <Field
                    className={classes.passwordField}
                    component={TextField}
                    type={showPassword.passwordConfirm ? "text" : "password"}
                    name="passwordConfirm"
                    label="Confirm Password"
                  />
                  <IconButton
                    aria-label="show-hide-password"
                    className={classes.showHideBtn}
                    onClick={() =>
                      set__showPassword({
                        ...showPassword,
                        passwordConfirm: !showPassword.passwordConfirm,
                      })
                    }
                  >
                    {showPassword.passwordConfirm ? (
                      <VisibilityOffIcon fontSize="small" />
                    ) : (
                      <VisibilityIcon fontSize="small" />
                    )}
                  </IconButton>
                </div>

                {errors.passwordConfirm && touched.passwordConfirm ? (
                  <div>{errors.passwordConfirm}</div>
                ) : null}

                {isSubmitting && <LinearProgress />}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  className={classes.submitBtn}
                  onClick={submitForm}
                >
                  Sign Up
                </Button>

                <Typography
                  // component="h4"
                  // variant="h6"
                  // color="primary"
                  className={classes.signUpText}
                >
                  Already have an account? <Link to="/login">Login</Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </Paper>
      </div>
    </Container>
  );
}

const user = {
  // id: UUID
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "fajcnau6ctaucta6uwebcysc5",
  roles: "USER,EDITOR",
  bussesToTrack: [
    {
      id: "dc3c3434b3jh4jhc",
      routeID: "W4",
      directionNum: "0",
      directionName: "NORTH",
      stopID: "1000772",
      routeName: "W4 - ANACOSTIA STA - DEANWOOD STA",
      stopName: "E CAPITOL ST SE + 47TH ST SE",
      stopRoutes: "96,96*1",
      tripHeadsign: "DEANWOOD STATION",
      userID: "34b34hjb3j4hb3",
    },
  ],
  preferences: {
    resultsType: "complete", // or current    DataTypes.ENUM('value', 'another value')
    intervalRate: 30000, // 30 seconds
  },
};
