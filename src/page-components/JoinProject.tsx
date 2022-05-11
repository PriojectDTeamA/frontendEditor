import React from "react";
import { useNavigate } from "react-router-dom";
import { APIReturnType, base_API_URL } from "../App";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { IProjectProps } from "../component-types/propTypes";
import {
  setLanguage,
  updateEditor,
  updateRoom,
} from "../component-types/stateTypes";

import "./login.css";

const JoinProject = (props: IProjectProps) => {
  const room = useAppSelector((state) => state.projectConnection.currentRoom);
  const connected = useAppSelector(
    (state) => state.projectConnection.connected
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const join = async () => {
    await fetch(`${base_API_URL}/joinsession?project_id=${room}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(async (data: APIReturnType) => {
        if (data.Status === "Succes") {
          const projectData = data.Data[0];
          dispatch(setLanguage(projectData.Language));
          dispatch(updateEditor(projectData.Code));
          await props.joinRoom();
        } else if (data.Status === "Failed") {
          console.warn("joining project failed... (room might not exist?)");
        }
      });
  };

  return (
    <div>
      {connected === true && navigate("/Editor")}
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first"></div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              join();
            }}
          >
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
    </div>
  );
};

export default JoinProject;
