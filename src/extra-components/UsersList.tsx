import React from "react";
import { useAppSelector } from "../component-types/hooks";
import "./UserList.scss";

// style="display:block;top:50px;left:200px"
const UsersList = () => {
  const users = useAppSelector((state) => state.editor.currentUsers);
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
