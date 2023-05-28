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

export const saleStore = create((set) => ({
  sales: [],
  loading: false,
  err: null,

  getSale: async () => {
    set({ loading: true });
    try {
      const result = await api.get("/sale/get");
      set({ sales: result.data });
    } catch (err) {
      alert(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },
  
  getDailyTotal: async () => {
    set({ loading: true });
    try {
      const result = await api.get("/sale/getDaily");
      set({ total: result.data });
    } catch (err) {
      console.log(err)
      alert(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },


  uploadSale: async (data) => {
    set({ loading: true });
    try {
      const result = await api.post("/sale/upload", data);
      set((state) => ({ sales: [...state.sales, result.data] }));
    } catch (err) {
      alert(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },

  updateSale: async (data, id) => {
    set({ loading: true });
    try {
      const result = await api.patch(`/sale/patch/${id}`, data);
      set((state) => ({
        sales: [
          ...state.sales.map((a) => (a._id === id ? result.data : a)),
        ],
      }));
    } catch (err) {
      alert(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },

  deleteSale: async (id) => {
    set({ loading: true });
    try {
      await api.delete(`/sale/delete/${id}`);
      set((state) => ({ sales: state.sales.filter((a) => a._id !== id) }));
    } catch (err) {
      alert(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },
}));
