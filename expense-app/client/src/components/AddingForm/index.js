import React, { useState, useEffect } from "react";
import TransactionForm from "../TransactionForm/TransactionForm";

import { useExpenseContext } from "../../contexts/ExpenseContext";
import { Dialog, DialogBody } from "@material-tailwind/react";

import "../TransactionForm/TransactionForm.css";
import "animate.css";

const AddingForm = (props) => {
  const { open, handleOpen, isEdited, selectedTransaction, handleEdit } =
    useExpenseContext();

  const [transaction, setTransaction] = useState({
    date: "",
    amount: "",
    description: "",
    type: "",
    category: "",
    wallet: "",
  });
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
            open={open}
          />
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default AddingForm;
