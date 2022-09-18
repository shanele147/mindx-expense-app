import React from "react";
import expenseAppService from "../../services";
import { MdDeleteForever, MdOutlineDriveFileRenameOutline} from "react-icons/md";

const TabItem = (props) => {
  const { transaction, id, onDeleteTransaction, onEditTransaction} = props;
  const { amount, category, description, type } = transaction;
  return (
    <ul
      key={id}
      className="w-full justify-between px-2 py-2 flex transition-row "
    >
      <li key={`list-item${id}`}>
        <p
          className={`category ${expenseAppService.textToLowerCase(
            type
          )}-${expenseAppService.textToLowerCase(category)} text-sm md:text-lg`}
        >
          {category}
        </p>
        <p className="description text-xs md:text-sm">{description}</p>
      </li>
      <li className="max-w-full md:w-1/3 lg:w-1/5 flex flex-wrap sm:justify-between md:justify-around">
        <p className="amount text-base md:text-lg">
          {expenseAppService.convertCurrency(amount, "USD")}
        </p>
        <div className="flex flex-row justify-center"><MdDeleteForever
          className="text-xl lg:text-2xl"
          onClick={() => onDeleteTransaction(id)}
        />
        <MdOutlineDriveFileRenameOutline className="text-xl lg:text-2xl" onClick={() => onEditTransaction(id)}/>
        </div>
      </li>
    </ul>
  );
};
export default TabItem;
