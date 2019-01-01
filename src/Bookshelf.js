import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends React.Component {
  render() {
    const { title, books } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map( book => {
              return (
                <li key={book.id}>
                  <Book book={book} />
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(Book.propTypes.book).isRequired,
}
export default Bookshelf