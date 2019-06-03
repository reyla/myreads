import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Shelves from './Shelves'
import Search from './Search'
import ErrorPage from './ErrorPage'
import * as BooksAPI from './BooksAPI'
import './App.css'
import sortBy from 'sort-by'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  /* set initial state of the bookshelves */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.sort(sortBy('title'))
      this.setState({ books })
    })
  }

  /* update book shelf when user selects different shelf */
  updateShelf(book, value) {
    // pull the desired shelf from the value user selected
    let shelf = value.target.value
    // update the book shelf in the api
    BooksAPI.update(book, shelf).then((book) => {
      // reset all the shelves
      BooksAPI.getAll().then((books) => {
        books.sort(sortBy('title'))
        this.setState({ books })
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path={process.env.PUBLIC_URL + '/search'} render={({ history }) => (
          <Search
            books={this.state.books}
            onUpdateShelf={(book, shelf) => {
              this.updateShelf(book,shelf)
              // force user back to bookshelves view
              history.push{process.env.PUBLIC_URL + '/'}
            }}
          />
        )}/>
        <Route exact path={process.env.PUBLIC_URL + '/'} render={() => (
          <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                <Shelves 
                  shelfTitle='Currently Reading' 
                  currentShelf={this.state.books.filter((book) => {return book.shelf === 'currentlyReading'})} 
                  onUpdateShelf={this.updateShelf.bind(this)} />
                <Shelves 
                  shelfTitle='Want To Read' 
                  currentShelf={this.state.books.filter((book) => {return book.shelf === 'wantToRead'})} 
                  onUpdateShelf={this.updateShelf.bind(this)} />
                <Shelves 
                  shelfTitle='Read' 
                  currentShelf={this.state.books.filter((book) => {return book.shelf === 'read'})} 
                  onUpdateShelf={this.updateShelf.bind(this)} />
                </div>
            </div>
          </div>
        )}/>
        <Route component={ErrorPage}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
