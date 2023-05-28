import create from "zustand";
import { api } from "./api";

api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const drawerStore = create((set) => ({
  drawers: [],
  loading: false,
  err: null,
  total: 0,

  getDrawer: async (data) => {
    set({ loading: true });
    try {
      const result = await api.get(`/drawer/get?month=${data.month}&year=${data.year}`,);
      set({ drawers: result.data });
    } catch (err) {
      console.log(err);
    }
    set({ loading: false });
  },

  getDailyTotal: async () => {
    set({ loading: true });
    try {
      const result = await api.get("/drawer/getDaily");
      set({ total: result.data });
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
    set({ loading: false });
  },

  uploadDrawer: async (data, okNotify, errNotify) => {
    set({ loading: true });
    try {
      const result = await api.post("/drawer/upload", data);
      set((state) => ({ drawers: [...state.drawers, result.data] }));
      okNotify("Data upload success");
    } catch (err) {
      errNotify(err.response.data.message);
    }
    set({ loading: false });
  },

  updateDrawer: async (data, id, okNotify, errNotify) => {
    set({ loading: true });
    try {
      const result = await api.patch(`/drawer/patch/${id}`, data);
      set((state) => ({
        drawers: [
          ...state.drawers.map((a) => (a._id === id ? result.data : a)),
        ],
      }));
      okNotify("Data update successfully");
    } catch (err) {
      errNotify(err.response.data.message);
    }
    set({ loading: false });
  },

  deleteDrawer: async (id, okNotify, errNotify) => {
    set({ loading: true });
    try {
      await api.delete(`/drawer/delete/${id}`);
      set((state) => ({ drawers: state.drawers.filter((a) => a._id !== id) }));
      okNotify("Data deleted");
    } catch (err) {
      errNotify(err.response.data.message);
    }
    set({ loading: false });
  },
}));
