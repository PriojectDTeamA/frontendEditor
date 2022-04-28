import React from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { IProjectProps } from "../component-types/propTypes";
import { setLanguage, updateRoom } from "../component-types/stateTypes";

import "./login.css";

const JoinProject = (props: IProjectProps) => {
  const room = useAppSelector((state) => state.projectConnection.currentRoom);
  const connected = useAppSelector(
    (state) => state.projectConnection.connected
  );
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const join = async () => {
    await props.joinRoom();
    dispatch(setLanguage("python")); // TODO: load this dynamically from an API call
  };

  return (
    <div>
      {connected === true ? (
        <div>
          {console.log("before navigating: " + connected)}
          <Navigate to="/Editor" />
        </div>
      ) : (
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
                className="fadeIn second"
                name="newproj"
                placeholder="Project Name"
              ></input>
              <input
                type="submit"
                className="fadeIn fourth"
                value="Join Project"
              ></input>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinProject;
