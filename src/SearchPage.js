import React from 'react'
import PropTypes from 'prop-types'
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
    const { booksInMyBookshelves, onMoveToShelf } = this.props
    const { books, error } = this.state

    const myBooksById = {}
    booksInMyBookshelves.forEach(book => {
      myBooksById[book.id] = book
    });

    const booksWithShelf = books.map( book => {
      if (book.id in myBooksById) {
        return { ...book, shelf: myBooksById[book.id].shelf }
      } else {
        return book
      }
    })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
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
              {booksWithShelf.map( book => {
                return (
                  <li key={book.id}>
                    <Book book={book} onMoveToShelf={onMoveToShelf} />
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

SearchPage.propTypes = {
  booksInMyBookshelves: PropTypes.arrayOf(Book.propTypes.book).isRequired,
  onMoveToShelf: PropTypes.func.isRequired,
}

export default SearchPage
