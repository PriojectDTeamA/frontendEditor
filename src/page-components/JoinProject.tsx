import React from "react";

import "./login.css";







export class JoinProject extends React.Component {

    render() {
        return (
            <div>
                <div className="wrapper fadeInDown">
                    <div id="formContent">

                        <div className="fadeIn first">
                        </div>

                        <form>
                            <input type="text" id="projname" className="fadeIn second" name="newproj" placeholder="Project Name"></input>

                            <input type="submit" className="fadeIn fourth" value="Join Project"></input>
                        </form>
                    </div>
                </div>

            </div>


        );
    }
}

export default JoinProject