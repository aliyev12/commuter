import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "./Auth.styles";
import Container from "@material-ui/core/Container";
import { Title } from "../global/Title";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(12, "Password is too short")
    .max(200, "Password is too long")
    .required("Password is required"),
});

export function Login() {
  const classes = useStyles();
  return (
    <Container fixed>
      <div className={classes.root}>
        <Title text="Enter your email and password" />
        <Paper elevation={3} className={classes.paper}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting }) => {
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
                  name="email"
                  type="email"
                  label="Email"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
                <Field
                  component={TextField}
                  type="password"
                  name="password"
                  label="Password"
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
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
                  Login
                </Button>

                <Typography
                  // component="h4"
                  // variant="h6"
                  // color="primary"
                  className={classes.signUpText}
                >
                  Don’t have an account yet? <Link to="/register">Sign up</Link>
                </Typography>
                <Typography
                  component="h4"
                  variant="h7"
                  color="primary"
                  className={classes.oAuthOrText}
                >
                  Or, log in with one of the following: (comming soon...)
                </Typography>

                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  disabled={true}
                  className={classes.submitBtn}
                  onClick={() =>
                    alert("Sorry, this feature has not yet been implemented")
                  }
                >
                  Google
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  disabled={true}
                  className={classes.submitBtn}
                  onClick={() =>
                    alert("Sorry, this feature has not yet been implemented")
                  }
                >
                  Facebook
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </div>
    </Container>
  );
}
