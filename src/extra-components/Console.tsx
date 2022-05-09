import React from "react";
import { useAppSelector } from "../component-types/hooks";
import "./Console.css";

const Console = () => {
  const consoleText = useAppSelector((state) => state.editor.consoleText);

  return (
    <div className="console">
      <p>
        {consoleText.split(/\n/).map(line => <div key={line}>{"$ " + line}</div>)}
      </p>
    </div>
  );
};

export default Console;
