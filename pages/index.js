import { readTasks } from '../redux/features/tasksSlice'
import { wrapper } from '../redux/store'
import TasksList from '../components/TasksList'
import React from "react";
import SignIn from './auth/signin';
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CssBaseline, Box, Container } from "@mui/material";

export default function Index() {
  const auth = useSelector((state) => state.auth); // Assuming the token is stored in the 'auth' slice of the Redux store
  const router = useRouter();
  React.useEffect(() => {
  const token = localStorage.getItem('accessToken')

    if (token) {
      router.push("/dashboard"); // Replace '/dashboard' with the desired route after successful sign-in
    }
  }, [ router]);
    return (
        <div className="auth">
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{ height: "90vh" }}>
            <div className="auth-form">
              <SignIn />
            </div>
          </Box>
        </Container>
      </div>)
}


export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ req, res }) => {
        await store.dispatch(readTasks({ req, res }));
    }
);
