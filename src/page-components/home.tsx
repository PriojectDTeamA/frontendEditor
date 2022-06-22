import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { APIReturnType, base_API_URL } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import {
  Language,
  IProjectBoxProps,
  IProjectProps,
} from "../component-types/propTypes";
import {
  faPlus,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import "./login.css";
import "./Home.scss";

import pythonlogo from "../assets/python.png";
import javalogo from "../assets/java.jpg";
import javascriptlogo from "../assets/javascript.png";
import csharplogo from "../assets/csharp.png";
import {
  disconnectProject,
  setLanguage,
  setOwner,
  updateEditor,
  updateProjectName,
  updateRoom,
} from "../component-types/stateTypes";

const Home = (props: IProjectProps) => {
  const mainUser = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [projects, setProjects] = useState<any>([]);
  const [SharedProjects, setSharedProjects] = useState<any>([]);
  const connected = useAppSelector(
    (state) => state.projectConnection.connected
  );
  useEffect(() => {
    componentInitCheck();
    const loadProjects = async () => {
      await fetch(`${base_API_URL}/Projects/GetProjects/${mainUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Status === "Success") {
            setProjects(data.Data);
          }
        });
    };
    // creates a api call to get all the Shared projects per user
    const loadSharedProjects = async () => {
      await fetch(`${base_API_URL}/SharedProj/GetSharedProjects/${mainUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Status === "Success") {
            setSharedProjects(data.Data);
          }
        });
    };
    loadProjects();
    loadSharedProjects();
  }, []);

  useEffect(() => {
    connected && navigate("/Editor");
  });
  const componentInitCheck = () => {
    // if no user is logged in, log out again
    if (mainUser.id === -1) navigate("/");
    // disconnecting from any connected project for each page other than editor
    dispatch(disconnectProject());
  };

  const projectsComp = projects?.map(
    (
      e: { language: Language; name: string; ID: number; owner: number },
      i: number
    ) => (
      <ProjectBox
        key={e.ID}
        language={e.language}
        projectName={e.name}
        owner={e.owner}
        ID={e.ID}
        joinRoom={props.joinRoom}
        fadeTiming="second"
      />
    )
  );

  //function for creating components on homepage
  const SharedProjectsComp = SharedProjects?.map(
    (
      e: { language: Language; name: string; ID: number; owner: number },
      i: number
    ) => (
      <ProjectBox
        key={e.ID}
        language={e.language}
        projectName={e.name}
        ID={e.ID}
        owner={e.owner}
        joinRoom={props.joinRoom}
        fadeTiming="second"
      />
    )
  );

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
              {projects.length !== 0 ? (
                projectsComp
              ) : (
                <div>No projects found</div>
              )}
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
              <h3 className="projects-title">Shared With Me</h3>
              <hr />
            </div>
            <div className="projects-body">
              {SharedProjects.length !== 0 ? (
                SharedProjectsComp
              ) : (
                <div>No projects found</div>
              )}
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
  const mainUser = useAppSelector((state) => state.user);
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

  const updateMyProjectTimestampAPICall = async (room: number) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID: mainUser.id, projectID: room }),
    };

    fetch(`${base_API_URL}/Projects/UpdateTimeStamp`, requestOptions).then(
      (response) => response.json()
    );
  };

  const handleClick = () => {
    updateMyProjectTimestampAPICall(props.ID);
    fetch(`${base_API_URL}/joinsession?project_id=${props.ID}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(updateProject);
  };

  const updateProject = async (data: APIReturnType) => {
    if (data.Status === "Success") {
      setSharedProjectsAPICall();
      dispatch(setLanguage(props.language));
      dispatch(updateProjectName(props.projectName));
      dispatch(updateEditor(data.Data[0].Code));
      dispatch(updateRoom(props.ID.toString()));
      dispatch(setOwner(props.owner));
      // console.log(data.Data[0].ID)
      await props.joinRoom(props.ID.toString());
    }
  };

  //API call for adding or modifying data in SharedProjects when an user clicks on a project on the homepage
  const setSharedProjectsAPICall = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID: mainUser.id, projectID: props.ID }),
    };

    fetch(`${base_API_URL}/SharedProj/SetSharedProject`, requestOptions).then(
      (response) => response.json()
    );
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
