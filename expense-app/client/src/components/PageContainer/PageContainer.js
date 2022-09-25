import React from "react";
import Header from "../Header";

const PageContainer = (props) => {
  return (
    <div>
      <Header></Header>
      <main>{props.children}</main>
      <footer></footer>
    </div>
  );
};

export default PageContainer;
