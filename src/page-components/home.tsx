import React from "react";
import "./login.css";
var pythonlogo = require("../assets/python.png");
var javalogo = require("../assets/java.jpg");

export class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="row fadeInDown">
          <div className="col-md-4 m-5">
            <ul className="list-group">
              <div className="fadeIn first">
                <li className="list-group-item m-3">
                  <img
                    src={pythonlogo}
                    alt="Project Icon"
                    className="projectlogo"
                  />
                  <a href="./editor">First Project</a>
                </li>
              </div>

              <div className="fadeIn first">
                <li className="list-group-item m-3">
                  <img
                    src={javalogo}
                    alt="Project Icon"
                    className="projectlogo"
                  />
                  <a href="./editor">Second Project</a>
                </li>
              </div>

              <div className="fadeIn second">
                <li className="list-group-item m-3">
                  <img
                    src={javalogo}
                    alt="Project Icon"
                    className="projectlogo"
                  />
                  <a href="./editor">Third Project</a>
                </li>
              </div>

              <div className="fadeIn second">
                <li className="list-group-item m-3">
                  <img
                    src={pythonlogo}
                    alt="Project Icon"
                    className="projectlogo"
                  />
                  <a className="pr-3" href="./editor">
                    Fourth Project
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>

        <div className="fadeIn third position-absolute new">
          <a
            href="/NewProject"
            className="btn btn-primary btn-lg active"
            role="button"
            aria-pressed="true"
          >
            New Project
          </a>
        </div>

        <div className="fadeIn third position-absolute join">
          <a
            href="/JoinProject"
            className="btn btn-primary btn-lg active"
            role="button"
            aria-pressed="true"
          >
            Join Project
          </a>
        </div>

        <div className="fadeIn fourth position-absolute logout">
          <a href="/login" className="btn btn-danger">
            Logout
          </a>
        </div>
      </div>
    );
  }
}

export default Home;
