import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf';
import Book from './Book'

class Home extends React.Component {
  render() {
    const {
      books,
      onMoveToShelf,
    } = this.props

    const currentlyReading = books.filter( book => book.shelf === 'currentlyReading')
    const wantToRead = books.filter( book => book.shelf === 'wantToRead')
    const read = books.filter( book => book.shelf === 'read')
    return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf title="Currently Reading" books={currentlyReading} onMoveToShelf={onMoveToShelf} />
          <Bookshelf title="Want to Read" books={wantToRead} onMoveToShelf={onMoveToShelf} />
          <Bookshelf title="Read" books={read} onMoveToShelf={onMoveToShelf} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
    )
  }
}

Home.propTypes = {
  books: PropTypes.arrayOf(Book.propTypes.book).isRequired,
  onMoveToShelf: PropTypes.func.isRequired,
}

export default Home