import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Alignment } from "../pageAlignment/index";
import { Input, Textarea } from "../auth/common";
import Axios from "../../axios";
import { UserContext } from "../Context/UserContext";
import { Redirect } from "react-router-dom";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState(0);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const { role } = useContext(UserContext);

  if (role === "user") {
    return <Redirect to="/dashboard" />;
  }

  const addBook = async () => {
    try {
      if (title && author && isbn && summary) {
        const createBook = await Axios.post("/books/create", {
          title,
          author,
          isbn,
          summary,
        });
        if (createBook) {
          setResponse("Book Added");
          window.location.href = "/books";
        }
      } else {
        setError("Please complete the missing fields.");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <OuterContainer>
      <AddBookContainer>
        <h1>Add New Book</h1>
        <p>{response}</p>
        <Input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Alignment direction="vertical" margin={10} />
        <Input
          type="text"
          placeholder="Author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Alignment direction="vertical" margin={10} />
        <Input
          type="number"
          placeholder="ISBN Number"
          onChange={(e) => setIsbn(e.target.value)}
        />
        <Alignment direction="vertical" margin={10} />
        <Textarea
          type="text"
          placeholder="Summary"
          onChange={(e) => setSummary(e.target.value)}
        />
        <Alignment direction="vertical" margin={10} />
      </AddBookContainer>
      <Alignment direction="vertical" margin={10} />
      <MutedLink>{error}</MutedLink>
      <Alignment direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={() => addBook()}>
        Add Book
      </SubmitButton>
      <Alignment direction="vertical" margin="1em" />
    </OuterContainer>
  );
}

const OuterContainer = styled.div`
  margin: 150px;
  height: 100%;
`;
const AddBookContainer = styled.div`
  width: 600px;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
`;

const SubmitButton = styled.div`
  width: 600px;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  margin: auto;

  padding: 11px 10%;
  outline: 0;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(68, 232, 179, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );

  &:hover {
    filter: brightness(1.03);
  }
`;

export const MutedLink = styled.a`
  display: flex;
  justify-content: center;
  font-size: 11px;
  color: red;
  font-weight: 600;
  text-decoration: none;
  margin: auto;
`;

export default AddBook;
