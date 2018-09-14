import React from 'react'
import { Link } from 'react-router-dom'

class Shelves extends React.Component {

    render() {
        const { shelfTitle,
                currentShelf,
                onUpdateShelf,
         } = this.props    

        return (              
        <div>  
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {currentShelf.map((book) => (                               
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ 
                                        width: 128, 
                                        height: 193,
                                        backgroundImage: book.imageLinks.thumbnail !== undefined ? `url(${book.imageLinks.thumbnail})` : `url(https://dummyimage.com/128x193/292929/e3e3e3&text=No)`}}>
                                    </div>
                                    <div className="book-shelf-changer">
                                    <select value={(book.shelf) ? book.shelf : 'none'} onChange={(value) => {onUpdateShelf(book, value); console.log(currentShelf)}}>
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
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
        )
    }
}

export default Shelves