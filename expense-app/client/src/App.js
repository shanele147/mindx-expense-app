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

import "./App.css";
import "./styles/main.scss";

// UTILS & SERVICES
import { EXPENSE, INCOME, EXPENSE_CAT, INCOME_CAT } from "./utils/constants";
import DataServices from "./services/dataService";

function App() {
  const [result, setResult] = useState(null);

  const fetchData = async () => {
    const data = await DataServices.getTransactionData();
    setResult(data);
    console.log(result);
  };

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
  const [expenseCategories, setExpenseCategory] = useState(EXPENSE_CAT);
  const [incomeCategories, setIncomeCategory] = useState(INCOME_CAT);
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
  const expenseBasedOnCategory = expenseCategories.map((cat) =>
    getCategoryTotalAmount(cat, expenseList)
  );
  const incomeBasedOnCategory = incomeCategories.map((cat) =>
    getCategoryTotalAmount(cat, incomeList)
  );

  // METHODS
  // using function for JS hoisting
  function getCategoryTotalAmount(category, list) {
    return list
      .filter((elm) => elm.category === category)
      .reduce((total, elm) => total + Number(elm.amount), 0);
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
    fetchData();
  }, []);

  useEffect(() => {
    setBalance(
      getTotalBasedOnCategoryType(incomeCategories, incomeList) -
        getTotalBasedOnCategoryType(expenseCategories, expenseList)
    );
    // setBalance(incomeTotalAmount - expenseTotalAmount);
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
            <Route path="/" element={<PrivateRoute component={HomePage} />} />
            <Route path="/login" element={<SigninPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </ExpenseContext.Provider>
      </AuthState>
    </Browser>
  );
}

export default App;
