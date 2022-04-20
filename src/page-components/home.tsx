import React from "react";
import { IProjectBoxProps } from "../component-types/ProjectBoxTypes";
import "./login.css";
const pythonlogo = require("../assets/python.png");
const javalogo = require("../assets/java.jpg");
const javascriptlogo = require("../assets/javascript.png");
const csharplogo = require("../assets/csharp.png");

const Home = () => {
  return (
    <div>
      <div className="row fadeInDown">
        <div className="col-md-4 m-5">
          <ul className="list-group">
            {/* eventually these projectboxes need to be loaded from the api with something like a map() function */}
            <ProjectBox language="python" projectName="First Project" />
            <ProjectBox language="java" projectName="Second Project" />
            <ProjectBox
              language="javascript"
              projectName="Third Project"
              fadeTiming="second"
            />
            <ProjectBox
              language="csharp"
              projectName="Fourth Project"
              fadeTiming="second"
            />
          </ul>
        </div>
      </div>

      <div className="fadeIn third position-absolute new">
        <a
          href="/NewProject"
          className="btn btn-primary btn-lg active"
          role="button"
          aria-pressed="true"
        >
          New Project
        </a>
      </div>

      <div className="fadeIn third position-absolute join">
        <a
          href="/JoinProject"
          className="btn btn-primary btn-lg active"
          role="button"
          aria-pressed="true"
        >
          Join Project
        </a>
      </div>

      <div className="fadeIn fourth position-absolute logout">
        <a href="/login" className="btn btn-danger">
          Logout
        </a>
      </div>
    </div>
  );
};

const ProjectBox = (props: IProjectBoxProps) => {
  const getLogo = () => {
    switch (props.language) {
      case "python":
        return pythonlogo;
      case "java":
        return javalogo;
      case "javascript":
        return javascriptlogo;
      case "csharp":
        return csharplogo;
      default:
        console.error(
          "language was not recognized in getLogo() of ProjectBox component"
        );
        break;
    }
  };

  return (
    <div className={`fadeIn ${props.fadeTiming || "first"}`}>
      <li className="list-group-item m-3">
        <img src={getLogo()} alt="Project Icon" className="projectlogo" />
        <a href="./editor">{props.projectName}</a>
      </li>
    </div>
  );
};

export default Home;
