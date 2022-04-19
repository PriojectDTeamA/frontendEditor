import React from "react";
import { IConsoleProps } from "../component-types/ConsoleTypes";
import "./Console.css";

const Console = (props: IConsoleProps) => {
  return (
    <div className="console">
      <p>
        {"$ "}
        {props.text || "no output was given"}
      </p>
    </div>
  );
};

export default Console;
