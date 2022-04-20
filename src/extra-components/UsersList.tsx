import React from "react";
import { IUserListProps } from "../component-types/UserListTypes";
import "./UserList.scss";

// style="display:block;top:50px;left:200px"
const UsersList = (props: IUserListProps) => {
  return (
    <div className="user-popover" >
        <h4 className="popover-title">Joined Users</h4>
        <div className="popover-content">{props.users.map((u:any, idx:any) => <h6 key={idx}>{u}</h6>)}</div>
    </div>

  );
};

export default UsersList;
