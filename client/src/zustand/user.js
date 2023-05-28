import create from "zustand";
import { alertErr, api } from "./api";

export const userStore = create((set) => ({
  user: [],
  loading: false,
  err: null,
  curUser: null,

  login: async (formData, navigate) => {
    set({ loading: true });
    try {
      const { data } = await api.post("/user/login", formData);
      localStorage.setItem("profile", JSON.stringify(data));
      set({ curUsr: "profile" });
      navigate("/");
    } catch (err) {
      console.log(err);
      alertErr(err);
    }
    set({ loading: false });
  },

  reset: async (data, navigate) => {
    set({ loading: true });
    console.log(data);
    try {
      const result = await api.post("/user/reset", data);
      navigate("/otp");
      localStorage.setItem(
        "resetPW",
        JSON.stringify({ password: data.password, id: result.data.result._id })
      );
    } catch (err) {
      console.log(err.message);
      alert(err.response.data.message);
    }
    set({ loading: false });
  },

  resetOTP: async (data, navigate) => {
    set({ loading: true });
    try {
      const id = JSON.parse(localStorage.getItem("resetPW"))?.id;
      await api.post(`/user/resetOTP/${id}`, data);
      navigate("/login");
      localStorage.clear();
      alert("Password Changed!");
    } catch (err) {
      alert(err.response.data.message);
    }
    set({ loading: false });
  },

  logOut: (navigate) => {
    set({ loading: true });
    try {
      localStorage.clear();
      navigate("/login");
      set({ curUsr: null });
    } catch (err) {
      console.log(err.message);
    }
    set({ loading: false });
  },

  setCurUsr: (data) => {
    set({ curUsr: data });
  },
}));
