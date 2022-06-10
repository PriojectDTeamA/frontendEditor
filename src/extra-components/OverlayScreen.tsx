import React from "react";
import { useAppSelector } from "../component-types/hooks";

import "./LoadingScreen.css";

const OverlayScreen = () => {
  const chatIsOpen = useAppSelector((state) => state.chatbox.chatIsOpen);
  const shareProjectsShown = useAppSelector(
    (state) => state.editor.shareProjectsShown
  );
  return chatIsOpen || shareProjectsShown ? (
    <div className="loader-background"></div>
  ) : (
    <div style={{ display: "none" }}></div>
  );
};

export default OverlayScreen;
