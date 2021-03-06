import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowRight } from "react-icons/fa";
import axios from 'axios';
import { apiUrl } from '../../../utils';
import "./Login.css";

const LoginForm = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginHandler } = props;

    let logInUser = async () => {
        try {
            const res = await axios.post(apiUrl('/api/users/login'), { email, password });
            if (res.status === 200) {
                console.log("User log in successful");
                localStorage.token = res.data.token;
                localStorage.userId = res.data.userId;
                localStorage.username = res.data.username;
                localStorage.userImg = res.data.userImg;
                loginHandler();
            } else {
                console.log("FAIL log in");
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
                        placeholder="email:"
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
                <div id="logo-div">
                    <Button className="" variant="info" block bsSize="large" type="submit">
                        Login <FaArrowRight />
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default withRouter(LoginForm);