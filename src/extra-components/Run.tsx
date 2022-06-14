import React from "react";
import { IRunProps } from "../component-types/propTypes";

import "./Run.css";

const Run = (props: IRunProps) => {
  return (
    <div className="run-container" onClick={props.runcode}>
      <p>Save & Run</p>
    </div>
  );
};

export default Run;
