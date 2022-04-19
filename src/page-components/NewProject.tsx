import React, { useState } from "react";
import { IProjectProps, IProjectState } from "../component-types/ProjectTypes";

import "./login.css";

class NewProjectClass extends React.Component<IProjectProps, IProjectState> {
  constructor(props: IProjectProps) {
    super(props);
    this.state = {
      room: "",
      language: "",
      connected: this.props.connection,
    };
  }

  render() {
    return (
      <div>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first"></div>

            <form>
              <input
                type="text"
                id="projname"
                className="fadeIn second"
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
                className="fadeIn fourth"
                value="Create"
              ></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const NewProject = (props: IProjectProps) => {
  const [room, setRoom] = useState("");
  const [language, setLanguage] = useState("");
  const [connected, setConnected] = props.connection;

  return (
    <div>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first"></div>

          <form>
            <input
              type="text"
              id="projname"
              className="fadeIn second"
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
              className="fadeIn fourth"
              value="Create"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
