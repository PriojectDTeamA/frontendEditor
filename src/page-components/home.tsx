import React from "react";
import { Navigate } from "react-router";
import { base_API_URL } from "../App";
import { IHomeProps } from "../component-types/HomeTypes";
import { IProjectBoxProps } from "../component-types/ProjectBoxTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowRightToBracket,
  faArrowRightFromBracket

} from "@fortawesome/free-solid-svg-icons";

// import "./login.css";
import "./Home.scss";

const pythonlogo = require("../assets/python.png");
const javalogo = require("../assets/java.jpg");
const javascriptlogo = require("../assets/javascript.png");
const csharplogo = require("../assets/csharp.png");

const Home = (props: IHomeProps) => {
  // this will be used to load in all the projects when the api call for projects for one user works
  // it doesn't work yet since the api isn't complete and the fetch() call isn't correct
  const loadInProjects = async () => {
    const userProjects = await fetch(`${base_API_URL}/Projects/${props.userId}`)
      .then((response) => response.json())
      .then((data) => data);
    // return userProjects.map(e => {<ProjectBox language=e.language projectName=e.name/>})
  };

  return (
    <div>
      <div className="row fadeInDown m-5">
        <div className="col-6">
          <div className="projects-group">

            <div className="projects-header">
              <h3 className="projects-title">My Projects</h3>
              <hr />
            </div>
            <div className="projects-body">`
              {/*loadInProjects() here instead of the single projectBoxes*/}
              <ProjectBox 
                language="python" 
                projectName="First Project" 
              />
              <ProjectBox 
                language="java" 
                projectName="Second Project" 
              />
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

              <div onClick={e => Navigate({to: "/NewProject", replace: true })} className="fadeIn third projects-button">
                <FontAwesomeIcon className="icon" icon={faPlus}/>
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
              <ProjectBox 
                language="python" 
                projectName="First Project" 
              />
              <ProjectBox 
                language="java" 
                projectName="Second Project" 
              />
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
              <ProjectBox 
                language="python" 
                projectName="First Project" 
              />
              <ProjectBox 
                language="java" 
                projectName="Second Project" 
              />
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
              <ProjectBox 
                language="python" 
                projectName="First Project" 
              />
              <ProjectBox 
                language="java" 
                projectName="Second Project" 
              />
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
              <ProjectBox 
                language="python" 
                projectName="First Project" 
              />
              <ProjectBox 
                language="java" 
                projectName="Second Project" 
              />
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

              <div onClick={e => Navigate({to: "/JoinProject", replace: true })} className="fadeIn third projects-button">
                <FontAwesomeIcon className="icon" icon={faArrowRightToBracket}/>
              
              </div>
            </div>
          </div>
        </div>
      </div>  

      <div onClick={e => Navigate({to: "/Login", replace: true })} className="fadeIn fourth leave-button">
        <FontAwesomeIcon className="icon" icon={faArrowRightFromBracket}/>
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
      <div onClick={e => Navigate({to: "/Editor", replace: true })} className="project-item m-3">
        
        <h3 className="project-title"><img src={getLogo()} alt="Project Icon" className="projectlogo" /> {props.projectName}</h3>
      </div>
    </div>
  );
};

export default Home;
