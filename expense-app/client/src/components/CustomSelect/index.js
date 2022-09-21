import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useExpenseContext } from "../../contexts/ExpenseContext";
// import { Input, Select, Option, Button } from "@material-tailwind/react";
import "../../components/TransactionForm/TransactionForm.css";
import { INCOME } from "../../utils/constants";

const CustomSelect = (props) => {
  const { categories, category, isEdited, handleCategoryChange, type } = props;

  const options =
    categories.length > 0 &&
    categories.map((elm) => ({
      label: elm,
      value: elm.toLowerCase(),
      color: "#455a64",
    }));
  const [catValue, setCatValue] = useState(isEdited ? category : "");
  const [updateType, setType] = useState(type);

  // console.log("Current category: " + catValue.label);

  const optionStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "ffffff",
      border: "none",
      borderRadius: "none",
      outline: "none",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "#455a64",
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "#455a64",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#ffffff",
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: "0",
      color: "#000000",
    }),
    menuList: (styles) => ({
      ...styles,
      color: "#000000",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // console.log("option", data.color, isDisabled, isFocused, isSelected);
      return {
        ...styles,
        color: isDisabled ? undefined : isSelected ? "#ae8cfa" : undefined,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? "transparent"
          : isFocused
          ? "#916ef17a"
          : undefined,
      };
    },
  };
  const onHandleChange = (elm) => {
    setCatValue(elm);
    handleCategoryChange(elm.label);
  };

  const style = {
    width: "100%",
    // maxWidth: "600px",
    borderRadius: "none",
    borderBottom: "1px solid #455a64",
    padding: "0.25rem 0",
    outline: "none",
  };

  useEffect(() => {
    isEdited ? setCatValue(category) : setCatValue(categories[0]);
    setType(type);
  }, [categories, category]);

  return (
    <div style={style} className="relative w-full min-w-[200px] h-11">
      <label
        name="category"
        className={`${
          updateType || isEdited ? "" : "deactivated"
        } flex w-full h-full select-none pointer-events-none absolute font-normal transition-all -top-1.5 after:content[' '] after:block after:w-full after:absolute after:-bottom-1.5 left-0 after:border-b-2 after:transition-transform after:duration-300 text-[11px] peer-disabled:text-transparent after:scale-x-0 leading-tight text-blue-gray-500 after:border-deep-purple-500`}
      >
        Category
      </label>
      {categories.length > 0 && (
        <Select
          styles={optionStyles}
          className="category-select"
          defaultValue={options[0]}
          isClearable
          isSearchable={false}
          name="category"
          options={options}
          placeholder={
            !isEdited ? "" : catValue ? catValue : "Please select item..."
          }
          value={catValue}
          onChange={onHandleChange}
        />
      )}
    </div>
  );
};

export default CustomSelect;
{
  /* <div className="select-container text-black">
      <select
        value={catValue}
        onChange={onHandleChange}
        className="text-black w-40 px-4 py-1 min-h-fit"
      >
        {categories.map((option, idx) => (
          <option value={option} key={idx}>
            {option}
          </option>
        ))}
      </select>
    </div> */
}
