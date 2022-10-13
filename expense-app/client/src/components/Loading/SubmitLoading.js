import { useState, CSSProperties } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

/* const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
}; */

const SubmitLoading = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3">
      <p style={{ color: "#ffaf1a" }}>
        Thanks for your submitting... Please wait.
      </p>
      <PropagateLoader color="#ffaf1a" size="12" />
    </div>
  );
};

export default SubmitLoading;
