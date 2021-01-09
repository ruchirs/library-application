import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Alignment } from "../PageAlignment/index";
import { AuthContext } from "./AuthContext";
import axios from '../../axios'

export function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { switchToSignup } = useContext(AuthContext);
  const [error, setError] = useState('')

const login = async () => {
    try{
        if(email && password){
            const request = await axios.post('/user/login', {email: email, password: password})
            console.log('request', request)
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
        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
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
