import React, { useState, useEffect } from "react";
import TransactionForm from "../TransactionForm/TransactionForm";

import { useExpenseContext } from "../../contexts/ExpenseContext";
import { Dialog, DialogBody } from "@material-tailwind/react";

import { INCOME, EXPENSE } from "../../utils/constants";
import "../TransactionForm/TransactionForm.css";
import "animate.css";
import CustomSelect from "../CustomSelect";

const AddingForm = (props) => {
  const {
    open,
    handleOpen,
    isEdited,
    activeTabIndex,
    selectedTransaction,
    handleEdit,
    expenseType,
    expenseCategories,
    incomeCategories,
  } = useExpenseContext();

  const [transaction, setTransaction] = useState(
    isEdited
      ? selectedTransaction
      : {
          date: "",
          amount: "",
          description: "",
          type: "",
          category: "",
          wallet: "",
        }
  );

  const [categories, setCategories] = useState([]);
  const onHandleClick = (type) => {
    console.log(type);
    type === "income"
      ? setCategories(incomeCategories)
      : setCategories(expenseCategories);
  };

  const options =
    categories.length > 0 &&
    categories.map((elm) => ({
      label: elm,
      value: elm.toLowerCase(),
      color: "#455a64",
    }));

  return (
    <div className={`flex flex-col gap-6 md:gap-8 mx-auto animate__animated`}>
      <Dialog
        className="tw-dialog overflow-visible"
        size="lg"
        open={
          open || isEdited ? true : false
        } /* use conditional function to make sure the props is boolean instead of object - React warning */
        handler={isEdited ? handleEdit : handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        style={{ backgroundColor: "transparent" }}
      >
        <DialogBody>
          <TransactionForm
            transaction={isEdited ? selectedTransaction : transaction}
          />
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default AddingForm;
