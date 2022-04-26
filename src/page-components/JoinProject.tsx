import React from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { IProjectProps } from "../component-types/propTypes";
import { updateRoom } from "../component-types/stateTypes";

import "./login.css";

// functional component
const JoinProject = (props: IProjectProps) => {
  const room = useAppSelector((state) => state.projectConnection.currentRoom);
  const language = useAppSelector((state) => state.editor.currentLanguage);
  const connected = useAppSelector(
    (state) => state.projectConnection.connected
  );
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const join = async () => {
    await props.joinRoom(user.username, room);
    // setConnected(true); // the equivalent of this happens in joinRoom when dispatch(connectProject()) gets activated
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
                // let navigation = useNavigate();
                // this.setState({connected: this.join()});
                // navigation.navigate('/editor');
                // this.navigate(-1);
                // document.location.href = "Editor";
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
