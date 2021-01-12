import React from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";
import { Login } from './Login';
import { Signup } from './Signup'
import { AuthContext } from "../Context/AuthContext";
import Background from '../../images/background.jpeg'

export function AuthContainer (props) {

    const [isExpanded, setExpanded] = React.useState(false);

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
          setExpanded(false);
        }, expandingTransition.duration * 1000 - 1500);
    };

    const switchToSignup = () => {
        playExpandingAnimation();
        setTimeout(() => {
          setActive("signup");
        }, 400);
      };
    
      const switchToSignin = () => {
        playExpandingAnimation();
        setTimeout(() => {
          setActive("signin");
        }, 400);
      };

    const [active, setActive] = React.useState("signin");
    const contextValue = { switchToSignup, switchToSignin };
    return (
        <AuthContext.Provider value={contextValue}>
            <BackgroundContainer>
            <MainContainer>
                <OuterContainer data-test='outer-container'>
                    <Bubble 
                        data-test='bubble-drop'
                        initial={false}
                        animate={isExpanded ? "expanded" : "collapsed"}
                        variants={backdropVariants}
                        transition={expandingTransition}
                    />
                    {active === "signin" && (
                    <HeaderComponent data-test='header-container'>
                        <HeaderStyles>Welcome</HeaderStyles>
                        <HeaderStyles>Back</HeaderStyles>
                        <TextStyles data-test='text-style'>Please sign-in to continue!</TextStyles>
                    </HeaderComponent>
                    )}

                    {active === "signup" && (
                    <HeaderComponent data-test='header-container'>
                        <HeaderStyles>Create</HeaderStyles>
                        <HeaderStyles>Account</HeaderStyles>
                        <TextStyles data-test='text-style'>Please sign-up to continue!</TextStyles>
                    </HeaderComponent>
                    )}
                </OuterContainer>
                <InnerContainer data-test='inner-container'>
                    {active === "signin" && <Login />}
                    {active === "signup" && <Signup />}
                </InnerContainer>
            </MainContainer>
            </BackgroundContainer>
        </AuthContext.Provider>
    )
}

const BackgroundContainer = styled.div`
    height: 100%;
    width: 100%;
    background-image: url(${Background});
    backgroundSize: 'cover'
`

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 600px;
    width: 280px;
    border-radius: 19px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
    margin: auto;
    margin-top: 5%;
    margin-bottom: 19%;
`

const Bubble = styled(motion.div)`
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    top: -289px;
    left: -69px;
    width: 160%;
    height: 550px;
    transform: rotate(60deg)
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(68,232,179,1) 0%, rgba(0,212,255,1) 100%);

`

const OuterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 5em;
    width: 100%;
    height: 250px;
`

const HeaderComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderStyles = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const TextStyles = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
};

const backdropVariants = {
    expanded: {
      width: "233%",
      height: "1050px",
      borderRadius: "20%",
      transform: "rotate(60deg)",
    },
    collapsed: {
      width: "160%",
      height: "550px",
      borderRadius: "50%",
      transform: "rotate(60deg)",
    },
};