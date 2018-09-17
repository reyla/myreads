import React from 'react'

class Book extends React.Component {

    render() {
        const { onUpdateShelf,
         } = this.props    

        return (              
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ 
                        width: 128, 
                        height: 193,
                        // check if there are images, otherwise set default
                        backgroundImage: this.props.book.imageLinks !== undefined ? `url(${this.props.book.imageLinks.thumbnail})` : `url(https://dummyimage.com/128x193/ddd/000&text=No+Image)`}}>
                    </div>
                    <div className="book-shelf-changer">
                    <select value={(this.props.book.shelf) ? this.props.book.shelf : 'none'} onChange={(value) => {onUpdateShelf(this.props.book, value)}}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors}</div>
            </div>
        )
    }
}

export default Book
