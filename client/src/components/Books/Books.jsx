import React, { useEffect, useState, useContext } from "react";
import BookItem from "./BookItem";
import Axios from "../../axios";
import "./Books.css";
import { UserContext } from "../Context/UserContext";

const Books_API = "/books";

function Books() {
  const [booksList, setBooksList] = useState([]);
  const [error, setError] = useState("");

  const { setBooks, books } = useContext(UserContext);

  useEffect(() => {
    getBooks(Books_API);
  }, []);

  const getBooks = async (API) => {
    try {
      const getBooks = await Axios.get(API);
      setBooksList(getBooks.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  const borrowbook = async (_id, author, isbn, summary, title) => {
    try {
      if (_id) {
        const request = await Axios.post(`books/${_id}/update`, {
          status: "Borrowed",
          title: title,
          summary: summary,
          isbn: isbn,
          author: author,
        });
        if (request) {
          books.push(request.data);
          setBooks(books);
          getBooks(Books_API);
        }
      }
    } catch (err) {
      console.log("error", err);
      setError(err.response.data.message);
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div data-test="outer-container">
      <h2 data-test="error-container">{error}</h2>
      <div data-test="book-list-container" className="book-container">
        {booksList.length > 0 ? (
          booksList.map((book) => (
            <BookItem key={book._id} {...book} handleClick={borrowbook} />
          ))
        ) : (
          <h1>No Books Available</h1>
        )}
      </div>
    </div>
  );
}

export default Books;
