import create from "zustand";
import {api} from './api'


api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const historyStore = create((set) => ({
  historys: [],
  loading: false,
  err: null,

  getHistory: async () => {
    set({ loading: true });
    try {
      const result = await api.get("/history/get");
      set({ historys: result.data });
    } catch (err) {
      alert(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },

  uploadHistory: async (data,okNotify,errNotify) => {
    set({ loading: true });
    try {
      const result = await api.post("/history/upload", data);
      set((state) => ({ historys: [...state.historys, result.data] }));
      okNotify("Data Updated!")
    } catch (err) {
      errNotify(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },

  updateHistory: async (data, id,okNotify,errNotify) => {
    set({ loading: true });
    try {
      const result = await api.patch(`/history/patch/${id}`, data);
      set((state) => ({
        historys: [
          ...state.historys.map((a) => (a._id === id ? result.data : a)),
        ],
      }));
      okNotify("Data Updated!")
    } catch (err) {
      errNotify(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },

  deleteHistory: async (id,okNotify,errNotify) => {
    set({ loading: true });
    try {
      await api.delete(`/history/delete/${id}`);
      set((state) => ({ historys: state.historys.filter((a) => a._id !== id) }));
      okNotify("Data Deleted!")
    } catch (err) {
      errNotify(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },
}));
