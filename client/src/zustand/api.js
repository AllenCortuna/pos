import axios from "axios";

// export const api = axios.create({ baseURL: "http://localhost:8000/", timeout: 45000 });
export const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 45000,
  timeoutErrorMessage: "Could not connect to database!!!",
});

export const alertErr = (err) => {
  if (err?.response?.data?.message) {
    alert(err?.response?.data?.message);
  } else if (err?.message) {
    alert(err?.message);
  } else {
    alert("Something went wrong!");
  }
};
