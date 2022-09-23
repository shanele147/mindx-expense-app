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

  const [catValue, setCatValue] = useState(isEdited ? options[0] : {});
  const [updateType, setType] = useState(type);
  const [isActive, setActive] = useState(false);

  const catIndex =
    options && options.findIndex((elm) => elm.label === category);

  const optionStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "ffffff",
      border: 0,
      /* borderBottom: "1px solid #455a64",
      "&:hover": {
        borderBottom: "1px solid #ae8cfa",
      },
      "&:focus": {
        borderBottom: "1px solid #ae8cfa",
      }, */
      borderRadius: "none",
      boxShadow: "none",
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

  const onHandleActive = () => {
    setActive(!isActive);
  };

  const style = {
    width: "100%",
    borderRadius: "none",
    borderBottom: "1px solid #455a64",
    padding: "0.5rem 0 0 0",
    outline: "none",
  };

  useEffect(() => {
    isEdited || category
      ? setCatValue(options[catIndex])
      : setCatValue(options[0]);
    setType(type);
  }, [categories, category]);

  return (
    <div
      style={style}
      className={`relative w-full min-w-[200px] h-11 category-select__container ${
        isActive ? "active" : ""
      }`}
    >
      <button
        type="button"
        className="peer w-full h-full peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-b text-sm pt-4 pb-1.5 border-blue-gray-200 expense-select"
        onClick={() => onHandleActive()}
      ></button>
      <label
        name="category"
        className={`${
          updateType || isEdited ? "" : "activated"
        } flex w-full h-full select-none pointer-events-none absolute font-normal transition-all -top-1.5 after:content[' '] after:block after:w-full after:absolute after:-bottom-1.5 left-0 after:border-b-2 after:transition-transform after:duration-300 text-[11px] peer-disabled:text-transparent after:scale-x-0 leading-tight text-blue-gray-500 after:border-deep-purple-500`}
      >
        Category
      </label>
      {categories.length > 0 && (
        <Select
          styles={optionStyles}
          className="category-select absolute top-1 w-full"
          classNamePrefix="category"
          defaultValue={options[0]}
          isClearable
          isSearchable={false}
          name="category"
          options={options}
          placeholder={catValue ? catValue : "Please select an item..."}
          value={catValue}
          onChange={onHandleChange}
        />
      )}
    </div>
  );
};

export default CustomSelect;
