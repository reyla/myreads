import React from 'react'
import { Route } from 'react-router-dom'
import Shelves from './Shelves'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'
import sortBy from 'sort-by'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf(book, value) {
    let shelf = value.target.value
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.concat([ book ]).sort(sortBy('title'))
      }))
      console.log(this.state)
      console.log("Added a new book \n")
    })
  }
   
  resetAllShelves() {
    // we want to reset shelf to 'none' in local books and api books
    // first map over each local copy of the book
    this.state.books.map((book) => {
      // update each book through api to have no shelf
      BooksAPI.update(book, 'none').then(() => {
        // reset local copy of books to empty
        this.setState({ books: [] })
      }).then(() => {
        // pull all books from api
        BooksAPI.getAll().then((books) => {
          // refill the local books, should be zero showing
          this.setState({ books })
        })
      })
    })  
  }      

  render() {
    return (
      <div className="app">
        <Route path="/search" render={({ history }) => (
          <Search
            onUpdateShelf={(book, shelf) => {
              this.updateShelf(book,shelf)
              history.push('/')
            }}
          />
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <button onClick={this.resetAllShelves.bind(this)}>Reset Shelves</button>
            <div className="list-books-content">
                <div>
                <Shelves 
                  shelfTitle='Currently Reading' 
                  currentShelf={this.state.books.filter((book) => {return book.shelf === 'currentlyReading'})} 
                  onUpdateShelf={this.updateShelf.bind(this)} />
                <Shelves 
                  shelfTitle='Read' 
                  currentShelf={this.state.books.filter((book) => {return book.shelf === 'read'})} 
                  onUpdateShelf={this.updateShelf.bind(this)} />
                <Shelves 
                  shelfTitle='Want To Read' 
                  currentShelf={this.state.books.filter((book) => {return book.shelf === 'wantToRead'})} 
                  onUpdateShelf={this.updateShelf.bind(this)} />
                </div>
            </div>
          </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp
