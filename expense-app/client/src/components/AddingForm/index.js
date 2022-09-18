import React, { useState, useEffect } from "react";
import { useExpenseContext } from "../../contexts/ExpenseContext";
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import "../TransactionForm/TransactionForm.css";
import "animate.css";
import TransactionForm from "../TransactionForm";

const AddingForm = (props) => {
  const { open, handleOpen } = props;
  const {
    wallets,
    expenseType,
    transactionList,
    onAddNewTransaction,
    handleTabIndex,
  } = useExpenseContext();

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [wallet, setWallet] = useState("");
  const [categories, setCategories] = useState([]);
  const [transaction, setTransaction] = useState({
    date: "",
    amount: "",
    description: "",
    type,
    category,
    wallet,
  });

  const resetForm = () => {
    setCategory("");
    setWallet("");
    setType("");
    setTransaction({
      date: "",
      amount: "",
      type: "",
      category: "",
      wallet: "",
      description: "",
    });
  };


  return (
    <div className={`flex flex-col gap-6 md:gap-8 mx-auto animate__animated`}>
      <Dialog
        className="tw-dialog overflow-visible"
        size="lg"
        open={
          open ? true : false
        } /* use conditional function to make sure the props is boolean instead of object - React warning */
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        style={{ backgroundColor: "transparent" }}
      >
        <DialogBody>
          <TransactionForm transaction={transaction} handleOpen={handleOpen}/>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default AddingForm;
