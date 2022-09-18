import React, { useState } from "react";
import AddingForm from "../../components/AddingForm";
import ExpenseTabs from "../../components/ExpenseTabs";
import { Button, IconButton } from "@material-tailwind/react";
/* style */
import "../HomePage/HomePage.scss";

const HomePage = () => {
  return (
    <div className="container mx-auto page-container py-8 px-4 md:py-20 md:px-8">
      <ExpenseTabs />
    </div>
  );
};

export default HomePage;
