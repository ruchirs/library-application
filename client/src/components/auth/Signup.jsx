import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  Select,
} from "./common";
import { Alignment } from "../pageAlignment/index";
import { AuthContext } from "../Context/AuthContext";
import axios from '../../axios'

export function Signup(props) {
  const { switchToSignin } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [role, setRole] = useState('USER')
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/

  const userRoles = [
      {role: 'USER', key: 'user'},
      {role: 'ADMIN', key: 'admin'}
  ]

  const registerUser = async () => {
    try{
      if(name && email && password && confirmPassword && role) {
          if(!emailRegex.test(email)) {
              return setError('Invalid Email.')
          }
          if(password === confirmPassword){
              const request = await axios.post('/user/signup', 
              {
                  email: email,
                  password: password,
                  name: name,
                  role: role.toLowerCase()
              })
              if(request){
                switchToSignin()   
              }
              
          } else {
              setError("Passwords do not match.")
          }
      } else {
          setError("Please complete the missing fields.")
      }
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  const handleChange = (e) => {
    setRole(e.target.value);
 };

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <Input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
        <Select onChange={handleChange} value={role}>
          {userRoles.map((userRole) => {
            return <option key={userRole.role} value={userRole.role}>{userRole.role}</option>
          })}
        </Select>
      </FormContainer>
      <Alignment direction="vertical" margin={10} />
      <MutedLink style={{color: 'red'}}>{error}</MutedLink>
      <Alignment direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={() => registerUser()}>Signup</SubmitButton>
      <Alignment direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
