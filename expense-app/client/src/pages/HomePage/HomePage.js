import React, { useState } from "react";

import PageContainer from "../../components/PageContainer/PageContainer";
import ExpenseTabs from "../../components/ExpenseTabs";
/* style */
import "../HomePage/HomePage.scss";

const HomePage = () => {
  return (
    <PageContainer shouldShowFooter={true}>
      {/* this is props.children */}
      <div className="container h-full mx-auto page-container py-8 px-4 md:pt-28 md:pb-6 md:px-8">
        <ExpenseTabs />
      </div>
    </PageContainer>
  );
};

export default HomePage;
