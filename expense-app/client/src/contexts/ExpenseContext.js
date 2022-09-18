import React, { createContext, useContext } from "react";

export const ExpenseContext = createContext();

// Custom hooks
export const useExpenseContext = () => {
  const expenseCtx = useContext(ExpenseContext);
  return expenseCtx;
};
