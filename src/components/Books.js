import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false)
    const [searchParam, setSearchParam] = useState()

    // call to API to get all books
    useEffect(() => {
        setRefresh(false)
        // Call the server

    }, [])

    const handleSearch = (e) => {
        console.log(e.target.value)
        setSearchParam(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchParam}`)
            .then(response => {
                // check the response is good
                if (response.status === 200) {
                    // set books equal to 
                    console.log("Hitting the search data now", response.data)
                    console.log("data.items", response.data.items)
                    setBooks(response.data.items) 
                } else {
                    setError(response.statusText)
                }
                console.log(response)
                console.log("🎯🎯🎯🎯🎯")
            })
            .catch(err => {
                setError(err.message)
            })
    }

    let displayBooks = books.map((book, key) => {
        let authors = book.volumeInfo.authors.map((author, key) => {
            return (
                <span> {author} &nbsp;&nbsp; </span>
                )
        })
        return (
            <div>
                <Link to={`/book/${book.id}`}>
                Title: {book.volumeInfo.title} &nbsp;&nbsp;
                Published: {book.volumeInfo.publishedDate} &nbsp;&nbsp;
                Authors: {authors}
                </Link>
            </div>
        )
    })

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <br></br>
                <div>
                <label>
                    Search for books:
                    <input type="search" placeholder="Search Parameter" onChange={handleSearch} />
                </label>
                </div>
                <br></br>
                <input type="submit" value="Submit" />
                <button>Clear</button>
            </form>
            <p>----- Click a selection below to view more details -----</p>
            <div>
            {displayBooks}
            </div>
        </div>
        
    )
}