import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import "./Login.css";

const LoginForm = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginHandler } = props;

    let logInUser = async () => {
        try {
            const res = await axios.post('http://localhost:3001/api/users/login', { email, password });
            if (res.status === 200) {
                console.log("User log in successful");
                localStorage.token = res.data.token;
                localStorage.userId = res.data.userId;
                localStorage.username = res.data.username;
                localStorage.userImg = res.data.userImg;
                loginHandler();
            } else {
                console.log("FAIL log in"); //TODO
            }
        } catch (err) {
            console.log("Failed to send request:", err);
        }
    }

    let handleSubmit = event => {
        event.preventDefault();
        logInUser();
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <FormControl
                        autoFocus
                        placeholder="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormControl
                        value={password}
                        placeholder="password"
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        required
                    />
                </FormGroup>
                <Button variant="info" block bsSize="large" type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}

export default withRouter(LoginForm);