import { useState, CSSProperties } from "react";
import BounceLoader from "react-spinners/BounceLoader";

const RenderLoading = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
      <p style={{ color: "#ffaf1a" }}>Please wait...</p>
      <BounceLoader color="#ffaf1a" size="88" />
    </div>
  );
};

export default RenderLoading;
