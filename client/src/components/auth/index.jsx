import React from 'react';
import styled from 'styled-components';

export function AuthContainer (props) {
    return (
        <MainContainer>
            <OuterContainer>
                <Bubble />
            </OuterContainer>
        </MainContainer>
    )
}

const MainContainer = styled.div`
    overflow: hidden;
    min-height: 550px;
    width: 280px;
    border-radius: 19px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
`

const Bubble = styled.div`
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