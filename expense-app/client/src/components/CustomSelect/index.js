import React, { useState, useEffect } from "react";
import "../AddingForm/AddingForm.css";

const CustomSelect = (props) => {
  const { categories, handleCategoryChange, selected } = props;
  console.log(categories);
  const [active, setActive] = useState(false);

  const categoryItems =
    categories.length > 0 &&
    categories.map((elm, idx) => {
      return (
        <>
          <option value={elm.toLowerCase()} key={idx}>
            {elm}
          </option>
        </>
      );
    });

  return (
    <div
      className={`relative w-full min-w-[200px] h-11 flex flex-col justify-between select-container ${
        selected === true || active ? "active" : ""
      }`}
      onClick={() => setActive(!active)}
    >
      <label
        for="category"
        className={`custom-label w-full text-sm absolute ${
          selected === true || active === true ? "active" : ""
        }`}
        data-hidden={selected === true ? "true" : "false"}
      >
        Category
      </label>
      {categories.length === 0 && active === true ? (
        <p className="text-sm">Please choose the type of category first</p>
      ) : (
        <select
          id="category"
          className={`${selected === true ? "active" : ""}`}
        >
          {categoryItems}
        </select>
      )}
    </div>
  );
};

export default CustomSelect;
