import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useExpenseContext } from "../../contexts/ExpenseContext";
import {
  Input,
  Select,
  Option,
  Button,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import "./TransactionForm.css";
import { INCOME } from "../../utils/constants";

const TransactionForm = (props) => {
  const { transaction, open } = props;
  console.log(transaction.category);
  const {
    id,
    isEdited,
    wallets,
    expenseCategories,
    incomeCategories,
    expenseType,
    onAddNewTransaction,
    handleTabIndex,
    handleOpen,
    handleEdit,
  } = useExpenseContext();

  // console.log({ transaction, selectedTransaction });

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [wallet, setWallet] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState({
    ...transaction,
  });

  console.log({ isEdited, category, currentTransaction });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTransaction({ ...currentTransaction, [name]: value });
  };

  const handleWalletChange = (value) => {
    currentTransaction.wallet = value;
    setCurrentTransaction({ ...currentTransaction, wallet: value });
  };

  const handleCategoryChange = (value) => {
    currentTransaction.category = value;
    setCurrentTransaction({ ...currentTransaction, category: value });
  };

  const handleTypeChange = (value) => {
    currentTransaction.type = value;
    setCurrentTransaction({ ...currentTransaction, type: value });
    currentTransaction.type === INCOME
      ? setCategories(incomeCategories)
      : setCategories(expenseCategories);

    if (categories.indexOf(category) === -1) {
      setCategory(categories[0]);
    }
  };

  const categoryList = categories.map((elm, idx) => {
    return (
      <Option value={elm} key={idx}>
        {elm}
      </Option>
    );
  });

  const walletList = wallets.map((elm, idx) => {
    return (
      <Option value={elm} key={idx}>
        {elm}
      </Option>
    );
  });

  const typeList = expenseType.map((elm, idx) => {
    return (
      <Option value={elm} key={idx}>
        {elm}
      </Option>
    );
  });

  const resetForm = () => {
    setCategory("");
    setWallet("");
    setType("");
    setCurrentTransaction({
      date: "",
      amount: "",
      type: "",
      category: "",
      wallet: "",
      description: "",
    });
  };

  const onHandleAdd = (e) => {
    e.preventDefault();
    // CREATE RANDOM ID BY REACT HOOK
    const newID = uuidv4();
    currentTransaction.id = newID;
    onAddNewTransaction(currentTransaction);
    handleOpen(false);
    handleEdit(false);
    currentTransaction.type === INCOME ? handleTabIndex(0) : handleTabIndex(1);
    resetForm();
  };

  const hasAmountError =
    isNaN(currentTransaction.amount) === true ||
    Number(currentTransaction.amount) < 0;
  // console.log(hasAmountError);

  return (
    <form
      onSubmit={onHandleAdd}
      className={`form-container w-full flex flex-col gap-6 md:gap-8 mx-auto animate__animated py-4 md:py-12 px-3 md:px-6`}
    >
      <Input
        key="date"
        label="Date"
        name="date"
        type="date"
        className="expense-input"
        color="deep-purple"
        size="lg"
        variant="standard"
        required={true}
        value={currentTransaction.date}
        onChange={handleInputChange}
      />
      <Input
        key="amount"
        label="Amount"
        name="amount"
        type="text"
        className="expense-input"
        color="deep-purple"
        size="lg"
        variant="standard"
        required={true}
        value={currentTransaction.amount}
        onChange={handleInputChange}
      />
      {hasAmountError && (
        <div style={{ color: "#bd2560", fontSize: "0.95rem" }}>
          Entered value is invalid. Please input the number.
        </div>
      )}
      <Input
        key="description"
        label="Description"
        name="description"
        type="text"
        color="deep-purple"
        size="lg"
        className="expense-input"
        variant="standard"
        required={true}
        value={currentTransaction.description}
        onChange={handleInputChange}
      />
      <Select
        label="Type"
        className="expense-select"
        variant="standard"
        color="deep-purple"
        value={currentTransaction.type}
        style={{ borderBottom: "1px solid" }}
        onChange={handleTypeChange}
      >
        {typeList}
      </Select>

      <Select
        label="Category"
        className="expense-select category"
        variant="standard"
        color="deep-purple"
        style={{ borderBottom: "1px solid" }}
        value={category}
        onChange={handleCategoryChange}
      >
        {categoryList}
      </Select>
      <Select
        label="Wallet"
        className="expense-select"
        variant="standard"
        color="deep-purple"
        style={{ borderBottom: "1px solid" }}
        value={currentTransaction.wallet}
        onChange={handleWalletChange}
      >
        {walletList}
      </Select>

      <Button
        className={`mx-auto px-4 py-3 btn-submit ${
          isEdited ? "hidden" : "block"
        }`}
        type="submit"
        style={{ fontSize: "0.85rem", textTransform: "capitalize" }}
      >
        Add new transaction
      </Button>
      <div
        className={`mx-auto px-4 py-3 flex gap-6 justify-center ${
          isEdited ? "flex" : "hidden"
        }`}
      >
        <Button
          className={`mx-auto px-4 py-3 btn-cancel w-24`}
          type="cancel"
          style={{ fontSize: "0.85rem", textTransform: "capitalize" }}
          onClick={() => handleEdit(false)}
        >
          Cancel
        </Button>
        <Button
          className={`mx-auto px-4 py-3 btn-submit w-24`}
          type="submit"
          style={{ fontSize: "0.85rem", textTransform: "capitalize" }}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
