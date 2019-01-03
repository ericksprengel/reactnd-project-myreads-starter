import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import Home from './Home'

class BooksApp extends React.Component {
  state = {
    booksInMyBookshelves: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      this.setState({
        booksInMyBookshelves: books,
      })
    })
  }

  /*
   *  update book shelf and keep booksInMyBookshelves
   *  updated too.
   */
  onMoveToShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then( result => {
      this.setState((state) => {
        const newBook = { ...book, shelf: shelf }

        // update or add book in booksInMyBookshelves
        // according to the new shelf
        let bookFound = false
        const newArray = state.booksInMyBookshelves.map(b => {
          if (b.id === book.id) {
            bookFound = true
            return newBook
          } else {
            return b
          }
        })
        if (!bookFound) {
          // book is not included in booksInMyBookshelves
          // add it :)
          newArray.push(newBook)
        }
        return {
          booksInMyBookshelves: newArray,
        }
      })
    })
  }

  render() {
    const { booksInMyBookshelves } = this.state
    return (
      <Router>
        <div className="app">
          <Route
            path="/"
            exact
            render={ props =>
              <Home
                {...props}
                books={booksInMyBookshelves}
                onMoveToShelf={this.onMoveToShelf}
              />
            }
          />
          <Route
            path="/search"
            render={ props =>
              <SearchPage
                {...props}
                booksInMyBookshelves={booksInMyBookshelves}
                onMoveToShelf={this.onMoveToShelf}
              />
            }
          />
        </div>
      </Router>
    )
  }
}

export default BooksApp
