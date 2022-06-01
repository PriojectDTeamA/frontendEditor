import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { APIReturnType, base_API_URL } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Language } from "../component-types/propTypes";
import {
  faPlus,
  faArrowRightToBracket,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import "./login.css";
import "./Home.scss";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { IProjectBoxProps, IProjectProps } from "../component-types/propTypes";

import pythonlogo from "../assets/python.png";
import javalogo from "../assets/java.jpg";
import javascriptlogo from "../assets/javascript.png";
import csharplogo from "../assets/csharp.png";
import { setLanguage, updateEditor, updateRoom } from "../component-types/stateTypes";

const Home = (props: IProjectProps) => {
  const mainUser = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any>([]);
  const connected = useAppSelector(
    (state) => state.projectConnection.connected
  );
  useEffect( () => {
    const loadProjects = async () => {
      await fetch(`${base_API_URL}/Projects/GetProjects/${mainUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        if(data.Status == "Success"){
          setProjects(data.Data);      
        }
      });
    };
    loadProjects();

  }, []);

  const projectsComp = projects?.map((e: { language:Language, name: string, ID: number;}, i:number) => (
    <ProjectBox key={i} language={e.language} projectName={e.name} ID={e.ID} joinRoom = {props.joinRoom} fadeTiming="second"/>
  ));

  return (
    <div>
      {connected === true && navigate("/Editor")}
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
              <h3 className="projects-title">Recent Projects</h3>
              <hr />
            </div>
            <div className="projects-body">
              {/*loadInProjects() here instead of the single projectBoxes*/}
              <ProjectBox language="python" projectName="First Project" joinRoom={props.joinRoom}/>
              <ProjectBox language="java" projectName="Second Project" joinRoom = {props.joinRoom}/>
              <ProjectBox
                language="javascript"
                projectName="Third Project"
                fadeTiming="second"
                joinRoom = {props.joinRoom}
              />
              <ProjectBox
                language="csharp"
                projectName="Fourth Project"
                fadeTiming="second"
                joinRoom = {props.joinRoom}
              />
              <ProjectBox language="python" projectName="First Project" joinRoom = {props.joinRoom}/>
              <ProjectBox language="java" projectName="Second Project" joinRoom = {props.joinRoom}/>
              <ProjectBox
                language="javascript"
                projectName="Third Project"
                fadeTiming="second"
                joinRoom = {props.joinRoom}
              />
              <ProjectBox
                language="csharp"
                projectName="Fourth Project"
                fadeTiming="second"
                joinRoom = {props.joinRoom}
              />
              <ProjectBox language="python" projectName="First Project" joinRoom = {props.joinRoom}/>
              <ProjectBox language="java" projectName="Second Project" joinRoom = {props.joinRoom}/>
              <ProjectBox
                language="javascript"
                projectName="Third Project"
                fadeTiming="second"
                joinRoom = {props.joinRoom}
              />
              <ProjectBox
                language="csharp"
                projectName="Fourth Project"
                fadeTiming="second"
                joinRoom = {props.joinRoom}
              />
              <ProjectBox language="python" projectName="First Project" joinRoom = {props.joinRoom}/>
              <ProjectBox language="java" projectName="Second Project" joinRoom = {props.joinRoom}/>
              <ProjectBox
                language="javascript"
                projectName="Third Project"
                fadeTiming="second"
                joinRoom = {props.joinRoom}
              />
              <ProjectBox
                language="csharp"
                projectName="Fourth Project"
                fadeTiming="second"
                joinRoom = {props.joinRoom}
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
  const dispatch = useAppDispatch();
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
    fetch(`${base_API_URL}/joinsession?project_id=${props.ID}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(updateProject);
  };

  const updateProject = async (data: APIReturnType) => {
    if (data.Status === "Success") {
      dispatch(setLanguage(props.language));
      dispatch(updateEditor(data.Data[0].Code));
      dispatch(updateRoom(data.Data[0].ID));
      await props.joinRoom(props.ID?.toString());

    } 
    // navigate("/Editor");
    // else if (data.Status === "Failed") {
    //   toast.error("joining project failed... (room might not exist?)", {
    //     position: "top-center",
    //   });

    //   console.warn("joining project failed... (room might not exist?)");
    // }
  }

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
