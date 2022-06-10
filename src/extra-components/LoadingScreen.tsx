import React from "react";
import { useAppSelector } from "../component-types/hooks";

import "./LoadingScreen.css";

const LoadingScreen = () => {
  const showLoadingScreen = useAppSelector(
    (state) => state.editor.loadingScreenOn
  );
  return showLoadingScreen ? (
    <div className="loader-background">
      <div className="loader"></div>
    </div>
  ) : (
    <div style={{ display: "none" }}></div>
  );
};

export default LoadingScreen;
