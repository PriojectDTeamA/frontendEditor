import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IEditorProps, IEditorState } from "../component-types/ProjectTypes";


import "./login.css";








export class JoinProject extends React.Component<IEditorProps, IEditorState> {
    constructor(props: IEditorProps) {
    super(props);
      this.state = {
        room: "",
        language: ""
      };
    }
    

    render() {
        return (
            <div>
                {this.props.connection
                ?
                    <Navigate to="/Editor" />
                :
                
                    <div className="wrapper fadeInDown">
                        <div id="formContent">

                            <div className="fadeIn first">
                            </div>

                            <form onSubmit={e => {
                                e.preventDefault();
                                this.props.joinRoom(this.props.user, this.state.room);
                                
                            }}>
                                <input type="text" value={this.state.room} onChange={e => this.setState({room: e.target.value})} id="projname" className="fadeIn second" name="newproj" placeholder="Project Name"></input>

                                <input type="submit" className="fadeIn fourth" value="Join Project"></input>
                            </form>
                        </div>
                    </div>
                }

            </div>


        );
    }
}

export default JoinProject