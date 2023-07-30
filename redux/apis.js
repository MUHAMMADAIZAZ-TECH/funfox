import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api/";
export const SignIn = async (state) => {
  try {
    const response = await axios.post(`user`, state);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const SignUp = async (state) => {
  try {
    const response = await axios.post(`user`, state);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

