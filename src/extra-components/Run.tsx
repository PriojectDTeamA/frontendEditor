import React from "react";
import { IRunProps } from "../component-types/RunTypes";
import "./Run.css";

const Run = (props: IRunProps) => {
  return (
    <div className="run-container" onClick={props.runcode}>
      <p>Run</p>
    </div>
  );
};

export default Run;
