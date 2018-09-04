import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import Shelves from './Shelves'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" component={Search}/>
        <Route exact path="/" render={() => (
                <Shelves
                  // function calls
                />
            )}/>
      </div>
    )
  }
}

export default BooksApp
