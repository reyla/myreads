import React from 'react'
import { Route } from 'react-router-dom'
import Shelves from './Shelves'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf(book, event) {
    BooksAPI.update(book, event.target.value).then(
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    )
  }  

  render() {
    return (
      <div className="app">
        <Route path="/search" component={Search}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                <Shelves 
                  shelfTitle='Currently Reading' 
                  currentShelf={this.state.books.filter((book) => {return book.shelf === 'currentlyReading'})} 
                  onUpdateShelf={this.updateShelf} />
                <Shelves 
                  shelfTitle='Read' 
                  currentShelf={this.state.books.filter((book) => {return book.shelf === 'read'})} 
                  onUpdateShelf={this.updateShelf} />
                <Shelves 
                  shelfTitle='Want To Read' 
                  currentShelf={this.state.books.filter((book) => {return book.shelf === 'wantToRead'})} 
                  onUpdateShelf={this.updateShelf} />
                </div>
            </div>
          </div>
            )}/>
      </div>
    )
  }
}

export default BooksApp
