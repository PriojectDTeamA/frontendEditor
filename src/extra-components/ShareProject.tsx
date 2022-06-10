import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

import { closeShareProjects, User } from "../component-types/stateTypes";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { APIReturnType, base_API_URL } from "../App";

import "login.css";
import "react-toastify/dist/ReactToastify.css";

const ShareProject = () => {
  const dispatch = useAppDispatch();
  const [userToShareWith, setShareUser] = useState<User>({
    id: -1,
    username: "",
  });
  const room = useAppSelector((state) => state.projectConnection.currentRoom);
  const shareProjectOpen = useAppSelector(
    (state) => state.editor.shareProjectsShown
  );

  const shareProject = async () => {
    // gets the right user and sets it to setShareUser, checks if the user that is added to the project is the same as the current user
    await getUserAPI();
    // exit if the user is not set yet
    if (userToShareWith.id === -1) {
      return;
    }
    // if the user is set, share the project with the user
    await setSharedProjectAPI();
  };

  const getUserAPI = async () => {
    fetch(`${base_API_URL}/getUser/${userToShareWith.username}`)
      .then((response) => response.json())
      .then(handleSettingUser);
  };

  const handleSettingUser = async (data: APIReturnType) => {
    if (data.Status === "Success") {
      // set user here
    } else if (data.Status === "Failed") {
      toast.error(
        `User ${userToShareWith.username} not found... (note that a username is case sensitive)`,
        {
          position: "top-center",
        }
      );
    }
  };

  const setSharedProjectAPI = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserID: userToShareWith.id, ProjectID: room }),
    };

    fetch(`${base_API_URL}/RecentProj/SetRecentProject`, requestOptions)
      .then((response) => response.json())
      .then(handleSharedProjectAPIResponse);
  };

  const handleSharedProjectAPIResponse = (data: APIReturnType) => {
    if (data.Status === "Success") {
    } else if (data.Status === "Failed") {
      toast.error("Sharing project failed...", {
        position: "top-center",
      });
    }
  };
  return shareProjectOpen ? (
    <div>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="exit-button">
            <FontAwesomeIcon
              onClick={() => dispatch(closeShareProjects())}
              className="icon"
              icon={faXmarkCircle}
              style={{
                float: "left",
                position: "relative",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="fadeIn first"></div>
          <form onSubmit={shareProject}>
            <input
              type="text"
              value={userToShareWith.username}
              onChange={(e) =>
                setShareUser({ id: -1, username: e.target.value })
              }
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
  ) : (
    <div style={{ display: "none" }}></div>
  );
};

export default ShareProject;
