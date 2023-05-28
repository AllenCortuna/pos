import React, { useEffect } from "react";
import { expenseStore } from "../../zustand/expense";
import { invoiceStore } from "../../zustand/invoice";
import { totalStore } from "../../zustand/total";

const TopContent = () => {
  const getMonthlyExpense = expenseStore((state) => state.getMonthlyTotal);
  const getMonthlyIncome = invoiceStore((state) => state.getMonthlyTotal);
  const getQuarterlyExpense = expenseStore((state) => state.getQuarterlyTotal);
  const getQuarterlyIncome = invoiceStore((state) => state.getQuarterlyTotal);
  const getYearlyExpense = expenseStore((state) => state.getYearlyTotal);
  const getYearlyIncome = invoiceStore((state) => state.getYearlyTotal);

  const total = totalStore((state) => state.total);
  const getTotal = totalStore((state) => state.getTotal);

  const dailyExpense = expenseStore((state) => state.total);
  const dailyIncome = invoiceStore((state) => state.total);
  const dailySale = dailyIncome - dailyExpense;

  const monthlyExpense = expenseStore((state) => state.monthly);
  const monthlyIncome = invoiceStore((state) => state.monthly);
  const monthlySale = monthlyIncome - monthlyExpense;

  const quarterlyExpense = expenseStore((state) => state.quarterly);
  const quarterlyIncome = invoiceStore((state) => state.quarterly);
  const quarterlySale = quarterlyIncome - quarterlyExpense;

  const yearlyExpense = expenseStore((state) => state.yearly);
  const yearlyIncome = invoiceStore((state) => state.yearly);
  const yearlySale = yearlyIncome - yearlyExpense;

  useEffect(() => {
    getTotal();
    getMonthlyExpense();
    getMonthlyIncome();
    getQuarterlyExpense();
    getQuarterlyIncome();
    getYearlyExpense();
    getYearlyIncome();
  }, [
    getTotal,
    getMonthlyExpense,
    getMonthlyIncome,
    getQuarterlyIncome,
    getQuarterlyExpense,
    getYearlyExpense,
    getYearlyIncome,
  ]);

  return (
    <span className="flex flex-wrap flex-1 flex-row md:justify-start content-start grid-cols-4 gap-5 w-full h-auto">
      <Content
        name={"Total Goods"}
        value={total.good?.toFixed(2)}
        border={"border-cyan-600"}
        unit={""}
      />
      <Content
        name={"Total Incoming"}
        value={total.incoming?.toFixed(2)}
        border={"border-violet-700"}
        unit={""}
      />
      <Content
        name={"Stocks of Goods"}
        value={total.stock?.toFixed(2)}
        border={"border-violet-400"}
        unit={""}
      />

      <Content
        name={"Daily Income"}
        value={dailyIncome?.toFixed(2)}
        border={"border-amber-800"}
        unit={"php"}
      />
      <Content
        name={"Daily Sale"}
        value={dailySale?.toFixed(2)}
        border={"border-amber-800"}
        unit={"php"}
      />

      <Content
        name={"Monthly Income"}
        value={monthlyIncome?.toFixed(2)}
        border={"border-amber-600"}
        unit={"php"}
      />
      <Content
        name={"Monthly Sale"}
        value={monthlySale?.toFixed(2)}
        border={"border-amber-600"}
        unit={"php"}
      />

      <Content
        name={"Quarterly Income"}
        value={quarterlyIncome?.toFixed(2)}
        border={"border-amber-400"}
        unit={"php"}
      />
      <Content
        name={"Quarterly Sale"}
        value={quarterlySale?.toFixed(2)}
        border={"border-amber-400"}
        unit={"php"}
      />

      <Content
        name={"Annual Income"}
        value={yearlyIncome?.toFixed(2)}
        border={"border-amber-400"}
        unit={"php"}
      />
      <Content
        name={"Annoul Sale"}
        value={yearlySale?.toFixed(2)}
        border={"border-amber-400"}
        unit={"php"}
      />
    </span>
  );
};

export default TopContent;

export const Content = ({ name, value, border, unit }) => {
  return (
    <span
      className={`flex justify-start content-between border-l-8 bg-white md:bg-zinc-100 h-20 w-40 shad rounded-lg p-4 text-md font-bold text-zinc-600 ${border}`}
    >
      <span className="grid gap-2">
        <h4 className="text-zinc-500 font-[500] rale text-xs w-full whitespace-wrap">
          {name}
        </h4>
        <span>
          <p className="inline mr-1">{value}</p>
          <p className="inline text-xs text-zinc-400 font-[500]">{unit}</p>
        </span>
      </span>
    </span>
  );
};
