import { connected } from "process";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IEditorProps, IEditorState } from "../component-types/ProjectTypes";


import "./login.css";

export class JoinProject extends React.Component<IEditorProps, IEditorState> {
    constructor(props: IEditorProps) {
    super(props);
      this.state = {
        room: "",
        language: "",
        connected: false
      };
    }
    
    // private navigate = useNavigate();
    private join = async() => {
        await this.props.joinRoom(this.props.user, this.state.room);
        this.setState({connected: true});

        
    }

    render() {
        return (
            <div>
                {this.state.connected == true
                ?   
                    <div>
                        {console.log("before navigating: " + this.state.connected)}
                        <Navigate to="/Editor" />
                    </div>
                :
                
                    <div className="wrapper fadeInDown">
                        <div id="formContent">

                            <div className="fadeIn first">
                            </div>

                            <form onSubmit={e => {
                                e.preventDefault();
                                this.join()
                                // let navigation = useNavigate();
                                // this.setState({connected: this.join()});
                                // navigation.navigate('/editor');
                                // this.navigate(-1);
                                // document.location.href = "Editor";
                                
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