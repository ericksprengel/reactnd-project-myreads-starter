import React from 'react'
import PropTypes from 'prop-types'


class Book extends React.Component {
  render() {
    const { book, onMoveToShelf } = this.props

    const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : '/bookcover.png'
    const bookCoverStyle = {
      width: 128,
      height: 193,
      backgroundImage: `url(${thumbnail})`,
      fontSize: 65,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={bookCoverStyle}>
            {!book.imageLinks && book.title && book.title[0]}
          </div>
          <div className="book-shelf-changer">
            <select onChange={(e) => onMoveToShelf(book, e.target.value)} value={book.shelf}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors.join(", ") : ''}</div>
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
  })
}

export default Book