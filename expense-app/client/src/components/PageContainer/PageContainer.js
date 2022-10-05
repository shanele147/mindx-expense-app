import React from "react";
import Header from "../Header";

const PageContainer = ({children, ...props}) => {
  const {shouldShowFooter} = props;
  console.log(shouldShowFooter)
  return (
    <div>
      <Header></Header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};

export default PageContainer;
