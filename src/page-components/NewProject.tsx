import React from "react";

import "./login.css";







export class NewProject extends React.Component {

    render() {
        return (
            <div>
                <div className="wrapper fadeInDown">
                    <div id="formContent">

                        <div className="fadeIn first">
                        </div>

                        <form>
                            <input type="text" id="projname" className="fadeIn second" name="newproj" placeholder="Project Name"></input>
                            <select id="language" name="language" placeholder="Language" className="fadeIn third">
                                <option value="csharp">C#</option>
                                <option value="java">Java</option>
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                            </select>
                            <input type="submit" className="fadeIn fourth" value="Create"></input>
                        </form>
                    </div>
                </div>

            </div>


        );
    }
}

export default NewProject