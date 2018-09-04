import React from 'react'
// import * as BooksAPI from './BooksAPI'
import Shelves from './Shelves'
import './App.css'

class BooksApp extends React.Component {
  state = {
    
  }

  render() {
    return (
      <div className="app">
        <Shelves/>
      </div>
    )
  }
}

export default BooksApp
