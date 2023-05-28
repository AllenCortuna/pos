import React, { useEffect } from "react";
import Layout from "../Layout";
// import Chart from "./Chart"
import Daily from "./Daily";
import ReportChart from "./ReportChart";
import TopContent from "./TopContent";
import { totalStore } from "../../zustand/total";
import Loading from "../Loading";
import Recent from "./Recent";

const Dashboard = () => {
  const loading = totalStore((state) => state.loading);
  const getMonthly = totalStore((state) => state.getMonthly);
  const monthly = totalStore((state) => state.monthly);
  useEffect(() => {
    getMonthly();
  }, [getMonthly]);
  return (
    <Layout
      element={
        <div className="flex flex-col justify-center content-center w-full h-auto">
          {loading && <Loading />}
          <div className="m-auto md:bg-white md:shadow-lg rounded-2xl flex flex-col flex-wrap h-auto w-full p-4 md:border md:border-zinc-300 gap-y-5 justify-start content-start">
            <Daily />
            <span className="flex flex-wrap w-auto justify-between gap-5 flex-row">
              {/* <Chart /> */}
              <Recent />
            </span>
            <TopContent />
            <ReportChart list={monthly} />
          </div>
        </div>
      }
    />
  );
};

export default Dashboard;
