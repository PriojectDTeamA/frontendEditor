import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../component-types/hooks";

import "./Console.css";

const Console = () => {
  const consoleText = useAppSelector((state) => state.editor.consoleText);
  const el = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    el.current!.scrollIntoView({ behavior: "smooth" });
  }, [consoleText]);

  return (
    <div id="console">
      {consoleText.split(/\n/).map((line) => (
        <div key={line}>{line}</div>
      ))}
      <div ref={el}></div>
    </div>
  );
};

export default Console;
