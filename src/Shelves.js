import React from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

class Shelves extends React.Component {

    render() {
        const { shelfTitle,
                currentShelf
         } = this.props    

        return (              
        <div>  
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {currentShelf.map((book) => (                               
                        <li key={book.id}>
                            <Book
                            book={book}
                            onUpdateShelf={this.props.onUpdateShelf}
                            />
                        </li>
                         ))} 
                    </ol>
                </div>
            </div>     
            <div className="open-search">
                <Link to={process.env.PUBLIC_URL + '/search'}>Add a book</Link>
            </div>
        </div>
        )
    }
}

export default Shelves