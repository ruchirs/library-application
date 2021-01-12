import React from "react";
import styled from "styled-components";
import Tile from '../../images/tile.jpg'

function BookItem({
  title,
  summary,
  author,
  image_path,
  vote_avg,
  _id,
  isbn,
  handleClick,
  props,
}) {
  return (
    <div className="book">
      <img
        src={Tile}
        alt={title}
      />
      <div className="book-info">
        <h3>
          {title} - {author}
        </h3>
      </div>
      <div className="book-overview">
        <ActionButton onClick={() => handleClick(_id, author, isbn, summary, title)}>
            {props === "return" ? "Return" : "Borrow"}
            
        </ActionButton>
        <h3>Summary:</h3>
        <p>{summary}</p>
      </div>
    </div>
  );
}

const ActionButton = styled.button`
  padding: 11px 10%;
  outline: 0;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(68,232,179,1) 0%, rgba(0,212,255,1) 100%);

  &:hover {
    filter: brightness(1.03);
  }
`;

export default BookItem;
