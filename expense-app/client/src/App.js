import React, { useState, useEffect } from "react";
import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";

// CONTEXT
import AuthState from "./contexts/AuthState/AuthState";
import { ExpenseContext } from "./contexts/ExpenseContext";

// COMPONENTS
import HomePage from "./pages/HomePage/HomePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SigninPage from "./pages/SigninPage/SigninPage";
import RegisterPage from "./pages/RegisterPage/Register";
import Loading from "./components/Loading/Loading";

import "./App.css";
import "./styles/main.scss";

// UTILS & SERVICES
import { EXPENSE, INCOME } from "./utils/constants";
import DataServices from "./services/dataService";

function App() {
  // APP STATE
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEdited, setEdit] = useState(false);
  const [balance, setBalance] = useState(0);
  const [wallets, setWallets] = useState(["Bank", "Cash"]);
  const [expenseType, setExpenseType] = useState([INCOME, EXPENSE]);
  const [expenseCategories, setExpenseCategory] = useState([]);
  const [incomeCategories, setIncomeCategory] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // fetch app data
  const fetchData = async () => {
    setLoading(true);
    const result = await DataServices.getData();
    // console.log(result[0].category);
    const dataList = [...result[0].transactions, ...result[1].transactions];
    setTransactions(dataList);
    setIncomeCategory(result[0].category);
    setExpenseCategory(result[1].category);
    setLoading(false);
  };

  console.log(loading);
  // handle expense tabs open state
  const [open, setOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleTabIndex = (id) => {
    setActiveTabIndex(id);
  };

  const incomeList =
    transactions && transactions.filter((elm) => elm.type === INCOME);
  const expenseList =
    transactions && transactions.filter((elm) => elm.type === EXPENSE);
  const expenseBasedOnCategory = expenseCategories.map((cat) =>
    getCategoryTotalAmount(cat, expenseList)
  );
  const incomeBasedOnCategory = incomeCategories.map((cat) =>
    getCategoryTotalAmount(cat, incomeList)
  );

  // METHODS
  // using function for JS hoisting
  function getCategoryTotalAmount(category, list) {
    return (
      list &&
      list
        .filter((elm) => elm.category === category)
        .reduce((total, elm) => total + Number(elm.amount), 0)
    );
  }
  const getTotalBasedOnCategoryType = (categoryList, list) => {
    return categoryList
      .map((category) => getCategoryTotalAmount(category, list))
      .reduce((total, elm) => total + Number(elm), 0);
  };

  // adding new transaction
  const onUpdateTransactionList = (newTransaction) => {
    console.log(selectedTransaction);
    try {
      if (!isEdited) {
        console.log("Add new transaction");
        setTransactions([...transactions, newTransaction]);
      } else {
        console.log("Update transaction");
        const selectedInx = transactions.findIndex(
          (transaction) => transaction.id === selectedTransaction.id
        );
        transactions[selectedInx] = {
          ...selectedTransaction,
          ...newTransaction,
        };
        setTransactions([...transactions]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteTransaction = (id) => {
    const filteredTransaction = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(filteredTransaction);
  };

  const onEditTransaction = (id) => {
    const selectedIdx = transactions.findIndex(
      (transaction) => transaction.id === id
    );
    handleEdit(true);
    setSelectedTransaction(transactions[selectedIdx]);
  };

  const handleOpen = (value) => setOpen(value);
  const handleEdit = (value) => {
    setEdit(value);
    setOpen(value);
  };

  useEffect(() => {
    fetchData();
  }, []);
  transactions.length > 0 && console.log(transactions);

  useEffect(() => {
    setBalance(
      getTotalBasedOnCategoryType(incomeCategories, incomeList) -
        getTotalBasedOnCategoryType(expenseCategories, expenseList)
    );
  }, [transactions]);

  return (
    <Browser>
      <AuthState>
        <ExpenseContext.Provider
          value={{
            open,
            loading,
            isEdited,
            balance,
            wallets,
            expenseCategories,
            incomeCategories,
            expenseType,
            transactions,
            selectedTransaction,
            incomeList,
            expenseList,
            expenseBasedOnCategory,
            incomeBasedOnCategory,
            onUpdateTransactionList,
            onDeleteTransaction,
            onEditTransaction,
            activeTabIndex,
            handleTabIndex,
            handleOpen,
            handleEdit,
          }}
        >
          <Routes>
            <Route
              path="/"
              element={<PrivateRoute component={HomePage} />}
              /* element={
                loading ? <Loading /> : <PrivateRoute component={HomePage} />
              } */
            />
            <Route path="/login" element={<SigninPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </ExpenseContext.Provider>
      </AuthState>
    </Browser>
  );
}

export default App;
