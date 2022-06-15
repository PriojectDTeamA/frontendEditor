import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { APIReturnType, base_API_URL } from "../App";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { IProjectProps, Language } from "../component-types/propTypes";
import {
  disconnectProject,
  setLanguage,
  updateEditor,
  updateProjectName,
  updateRoom,
} from "../component-types/stateTypes";

import "./login.css";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const NewProject = (props: IProjectProps) => {
  const connected = useAppSelector(
    (state) => state.projectConnection.connected
  );
  const project_owner_id = useAppSelector((state) => state.user.id);
  const language = useAppSelector((state) => state.editor.language);
  const project_name = useAppSelector(
    (state) => state.projectConnection.projectName
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
  });

  const createNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (project_name === "") {
      toast.error("No project name was given...", { position: "top-center" });
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language,
        project_name,
        project_owner_id,
      }),
    };
    try {
      await passProjectOptionsToServer(requestOptions);
    } catch (error) {
      console.error(error);
    }
  };

  // the timestamp of the new project is also set with this api call
  const passProjectOptionsToServer = async (requestOptions: RequestInit) => {
    fetch(`${base_API_URL}/createsession`, requestOptions)
      .then((response) => response.json())
      .then(checkReturnStatus);
  };

  const checkReturnStatus = async (data: APIReturnType) => {
    if (data.Status === "Success") {
      updateProjectOptionsAndCreateRoom(data.Data[0]);
    } else if (data.Status === "Failed") {
      toast.error(data.Message, { position: "top-center" });
      console.warn(data.Message);
    }
  };

  const updateProjectOptionsAndCreateRoom = async (
    projectData: Record<string, any>
  ) => {
    dispatch(updateEditor(projectData.Code));
    await props.joinRoom(projectData.ID);
    dispatch(updateRoom(projectData.ID));
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
                float: "left",
                position: "relative",
                cursor: "pointer",
              }}
            />
          </div>
          <br />
          <div className="fadeIn first"></div>
          <form onSubmit={(e) => createNew(e)}>
            <input
              type="text"
              id="projname"
              className="fadeIn second standard-input"
              name="newproj"
              placeholder="Project Name"
              onChange={(e) => dispatch(updateProjectName(e.target.value))}
            ></input>
            <select
              style={{
                border: "1px solid transparent",
                fontFamily: "sans-serif",
                fontSize: "14",
                textAlignLast: "center",
                padding: "5px",
                borderRadius: "5px",
              }}
              id="language"
              name="language"
              placeholder="Language"
              className="fadeIn third"
              onChange={(e) =>
                dispatch(setLanguage(e.target.value as Language))
              }
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
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default NewProject;
