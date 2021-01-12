import React from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Alignment } from "../pageAlignment/index";
import { AuthContext } from "../Context/AuthContext";
import axios from '../../axios'
const createHistory = require("history").createBrowserHistory;

export function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const switchToSignup = React.useContext(AuthContext).switchToSignup;
  const [error, setError] = React.useState('');

const login = async () => {
    try{
        if(email && password){
            const request = await axios.post('/user/login', {email: email, password: password})
            localStorage.setItem('token', request.data.token)
            let history = createHistory();
            history.push('/dashboard');
            let pathUrl = window.location.href;
            window.location.href = pathUrl;

        } else {
            setError("Please enter missing fields.")
        }
    } catch(err){
        setError(err.response.data.message)
    }
}

  return (
    <BoxContainer>
      <FormContainer>
        <Input data-test="input-box" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      </FormContainer>
      <Alignment direction="vertical" margin={10} />
      <MutedLink style={{color: 'red'}}>{error}</MutedLink>
      <Alignment direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={() => login()}>Signin</SubmitButton>
      <Alignment direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
