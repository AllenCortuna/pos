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

export const outgoingStore = create((set) => ({
  outgoings: [],
  loading: false,
  err: null,

  getOutgoing: async () => {
    set({ loading: true });
    try {
      const result = await api.get("/outgoing/get");
      set({ outgoings: result.data });
    } catch (err) {
      alert(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },

  uploadOutgoing: async (data) => {
    set({ loading: true });
    try {
      const result = await api.post("/outgoing/upload", data);
      set((state) => ({ outgoings: [...state.outgoings, result.data] }));
    } catch (err) {
      alert(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },

  updateOutgoing: async (data, id) => {
    set({ loading: true });
    try {
      const result = await api.patch(`/outgoing/patch/${id}`, data);
      set((state) => ({
        outgoings: [
          ...state.outgoings.map((a) => (a._id === id ? result.data : a)),
        ],
      }));
    } catch (err) {
      alert(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },

  deleteOutgoing: async (id) => {
    set({ loading: true });
    try {
      await api.delete(`/outgoing/delete/${id}`);
      set((state) => ({
        outgoings: state.outgoings.filter((a) => a._id !== id),
      }));
    } catch (err) {
      alert(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },
}));
