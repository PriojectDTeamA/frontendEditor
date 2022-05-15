import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { base_API_URL } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Language } from "../component-types/propTypes";
import {
  faPlus,
  faArrowRightToBracket,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import "./login.css";
import "./Home.scss";
import { useAppSelector } from "../component-types/hooks";
import { IProjectBoxProps } from "../component-types/propTypes";

import pythonlogo from "../assets/python.png";
import javalogo from "../assets/java.jpg";
import javascriptlogo from "../assets/javascript.png";
import csharplogo from "../assets/csharp.png";

const Home = () => {
  const mainUser = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any>([]);

  useEffect( () => {
    const loadProjects = async () => {
      await fetch(`${base_API_URL}/Projects/GetProjects/1`)
      .then((response) => response.json())
      .then((data) => {
        if(data.Status == "Success"){
          setProjects(data.Data);      
        }
      });
    };
    loadProjects();

  }, []);

  const projectsComp = projects?.map((e: { language:Language, name: string;}, i:number) => (
    <ProjectBox key={i} language={e.language} projectName={e.name} fadeTiming="second"/>
  ));

  return (
    <div>
      <div className="row fadeInDown m-5">
        <div className="col-6">
          <div className="projects-group">
            <div className="projects-header">
              <h3 className="projects-title">My Projects</h3>
              <hr />
            </div>
            <div className="projects-body">
              {projects.length != 0 ?
                projectsComp
              :
                <div>No projects found</div>
              }
              <div
                onClick={() => navigate("/NewProject")}
                className="fadeIn third projects-button"
              >
                <FontAwesomeIcon className="icon" icon={faPlus} />
              </div>
            </div>
          </div>

        </div>

        <div className="col-6">
          <div className="projects-group">
            <div className="projects-header">
              <h3 className="projects-title">My Projects</h3>
              <hr />
            </div>
            <div className="projects-body">
              {/*loadInProjects() here instead of the single projectBoxes*/}
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

              <div>
                <button
                  className="fadeIn third projects-button"
                  onClick={() => navigate("/JoinProject")}
                >
                  <FontAwesomeIcon
                    className="icon"
                    icon={faArrowRightToBracket}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => navigate("/Login")}
        className="fadeIn fourth leave-button"
      >
        <FontAwesomeIcon className="icon" icon={faArrowRightFromBracket} />
      </div>
    </div>
  );
};

const ProjectBox = (props: IProjectBoxProps) => {
  const navigate = useNavigate();
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

  const handleClick = () => {
    // TODO: update this so it connects to the right room and not just to the general editor
    navigate("/Editor");
  };

  return (
    <div className={`fadeIn ${props.fadeTiming || "first"}`}>
      <div onClick={handleClick} className="project-item m-3">
        <h3 className="project-title">
          <img src={getLogo()} alt="Project Icon" className="projectlogo" />{" "}
          {props.projectName}
        </h3>
      </div>
    </div>
  );
};

export default Home;
