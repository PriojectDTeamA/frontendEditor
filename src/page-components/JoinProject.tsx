import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { APIReturnType, base_API_URL } from "../App";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { IProjectProps } from "../component-types/propTypes";
import {
  disconnectProject,
  setLanguage,
  updateEditor,
  updateRoom,
} from "../component-types/stateTypes";

import "./login.css";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { Right } from "react-bootstrap/lib/Media";
import { cursorTo } from "readline";

const JoinProject = (props: IProjectProps) => {
  const room = useAppSelector((state) => state.projectConnection.currentRoom);
  const connected = useAppSelector(
    (state) => state.projectConnection.connected
  );
  const mainUser = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    componentInitCheck();
  }, []);

  const componentInitCheck = () => {
    // if no user is logged in, log out again
    if (mainUser.id === -1) navigate("/");
    // disconnecting from any connected project for each page other than editor
    dispatch(disconnectProject());
  };

  useEffect(() => {
    connected === true && navigate("/Editor");
  }, [connected, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (room === "") {
      toast.error("No project name detected...", {
        position: "top-center",
      });
    } else {
      join();
    }
  };

  const join = async () => {
    try {
      await joinProjectApiCall();
    } catch (error) {
      console.error(error);
    }
  };

  const joinProjectApiCall = async () => {
    fetch(`${base_API_URL}/joinsession?project_id=${room}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(handleProjectData);
  };

  //API call for adding or modifying data to Recentprojects whenuser joins an existing project
  const setRecentProjectsAPICall = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserID: mainUser.id, ProjectID: room }),
    };

    fetch(`${base_API_URL}/RecentProj/SetRecentProject`, requestOptions).then(
      (response) => response.json()
    );
  };

  const handleProjectData = async (data: APIReturnType) => {
    if (data.Status === "Success") {
      setRecentProjectsAPICall();
      updateProjectOptionsAndJoinRoom(data.Data[0]);
    } else if (data.Status === "Failed") {
      toast.error("joining project failed... (room might not exist?)", {
        position: "top-center",
      });
    }
  };

  const updateProjectOptionsAndJoinRoom = async (
    projectData: Record<string, any>
  ) => {
    dispatch(setLanguage(projectData.Language));
    dispatch(updateEditor(projectData.Code));
    await props.joinRoom(projectData.ID);
  };

  return (
    <div>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="exit-button">
            <FontAwesomeIcon
            onClick={(e) => navigate("/Home")}
            className="icon"
            icon={faXmarkCircle}
            style={{
              float: 'left',
              position: 'relative',
              cursor: 'pointer'
            }}
            
            />
          </div>
          <br/>

          <div className="fadeIn first"></div>
          <form onSubmit={submit}>
            <input
              type="text"
              value={room}
              onChange={(e) => dispatch(updateRoom(e.target.value))}
              id="projname"
              className="fadeIn second standard-input"
              name="newproj"
              placeholder="Project Name"
            ></input>
            <input
              type="submit"
              className="fadeIn fourth standard-input"
              value="Join Project"
            ></input>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default JoinProject;
