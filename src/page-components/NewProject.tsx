import React, { useState } from "react";
import { IProjectProps, Language } from "../component-types/propTypes";

import "./login.css";

const NewProject = (props: IProjectProps) => {
  const [room, setRoom] = useState("");
  const [language, setLanguage] = useState<Language | "">("");
  const [connected, setConnected] = useState(props.connection);

  return (
    <div>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first"></div>
          <form>
            <input
              type="text"
              id="projname"
              className="fadeIn second standard-input"
              name="newproj"
              placeholder="Project Name"
            ></input>
            <select
              id="language"
              name="language"
              placeholder="Language"
              className="fadeIn third"
            >
              <option value="csharp">C#</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>
            <input
              type="submit"
              className="fadeIn fourth standard-input"
              value="Create"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
