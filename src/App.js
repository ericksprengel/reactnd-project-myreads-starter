import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import Home from './Home'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      this.setState({
        currentlyReading: books.filter( book => book.shelf === 'currentlyReading'),
        wantToRead: books.filter( book => book.shelf === 'wantToRead'),
        read: books.filter( book => book.shelf === 'read'),
      })
    })
  }

  onMoveToShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then( result => {
      this.setState((state, props) => {
        const newBook = { ...book, shelf: shelf }
        const nextState = {
          currentlyReading: state.currentlyReading,
          wantToRead: state.wantToRead,
          read: state.read,
        }

        // remove book from old shelf
        nextState[book.shelf] = nextState[book.shelf].filter( b => b.id !== book.id)

        // add book to new shelf
        if (shelf !== 'none') {
          nextState[shelf] = [ ...nextState[shelf], newBook]
        }
        return nextState
      })
    })
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state
    return (
      <Router>
        <div className="app">
          <Route
            path="/"
            exact
            render={ props =>
              <Home
                {...props}
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                read={read}
                onMoveToShelf={this.onMoveToShelf}
              />
            }
          />
          <Route
            path="/search"
            render={ props =>
              <SearchPage {...props} onMoveToShelf={this.onMoveToShelf} />
            }
          />
        </div>
      </Router>
    )
  }
}

export default BooksApp
