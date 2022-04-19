import { connected } from "process";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Language } from "../component-types/EditorTypes";
import { IProjectProps, IProjectState } from "../component-types/ProjectTypes";

import "./login.css";

export class JoinProjectClass extends React.Component<
  IProjectProps,
  IProjectState
> {
  constructor(props: IProjectProps) {
    super(props);
    this.state = {
      room: "",
      language: "",
      connected: false,
    };
  }

  // private navigate = useNavigate();
  private join = async () => {
    await this.props.joinRoom(this.props.user, this.state.room);
    this.setState({ connected: true });
  };

  render() {
    return (
      <div>
        {this.state.connected === true ? (
          <div>
            {console.log("before navigating: " + this.state.connected)}
            <Navigate to="/Editor" />
          </div>
        ) : (
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first"></div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.join();
                  // let navigation = useNavigate();
                  // this.setState({connected: this.join()});
                  // navigation.navigate('/editor');
                  // this.navigate(-1);
                  // document.location.href = "Editor";
                }}
              >
                <input
                  type="text"
                  value={this.state.room}
                  onChange={(e) => this.setState({ room: e.target.value })}
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
  }
}

// functional component
const JoinProject = (props: IProjectProps) => {
  const [room, setRoom] = useState("");
  const [language, setLanguage] = useState<Language | "">("");
  const [connected, setConnected] = useState(false);

  const join = async () => {
    await props.joinRoom(props.user, room);
    setConnected(true);
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
                onChange={(e) => setRoom(e.target.value)}
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
