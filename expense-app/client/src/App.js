import React, { useState, useEffect } from "react";
import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";

import { ExpenseContext } from "./contexts/ExpenseContext";

// COMPONENTS
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header";

import "./App.css";
import "./styles/main.scss";

import { EXPENSE, INCOME } from "./utils/constants";
import AuthState from "./contexts/AuthState/AuthState";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import PageContainer from "./components/PageContainer/PageContainer";

function App() {
  const data = [
    {
      id: 1,
      date: "2022-08-01",
      amount: "1000",
      category: "Bonus",
      description: "July overtime working",
      type: INCOME,
      wallet: "Bank",
    },
    {
      id: 2,
      date: "2022-08-13",
      amount: "400",
      category: "Food",
      description: "Dinner with friends",
      type: EXPENSE,
      wallet: "Bank",
    },
    {
      id: 3,
      date: "2022-08-02",
      amount: "150",
      category: "Shopping",
      description: "Weekend super market",
      type: EXPENSE,
      wallet: "Bank",
    },
    {
      id: 4,
      date: "2022-08-18",
      amount: "50",
      category: "Food",
      description: "Hangout weekend",
      type: EXPENSE,
      wallet: "Bank",
    },
  ];
  const [open, setOpen] = useState(false);
  const [isEdited, setEdit] = useState(false);
  const [balance, setBalance] = useState(0);
  const [wallets, setWallets] = useState(["Bank", "Cash"]);
  const [expenseCategories, setExpenseCategory] = useState([
    "Beverage",
    "Food",
    "Shopping",
    "Pet",
    "Phone",
    "Household",
    "Bills",
    "Education",
    "Entertainment",
    "Health",
    "Travel",
    "Transportation",
    "Others",
  ]);
  const [incomeCategories, setIncomeCategory] = useState([
    "Salary",
    "Awards",
    "Bonus",
    "Lottery",
    "Investment",
  ]);
  const [expenseType, setExpenseType] = useState([INCOME, EXPENSE]);
  const [transactionList, setTransactionList] = useState(data);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  // handle expense tabs open state
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleTabIndex = (id) => {
    setActiveTabIndex(id);
  };

  const incomeList = transactionList.filter((elm) => elm.type === INCOME);
  const expenseList = transactionList.filter((elm) => elm.type === EXPENSE);

  const getCategoryTotalAmount = (category, list) => {
    return list
      .filter((elm) => elm.category === category)
      .reduce((total, elm) => total + Number(elm.amount), 0);
  };

  const expenseBasedOnCategory = expenseCategories.map((cat) =>
    getCategoryTotalAmount(cat, expenseList)
  );

  const incomeBasedOnCategory = incomeCategories.map((cat) =>
    getCategoryTotalAmount(cat, incomeList)
  );

  let expenseTotalAmount = expenseBasedOnCategory.reduce(
    (total, elm) => total + Number(elm),
    0
  );
  let incomeTotalAmount = incomeBasedOnCategory.reduce(
    (total, elm) => total + Number(elm),
    0
  );
  // console.log({ incomeList, expenseList });

  // adding new transaction
  const onUpdateTransactionList = (newTransaction) => {
    console.log(selectedTransaction);
    try {
      if (!isEdited) {
        console.log("Add new transaction");
        setTransactionList([...transactionList, newTransaction]);
      } else {
        console.log("Update transaction");
        const selectedInx = transactionList.findIndex(
          (transaction) => transaction.id === selectedTransaction.id
        );
        transactionList[selectedInx] = {
          ...selectedTransaction,
          ...newTransaction,
        };
        setTransactionList([...transactionList]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteTransaction = (id) => {
    const filteredTransaction = transactionList.filter(
      (transaction) => transaction.id !== id
    );
    setTransactionList(filteredTransaction);
  };

  const onEditTransaction = (id) => {
    const selectedIdx = transactionList.findIndex(
      (transaction) => transaction.id === id
    );
    handleEdit(true);
    setSelectedTransaction(transactionList[selectedIdx]);
  };

  const handleOpen = (value) => setOpen(value);
  const handleEdit = (value) => {
    setEdit(value);
    setOpen(value);
  };

  useEffect(() => {
    setBalance(incomeTotalAmount - expenseTotalAmount);
  }, [transactionList]);

  return (
    <Browser>
      <AuthState>
        <ExpenseContext.Provider
          value={{
            open,
            isEdited,
            balance,
            wallets,
            expenseCategories,
            incomeCategories,
            expenseType,
            transactionList,
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
            />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/register" element={<Register />} /> */}
          </Routes>
        </ExpenseContext.Provider>
      </AuthState>
    </Browser>
  );
}

export default App;
