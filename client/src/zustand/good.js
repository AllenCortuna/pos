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

export const goodStore = create((set) => ({
  goods: [],
  recent: [],
  minimum: {},
  loading: false,

  getGood: async () => {
    set({ loading: true });
    try {
      const result = await api.get("/good/get");
      set({ goods: result.data });
    } catch (err) {
      alert(err.response.data.message);
    }
    set({ loading: false });
  },

  getRecentGood: async () => {
    set({ loading: true });
    try {
      const result = await api.get("/good/getRecent");
      set({ recent: result.data });
    } catch (err) {
      alert(err.response.data.message);
    }
    set({ loading: false });
  },

  getMinimum: async () => {
    set({ loading: true });
    try {
      const result = await api.get("/good/getMinimum");
      set({ minimum: result.data[0].doc[0] });
    } catch (err) {
      console.log(err);
    }
    set({ loading: false });
  },

  uploadGood: async (data, okNotify, errNotify) => {
    set({ loading: true });
    try {
      const result = await api.post("/good/upload", data);
      set((state) => ({ goods: [...state.goods, result.data] }));
      okNotify("Data upload! ");
    } catch (err) {
      errNotify(err.response.data.message);
      console.log(err);
    }
    set({ loading: false });
  },

  updateGood: async (data, id, okNotify, errNotify) => {
    set({ loading: true });
    try {
      const result = await api.patch(`/good/patch/${id}`, data);
      set((state) => ({
        goods: [...state.goods.map((a) => (a._id === id ? result.data : a))],
      }));
      okNotify("Data updated!");
    } catch (err) {
      errNotify(err.response.data.message);
      console.log(err);
    }
    set({ loading: false });
  },

  deleteGood: async (id, okNotify, errNotify) => {
    set({ loading: true });
    try {
      console.log(id);
      await api.delete(`/good/delete/${id}`);
      set((state) => ({ goods: state.goods.filter((a) => a._id !== id) }));
      okNotify("Data deleted!");
    } catch (err) {
      console.log(err);
      errNotify(err.response.data.message);
    }
    set({ loading: false });
  },
}));
