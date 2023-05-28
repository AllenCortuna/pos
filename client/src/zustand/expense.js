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

export const expenseStore = create((set) => ({
  expenses: [],
  loading: false,
  err: null,
  total: 0,
  monthly: 0,
  quarterly: 0,
  yearly: 0,

  getExpense: async (data) => {
    set({ loading: true });
    try {
      const result = await api.get(`/expense/get?month=${data.month}&year=${data.year}`,);
      set({ expenses: result.data });
    } catch (err) {
      console.log(err);
    }
    set({ loading: false });
  },
  
  getDailyTotal: async () => {
    set({ loading: true });
    try {
      const result = await api.get("/expense/getDaily");
      set({ total: result.data });
    } catch (err) {
      console.log(err)
      alert(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },
  
  getMonthlyTotal: async () => {
    set({ loading: true });
    try {
      const result = await api.get("/expense/getMonthly");
      set({ monthly: result.data });
    } catch (err) {
      console.log(err)
      alert(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },
  
  getQuarterlyTotal: async () => {
    set({ loading: true });
    try {
      const result = await api.get("/expense/getQuarterly");
      set({ quarterly: result.data });
    } catch (err) {
      console.log(err)
      alert(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },

  getYearlyTotal: async () => {
    set({ loading: true });
    try {
      const result = await api.get("/expense/getYearly");
      set({ yearly: result.data });
    } catch (err) {
      console.log(err)
      alert(err.response.data.message);
      set({ err: err.response.data.message });
    }
    set({ loading: false });
  },


  uploadExpense: async (data,okNotify,errNotify) => {
    set({ loading: true });
    try {
      const result = await api.post("/expense/upload", data);
      set((state) => ({ expenses: [...state.expenses, result.data] }));
      okNotify("Data Uploaded!")
    } catch (err) {
      errNotify(err.response.data.message);
    }
    set({ loading: false });
  },

  updateExpense: async (data, id,okNotify,errNotify) => {
    set({ loading: true });
    try {
      const result = await api.patch(`/expense/patch/${id}`, data);
      set((state) => ({
        expenses: [
          ...state.expenses.map((a) => (a._id === id ? result.data : a)),
        ],
      }));
      okNotify("Data Updated!")
    } catch (err) {
      errNotify(err.response.data.message);
    }
    set({ loading: false });
  },

  deleteExpense: async (id,okNotify,errNotify) => {
    set({ loading: true });
    try {
      await api.delete(`/expense/delete/${id}`);
      set((state) => ({ expenses: state.expenses.filter((a) => a._id !== id) }));
      okNotify("Data deleted!")
    } catch (err) {
      errNotify(err.response.data.message);
    }
    set({ loading: false });
  },
}));
