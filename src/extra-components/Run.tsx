import React from "react";
import { IRunProps } from "../component-types/propTypes";

import "./Run.css";

const Run = (props: IRunProps) => {
  return (
    <div className="run-container standard-input" onClick={props.runcode} style={{top: props.height, textTransform: "uppercase", fontSize: "13px"}}>
      <p>Save & Run</p>
    </div>
  );
};

export default Run;
