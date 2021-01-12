import "./App.css";
import { AuthContainer } from "./components/auth/index";
import styled from "styled-components";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Main } from "./components/Main.js";
import { Header } from "./components/common/index";
import { useEffect, useState } from "react";
import Axios from "./axios";
import { UserContext } from "./components/Context/UserContext";

function App() {
  const verifiedToken = localStorage.getItem("token");
  const [role, setRole] = useState("");
  const [books, setBooks] = useState("");

  const getUserDetails = async () => {
    try {
      const getUserDetail = await Axios.get("/user/user-details");
      setRole(getUserDetail.data.role);
      setBooks(getUserDetail.data.booksList);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ role, setRole, books, setBooks }}>
        <AppContainer>
          {verifiedToken ? (
            <StyledComponents>
              <Header />
              <Main />
            </StyledComponents>
          ) : (
            <Route
              path="/"
              exact
              component={AuthContainer}
              data-test="auth-component"
            />
          )}
        </AppContainer>
      </UserContext.Provider>
    </Router>
  );
}

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledComponents = styled.div`
  width: 100%;
`;

export default App;
