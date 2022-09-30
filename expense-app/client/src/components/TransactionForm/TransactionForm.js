import React, { useState, useEffect } from "react";
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
import CustomSelect from "../CustomSelect";

const TransactionForm = (props) => {
  const { transaction } = props;
  const {
    id,
    open,
    isEdited,
    wallets,
    expenseCategories,
    incomeCategories,
    expenseType,
    onUpdateTransactionList,
    handleTabIndex,
    handleOpen,
    handleEdit,
  } = useExpenseContext();

  const selectData = {
    income: incomeCategories,
    expense: expenseCategories,
  };

  const [currentCategories, setCategories] = useState(
    isEdited ? selectData[transaction.type] : []
  );
  const [currentTransaction, setCurrentTransaction] = useState({
    ...transaction,
  });
  const [currentType, setType] = useState(transaction.type);
  const [category, setCategory] = useState(transaction.category);
  const [wallet, setWallet] = useState(transaction.wallet);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTransaction({ ...currentTransaction, [name]: value });
  };

  const handleWalletChange = (value) => {
    setWallet(value);
    setCurrentTransaction({ ...currentTransaction, wallet: value });
  };

  const handleTypeChange = (value) => {
    currentTransaction.type = value;
    setType(value);
    setCurrentTransaction({ ...currentTransaction, type: value });
    setCategories(selectData[value]);
    setCategory(selectData[value][0]);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCurrentTransaction({ ...currentTransaction, category: value });
  };

  console.log(currentCategories);
  console.log(category);

  const categoryList = currentCategories.map((elm, idx) => {
    return (
      <Option value={elm} key={idx} index={idx}>
        {elm}
      </Option>
    );
  });

  const walletList = wallets.map((elm, idx) => {
    return (
      <Option value={elm} key={idx} index={idx}>
        {elm}
      </Option>
    );
  });

  const typeList = expenseType.map((elm, idx) => {
    return (
      <Option value={elm} key={idx} index={idx}>
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
    onUpdateTransactionList(currentTransaction);
    handleOpen(false);
    handleEdit(false);
    currentTransaction.type === INCOME ? handleTabIndex(0) : handleTabIndex(1);
    resetForm();
  };

  const hasAmountError =
    isNaN(currentTransaction.amount) === true ||
    Number(currentTransaction.amount) < 0;

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
        autoComplete="off"
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
        autoComplete="off"
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
        autoComplete="off"
      />
      <Select
        label="Type"
        className="expense-select"
        variant="standard"
        color="deep-purple"
        value={currentTransaction.type}
        style={{ borderBottom: "1px solid", background: "transparent" }}
        onChange={handleTypeChange}
      >
        {typeList}
      </Select>

      <CustomSelect
        categories={currentCategories}
        category={category}
        isEdited={isEdited}
        type={currentType}
        handleCategoryChange={handleCategoryChange}
      />

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

      <div
        className={`mx-auto px-8 py-3 flex gap-6 justify-center ${
          open && !isEdited ? "block" : "hidden"
        }`}
      >
        <Button
          className={`mx-auto px-8 py-3 btn-cancel`}
          type="button"
          style={{ fontSize: "0.85rem", textTransform: "capitalize" }}
          onClick={() => handleEdit(false)}
        >
          Cancel
        </Button>

        <Button
          className={`mx-auto px-6 py-3 btn-submit`}
          type="submit"
          style={{ fontSize: "0.85rem", textTransform: "capitalize" }}
        >
          Add new transaction
        </Button>
      </div>

      <div
        className={`mx-auto px-8 py-3 flex gap-6 justify-center ${
          isEdited ? "flex" : "hidden"
        }`}
      >
        <Button
          className={`mx-auto px-7 py-3 btn-cancel`}
          type="button"
          style={{ fontSize: "0.85rem", textTransform: "capitalize" }}
          onClick={() => handleEdit(false)}
        >
          Cancel
        </Button>
        <Button
          className={`mx-auto px-8 py-3 btn-submit w-28`}
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
