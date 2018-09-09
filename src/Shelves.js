import React from 'react'
import { Link } from 'react-router-dom'
import BooksApp from './App';

class Shelves extends React.Component {
 
    render() {
        const { books, 
                onUpdateShelf,
         } = this.props
        console.log(books)

        return (          
        <div>
            {books.map((book) => (
            <div className="bookshelf">
                <h2 className="bookshelf-title">shelfTitle</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">                                
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                    <select value={this.props.book.shelf} onChange={(event) => {this.props.updateShelf(this.props.book, event)}}>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading" onChange={() => onUpdateShelf(book, "currentlyReading")}>Currently Reading</option>
                                        <option value="wantToRead" onChange={() => onUpdateShelf(book, "wantToRead")}>Want to Read</option>
                                        <option value="read" onChange={() => onUpdateShelf(book, "read")}>Read</option>
                                        <option value="none" onChange={() => onUpdateShelf(book, "")}>None</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
             ))}        
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
        )

    }
}

export default Shelves