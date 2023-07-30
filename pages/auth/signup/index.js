import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextInput, CustomButton } from "../../../components/UI-Components";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { signup } from "@/redux/features/authSlice";
import Link from "next/link";
import { CssBaseline, Box, Container } from "@mui/material";
const SignUp = () => {
  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .required("name is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .matches(/^[A-Za-z]+$/, "Name can only contain alphabets"),
    Email: Yup.string()
      .email("Please enter valid email address ")
      .required("Email is required"),
    Password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
      Group: Yup.string()
      .required("Group is required")
      .matches(/^[A-Za-z]+$/, "Lastname can only contain alphabets"),
  });
  const State = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
      Group:"",
      action :"signup"
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(signup({ state: values }));
    },
  });

  return (
    <React.Fragment>
       <div className="auth">
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{ height: "90vh" }}>
            <div className="auth-form">
            <h5 className="form-heading"> Sign up to continue</h5>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <TextInput
            fullWidth
            name="Name"
            size="small"
            type="text"
            required
            placeholder={"Enter Your name"}
            value={formik.values.Name}
            change={formik.handleChange}
            error={formik.touched.Name && Boolean(formik.errors.Name)}
            helper={formik.touched.Name && formik.errors.Name}
            variant="outlined"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextInput
            fullWidth
            required
            size="small"
            placeholder={"Enter Your email"}
            name="Email"
            type="text"
            value={formik.values.Email}
            change={formik.handleChange}
            error={formik.touched.Email && Boolean(formik.errors.Email)}
            helper={formik.touched.Email && formik.errors.Email}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            fullWidth
            required
            size="small"
            placeholder={"Enter Your password"}
            name="Password"
            type="password"
            value={formik.values.Password}
            change={formik.handleChange}
            error={formik.touched.Password && Boolean(formik.errors.Password)}
            helper={formik.touched.Password && formik.errors.Password}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            fullWidth
            required
            size="small"
            name="Group"
            placeholder={"Enter Your group"}
            type="text"
            value={formik.values.Group}
            change={formik.handleChange}
            error={formik.touched.Group && Boolean(formik.errors.Group)}
            helper={formik.touched.Group && formik.errors.Group}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <div className="signup-text">
            By signing up, I accept the Atlassian{" "}
            <a href="#">Cloud Terms of Service</a> and acknowledge the{" "}
            <a href="#">Privacy Policy</a>.
          </div>
          <CustomButton
            variant="contained"
            text="Sign Up"
            size="large"
            fullWidth
            onClick={formik.handleSubmit}
          />
        </Grid>
      </Grid>
      {State.message && <div>{State.message}</div>}
      <Link href="/" className="signup-text">
        Already have an Atlassian account? Log in
      </Link>
      <div className="signup-text">
        One account for Jira, Confluence, Trello and more. This page is
        protected by reCAPTCHA and the Google Privacy Policy and Terms of
        Service apply.
      </div>
            </div>
          </Box>
        </Container>
      </div>
    
    </React.Fragment>
  );
};

export default SignUp;
