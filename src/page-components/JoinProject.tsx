import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { IProjectProps } from "../component-types/propTypes";
import { setLanguage, updateProjectName } from "../component-types/stateTypes";

import "./login.css";

const JoinProject = (props: IProjectProps) => {
  const room = useAppSelector((state) => state.projectConnection.currentRoom);
  const projectName = useAppSelector(
    (state) => state.projectConnection.projectName
  );
  const connected = useAppSelector(
    (state) => state.projectConnection.connected
  );
  //const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const join = async () => {
    await props.joinRoom();
    dispatch(setLanguage("python")); // TODO: load this dynamically from an API call
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
              value={projectName}
              onChange={(e) => dispatch(updateProjectName(e.target.value))}
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
