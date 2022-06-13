import React, { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

import { closeShareProjects, User } from "../component-types/stateTypes";
import { useAppDispatch, useAppSelector } from "../component-types/hooks";
import { APIReturnType, base_API_URL } from "../App";

import "./ShareProject.css";
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
  const mainUser = useAppSelector((state) => state.user);

  const shareProject = async (e: FormEvent) => {
    e.preventDefault();
    await shareProjectAPI();
  };

  const shareProjectAPI = async () => {
    if (userToShareWith.username === mainUser.username) {
      toast.error(
        `You already own this project, no need to share it with yourself...`,
        {
          position: "top-center",
        }
      );
      return;
    }
    await fetch(`${base_API_URL}/Users/Username/${userToShareWith.username}`)
      .then((response) => response.json())
      .then(handleSettingUser);
  };

  const handleSettingUser = async (data: APIReturnType) => {
    if (data.Status === "Success") {
      const shareUser = data.Data[0];
      setSharedProjectAPI({ id: shareUser.ID, username: shareUser.username });
    } else if (data.Status === "Failed") {
      toast.error(
        `User ${userToShareWith.username} not found... (note that a username is case sensitive)`,
        {
          position: "top-center",
        }
      );
    }
  };

  const setSharedProjectAPI = async (shareUser: User) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserID: shareUser.id, ProjectID: room }),
    };

    await fetch(`${base_API_URL}/RecentProj/SetRecentProject`, requestOptions)
      .then((response) => response.json())
      .then((data) => handleSharedProjectAPIResponse(data, shareUser));
  };

  const handleSharedProjectAPIResponse = (
    data: APIReturnType,
    shareUser: User
  ) => {
    if (data.Status === "Success") {
      toast.success(`Succesfully shared project with ${shareUser.username}`, {
        position: "top-center",
      });
    } else if (data.Status === "Failed") {
      toast.error("Sharing project failed...", {
        position: "top-center",
      });
    }
  };

  return shareProjectOpen ? (
    <div>
      <div className="wrapper fadeInDown popup">
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
              id="username"
              className="fadeIn second standard-input"
              name="newUsername"
              placeholder="Username"
            ></input>
            <input
              type="submit"
              className="fadeIn fourth standard-input"
              value="Share Project"
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
