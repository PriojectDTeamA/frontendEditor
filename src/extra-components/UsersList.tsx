import React from "react";
import { useAppSelector } from "../component-types/hooks";
import "./UserList.scss";

const UsersList = () => {
  // TODO: this should get the users from currentUsers once login is fixed and each user has an id
  const users = useAppSelector((state) => state.editor.stringUsers);
  return (
    <div className="user-popover">
      <h4 className="popover-title">Joined Users</h4>
      <div className="popover-content">
        {users.map((u, idx) => (
          <h6 key={idx}>{u}</h6>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
