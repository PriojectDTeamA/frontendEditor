import React from "react";
import { useAppDispatch } from "../component-types/hooks";
import { IProjectProps, Language } from "../component-types/propTypes";
import { setLanguage } from "../component-types/stateTypes";

import "./login.css";

const NewProject = (props: IProjectProps) => {
  const dispatch = useAppDispatch();

  const createNew = async (e: React.FormEvent) => {
    e.preventDefault();
    await props.joinRoom();
  };

  return (
    <div>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first"></div>
          <form onSubmit={(e) => createNew(e)}>
            <input
              type="text"
              id="projname"
              className="fadeIn second"
              name="newproj"
              placeholder="Project Name"
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
              className="fadeIn fourth"
              value="Create"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
