import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends React.Component {
  state = {
    books: [],
    error: false,
  }

  handleChangeSearch = (e) => {
    if (!e.target.value) {
      this.setState({
        books: [],
        error: false,
      })
      return
    }
    BooksAPI.search(e.target.value).then( books => {
      console.log("search result:",books)
      if (books.error) {
        this.setState({
          books: [],
          error: books.error,
        })
      } else {
        this.setState({
          books,
          error: false,
        })
      }
    })
  }

  render() {
    const { books, error } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.search}
              onChange={this.handleChangeSearch}
            />

          </div>
        </div>
        <div className="search-books-results">
          {error && (<h2>{error}</h2>)}
          {!error && (
            <ol className="books-grid">
              {books.map( book => {
                return (
                  <li key={book.id}>
                    <Book book={book} />
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      </div>
    )
  }
}

export default SearchPage
