import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthState/AuthContext";
import Header from "../Header";

const PageContainer = ({ children, ...props }) => {
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;
  // console.log(state);
  const { shouldShowFooter, loading } = props;
  // control the children that we want to show when not log in
  console.log({ isAuthenticated, shouldShowFooter });

  return (
    <div>
      <Header></Header>
      <main style={{ height: "100vh" }}>{children}</main>
      <footer></footer>
    </div>
  );
};

export default PageContainer;
