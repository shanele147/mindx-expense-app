import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useExpenseContext } from "../../contexts/ExpenseContext";
// import { Input, Select, Option, Button } from "@material-tailwind/react";
import "../../components/TransactionForm/TransactionForm.css";
import { INCOME } from "../../utils/constants";

const CustomSelect = (props) => {
  const { categories, category, options, defaultOption } = props;
  /* const options =
    categories.length > 0 &&
    categories.map((elm) => ({
      label: elm,
      value: elm.toLowerCase(),
      color: "#455a64",
    })); */
  const [catValue, setCatValue] = useState("");
  // const [defaultOption, setDefaultOption] = useState(options[0]);

  console.log("Current category: " + catValue);
  /* const categoryList = categories.map((elm, idx) => {
    return (
      <Option value={elm} key={idx} index={idx}>
        {elm}
      </Option>
    );
  });
 */

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
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      console.log("option", data.color, isDisabled, isFocused, isSelected);
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
  const onHandleChange = (value) => {
    setCatValue(value);
  };
  const style = {
    width: "100%",
    maxWidth: "600px",
    borderRadius: "none",
    borderBottom: "1px solid #455a64",
    padding: "0.25rem 0",
    outline: "none",
  };

  useEffect(() => {
    setCatValue(categories[0]);
  }, [categories]);

  return (
    <div style={style}>
      <label name="Categories" className="transition duration-300">
        Select Category
      </label>
      {categories.length > 0 && (
        <Select
          styles={optionStyles}
          className="category-select"
          // defaultValue={defaultOption?.defaultOption}
          defaultValue={options[0]}
          name="Categories"
          options={options}
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
