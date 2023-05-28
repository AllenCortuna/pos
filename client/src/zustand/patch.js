import create from "zustand";
import { api } from "./api";

export const patchStore = create((set) => ({
  loading: false,

  patchContact: async (form, navigate) => {
    set({ loading: true });
    try {
      const id = JSON.parse(localStorage.getItem("profile"))?._id;
      const { data } = await api.patch(`/user/patchContact/${id}`, form, {
        timeout: 45000,
      });
      localStorage.setItem("profile", JSON.stringify(data));
      alert("Contact Changed successfully!");
      navigate("/setting");
    } catch (err) {
      console.log(err)
      alert(err.response.data.message);
    }
    set({ loading: false });
  },

  patchEmail: async (form, navigate) => {
    set({ loading: true });
    try {
      const id = JSON.parse(localStorage.getItem("profile"))?._id;
      const { data } = await api.patch(`/user/patchEmail/${id}`, form, {
        timeout: 45000,
      });
      localStorage.setItem("profile", JSON.stringify(data));
      alert("Email Changed successfully!");
      navigate("/setting");
    } catch (err) {
      alert(err.response.data.message);
    }
    set({ loading: false });
  },
}));
