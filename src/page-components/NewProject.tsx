import React from "react";
import { useNavigate } from "react-router-dom";
import { base_API_URL } from "../App";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { IProjectProps, Language } from "../component-types/propTypes";
import {
  setLanguage,
  updateEditor,
  updateProjectName,
  updateRoom,
} from "../component-types/stateTypes";

import "./login.css";

const NewProject = (props: IProjectProps) => {
  const connected = useAppSelector(
    (state) => state.projectConnection.connected
  );
  const project_owner_id = useAppSelector((state) => state.user.id);
  const language = useAppSelector((state) => state.editor.language);
  const project_name = useAppSelector(
    (state) => state.projectConnection.projectName
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createNew = async (e: React.FormEvent) => {
    if (project_name === "") return;
    e.preventDefault();
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
      await fetch(`${base_API_URL}/createsession`, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          if (data.Status === "Success") {
            const projectData = data.Data[0];
            dispatch(updateRoom(projectData.ID));
            dispatch(updateEditor(projectData.Code));
            //dispatch(setLanguage(projectData.language));
            console.log(language);
            await props.joinRoom();
          } else if (data.Status === "Failed") {
            console.log(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {connected && navigate("/Editor")}
      <div className="wrapper fadeInDown">
        <div id="formContent">
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
    </div>
  );
};

export default NewProject;
