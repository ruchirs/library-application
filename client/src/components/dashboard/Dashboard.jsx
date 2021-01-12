import React, { useContext, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import styled from 'styled-components'
import BookItem from '../Books/BookItem'
import Axios from '../../axios'
import '../Books/Books.css'

export function Dashboard () {
    const { books, setBooks } = useContext(UserContext)
    const [error, setError] = useState('')

    //function to return a book
    const returnBook = async (_id, author, isbn, summary, title) => {
        try {
            if(_id){
                const request = await Axios.post(`books/${_id}/update`, {
                    status: 'Available',
                    title: title,
                    summary: summary,
                    isbn: isbn,
                    author: author
                })
                if(request){
                    let updatedBook = books.filter((book) => {
                        if(book._id !== _id){
                            return book
                        }
                    })
                    setBooks(updatedBook)
                }
            }
        } catch(err){
            setError(err.response.data.message)
        }
    }
    
    return(
        <DashboardStyles>
            <h1 className='alignItems'>Dashboard</h1>
            <h4 className='alignItems'>Borrowed books: ({books.length})</h4>
            <h4>{error}</h4>
            <div className='book-container'>
                {
                    (books.length > 0) ? books.map((book) => {
                        return <BookItem key={book._id}
                                    {...book} 
                                        props={'return'} 
                                            handleClick={returnBook}
                                            />
                    }) : <h4> No Books Borrowed!</h4>

                }
            </div>

        </DashboardStyles>
    )
}

const DashboardStyles = styled.div`
    .alignItems {
        display: flex;
        justify-content: center;
    }
`