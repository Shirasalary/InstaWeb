import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";

class App extends React.Component {

    state = {
        username: "",
        password: "",
        repeatPassword: "",
        token: "",
        notes: [],
        newNote: "",
        errorCode : null,
        signUpPage : false
    }

    changeValueByKey = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    login = () => {
        axios.get("http://localhost:9030/login?username="
            + this.state.username + "&password=" + this.state.password)
            .then(response => {
                let key, value;
                if (response.data.success) {
                    key = "token";
                    value = response.data.token;

                }else {
                    key = "errorCode";
                    value = response.data.errorCode;
                }

                this.changeValueByKey(key,value);

            })
    }

    showErrorCode = () => {

        let errorMessage = "";
        switch (this.state.errorCode){

            case -1 : errorMessage = "Please fill in all fields"; break;
            case 104 : errorMessage = "not exist, SIGN-UP 😁";break;
        }
        return errorMessage;
    }

    signup = ()=>{

    }


// , () => {
//     axios.get("http://localhost:9030/get-notes?token=" + this.state.token)
// .then(response => {
//     this.setState({
//                       notes: response.data.notes
//                   })
// })
// }


    //לשמור פוסט חדש
    save = () => {
        axios.get("http://localhost:9030/save-new-note?content=" + this.state.newNote
        + "&token=" + this.state.token)
            .then(response => {
                const currentNotes = this.state.notes;
                currentNotes.push({
                    content: this.state.newNote
                });

                this.setState({
                    notes: currentNotes,
                    newNote: ""
                })
            })
    }

    // למחוק פתק
    removeNote = (id) => {
        axios.get("http://localhost:9030/remove-note?token="  + this.state.token
        + "&noteId=" + id)
            .then(reponse => {
                axios.get("http://localhost:9030/get-notes?token=" + this.state.token)
                    .then(response => {
                        this.setState({
                            notes: response.data.notes
                        })
                    })
            })
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.token.length > 0
                    ?
                        <div>
                            הצלחת להתחבר שכל
                        {/*    Notes: {this.state.notes.length}*/}
                        {/*    <ol>*/}
                        {/*        {*/}
                        {/*            this.state.notes.map(item => {*/}
                        {/*                return (*/}
                        {/*                    <li>*/}
                        {/*                        {item.content}*/}
                        {/*                        <button*/}
                        {/*                        onClick={() => this.removeNote(item.id)}*/}
                        {/*                        >Delete</button>*/}
                        {/*                    </li>*/}
                        {/*                )*/}
                        {/*            })*/}
                        {/*        }*/}
                        {/*    </ol>*/}
                        {/*    <input placeholder={"Enter text: "} value={this.state.newNote} onChange={(event) => this.onValueChange("newNote", event)}/>*/}
                        {/*    <button onClick={this.save} disabled={this.state.newNote.length == 0}>Save</button>*/}
                        </div>
                        :
                        <div>

                            <input
                                placeholder={"Enter username: "}
                                value={this.state.username}
                                onChange={(event) => this.changeValueByKey("username", event.target.value)}
                            />
                            <input placeholder={"Enter password: "} value={this.state.password}
                                   onChange={(event) => this.changeValueByKey("password", event.target.value)}

                            />

                            {this.state.signUpPage && (
                                <input
                                    placeholder={"Repeat password: "}
                                    value={this.state.repeatPassword}
                                    onChange={(event) => this.changeValueByKey("repeatPassword", event.target.value)}
                                />
                            )}

                            <button onClick={ this.state.signUpPage ?  this.signup : this.login}>
                                {this.state.signUpPage ? "SIGNUP" : "LOGIN"}
                            </button>

                            <button onClick={() => {
                                this.changeValueByKey("signUpPage", !this.state.signUpPage)
                                this.changeValueByKey("errorCode", null)
                            }}>
                                MOVE TO {this.state.signUpPage ? "LOGIN" : "SIGNUP"} PAGE
                            </button>

                            <div>{this.showErrorCode()}</div>

                        </div>
                }

            </div>
        );

    }
}

export default App;
