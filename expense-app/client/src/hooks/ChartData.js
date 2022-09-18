import React from "react";
import { useExpenseContext } from "../contexts/ExpenseContext";
import TabItem from "../components/ExpenseTabs/TabItem.js";
import { chartColors } from "../utils/contants";

// CUSTOM HOOK
export const useChartData = () => {
  const {
    expenseCategories,
    incomeCategories,
    expenseType,
    incomeList,
    expenseList,
    transactionList,
    expenseBasedOnCategory,
    incomeBasedOnCategory,
    onDeleteTransaction,
    onEditTransaction,
  } = useExpenseContext();

  // RENDER TAB CONTENT FROM ARRAYS OF EXPENSE
  const expenses =
    expenseList.length > 0 ? (
      expenseList.map((elm, idx) => (
        <TabItem
          transaction={elm}
          id={elm.id}
          onDeleteTransaction={onDeleteTransaction}
          onEditTransaction={onEditTransaction}
          transactionList={transactionList}
        />
      ))
    ) : (
      <h3 style={{ color: "var(--active-color)" }}>
        No transaction here. Please add some transactions to try this app
      </h3>
    );
  const incomes =
    incomeList.length > 0 ? (
      incomeList.map((elm, idx) => (
        <TabItem
          transaction={elm}
          id={elm.id}
          onDeleteTransaction={onDeleteTransaction}
          transactionList={transactionList}
          onEditTransaction={onEditTransaction}
        />
      ))
    ) : (
      <h3 style={{ color: "var(--active-color)" }}>
        No income record here. Please add some transactions to try this app
      </h3>
    );

  const tabsData = [
    {
      label: expenseType[0],
      content: incomes,
      chartData: {
        labels: incomeCategories,
        datasets: [
          {
            label: `% of ${expenseType[0]}`,
            data: incomeBasedOnCategory,
            backgroundColor: chartColors.backgroundColor,
            borderColor: chartColors.borderColor,
            borderWidth: 1,
          },
        ],
      },
    },
    {
      label: expenseType[1],
      content: expenses,
      chartData: {
        labels: expenseCategories,
        datasets: [
          {
            label: `% of ${expenseType[1]}`,
            data: expenseBasedOnCategory,
            backgroundColor: chartColors.backgroundColor,
            borderColor: chartColors.borderColor,
            hoverOffset: 0,
          },
        ],
      },
    },
  ];

  const options = {
    cutout: "60%",
    aspectRatio: 3 / 4,
    responsive: true,
    spacing: 2,
    layout: {
      autoPadding: true,
      padding: "10",
    },
    plugins: {
      legend: {
        display: true,
        fullSize: true,
        position: "bottom",
        labels: {
          color: "#ffffff",
          align: "start",
          padding: 12,
          boxWidth: 24,
          boxHeight: 12,
          /* Adjust data label font size according to chart size */
          font: function (context) {
            var width = context.chart.width;
            // console.log(width);
            var size =
              width < 667 && width < 1227
                ? Math.round(width / 36)
                : width >= 1227
                ? Math.round(width / 48)
                : Math.round(width / 34);
            // console.log(size);
            return {
              weight: "400",
              size: size,
            };
          },
        },
      },
      tooltips: {
        enabled: true,
      },
    },
  };
  const chartData = { tabsData, options };
  return chartData;
};
