import React, { useState } from "react";
import AddingForm from "../../components/AddingForm";
import ExpenseTabs from "../../components/ExpenseTabs";
import { Button, IconButton } from "@material-tailwind/react";
/* style */
import "../HomePage/HomePage.scss";
import PageContainer from "../../components/PageContainer/PageContainer";

const HomePage = () => {
  return (
    <PageContainer >
      <div className="container mx-auto page-container py-8 px-4 md:pt-28 md:pb-6 md:px-8">
      <ExpenseTabs />
    </div>
    </PageContainer>
    
  );
};

export default HomePage;
