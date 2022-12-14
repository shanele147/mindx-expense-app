import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useExpenseContext } from "../../contexts/ExpenseContext";
import { useTabData } from "../../hooks/TabData";
import "./ExpenseTabs.css";
import RenderLoading from "../Loading/RenderLoading";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseTabs = () => {
  // USING CUSTOM HOOK
  const { tabsData, options } = useTabData();
  // USING CONTEXT
  const { activeTabIndex, handleTabIndex, loading } = useExpenseContext();

  const onSetTabIndex = (index) => {
    handleTabIndex(index);
  };

  return (
    <>
      {loading ? (
        <RenderLoading />
      ) : (
        <div className="w-full md:w-3/4 lg:w-2/3 mx-auto tab-container">
          <div key="0" className="flex">
            {/* Loop through tab data and render button for each. */}
            {tabsData.map((tab, idx) => {
              return (
                <button
                  key={idx}
                  className={`w-1/2 py-2 px-4 tab-index transition duration-500 ${
                    idx === activeTabIndex
                      ? "border-b-2 active-border"
                      : "border-b-2"
                  }`}
                  // Change the active tab on click.
                  onClick={() => onSetTabIndex(idx)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div key="1" className="flex flex-wrap justify-center">
            {/* Show active tab content. */}
            {tabsData.map((tab, idx) => {
              return (
                <div
                  key={idx}
                  className={`w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 py-4 px-4 md:px-6 mx-auto tab-content animate__animated animate__slow ${
                    idx === activeTabIndex
                      ? "animate__fadeIn"
                      : "animate__fadeOut"
                  }`}
                >
                  {tab.content}
                  <Doughnut
                    data={tab.chartData}
                    options={options}
                    className="mb-16"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default ExpenseTabs;
