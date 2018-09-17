import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'

class Search extends React.Component {
    state = {
        queryResults: []
    }

    search(query) {
        // check if search query has a value
        if (query.target.value !== '') {
            BooksAPI.search(query.target.value).then((results) => {
                if (results.error) {
                    // if there are no results then display nothing
                    this.setState({ queryResults: [] })
                } else {
                    // go through search results one book at a time
                    results.map((result) => {
                        // we're passing in the current books already on your shelves
                        // it is an array from BooksApp state (see App.js)
                        let currentBooks = this.props.books;
                        // look for the book in that books array based on ID and return the index
                        let bookIndex = currentBooks.findIndex(oldBook => oldBook.id === result.id);
                        // if the book already exists in your array (i.e. index is 0,1,2 etc)
                        if (bookIndex !== -1) {
                            // set the shelf correctly
                            result.shelf = currentBooks[bookIndex].shelf
                        } else {
                            // set default shelf to none
                            result.shelf = 'none'
                        }
                        return result
                    })
                    results.sort(sortBy('title'));
                    // fill array with results from search
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

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't 
                        worry if you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            onChange={(event) => this.search(event)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <h3 className="search-results">Your search has {queryResults.length} results</h3>
                    <ol className="books-grid">
                    {queryResults.map((book) => (
                        <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, 
                                                                     height: 193, 
                                                                     // check if there are images, otherwise set default
                                                                     backgroundImage: book.imageLinks !== undefined ? `url(${book.imageLinks.thumbnail})` : `url('https://dummyimage.com/128x193/ddd/000&text=No+Image')`}}> 
                                </div>
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