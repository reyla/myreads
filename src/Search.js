import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Search extends React.Component {
    state = {
        queryResults: []
    }
    
    search(query) {
        if (query.target.value !== '') {
            BooksAPI.search(query.target.value).then((results) => {
                // if there are no results then display nothing
                if (results.error) {
                    this.setState({ queryResults: [] })
                } else {
                    results.map((result) => {
                        // check if all books in results have an image
                        if (result.imageLinks === undefined) {
                        result.imageLinks = `url(https://dummyimage.com/128x193/292929/e3e3e3&text=No)`;
                        }
                    })
                    this.setState({ queryResults: results })
                }    
            })
        } else if (query.target.value === '') {
          this.setState({ queryResults: [] })
        }
    }

    render() {
        const { onUpdateShelf } = this.props
        const { queryResults } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            onChange={(event) => this.search(event)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {queryResults.map((book) => (
                        <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                <select value={book.shelf} onChange={(event) => {onUpdateShelf(book, event)}}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                        </div>
                    </li>
                    ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search