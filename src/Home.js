import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf';

class Home extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      console.log(books)
      this.setState({
        books,
      })
    })
  }

  render() {
    const { books } = this.state

    const booksCurrentlyReading = books.filter( book => book.shelf === 'currentlyReading')
    const booksWantToRead = books.filter( book => book.shelf === 'wantToRead')
    const booksRead = books.filter( book => book.shelf === 'read')

    return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf title="Currently Reading" books={booksCurrentlyReading} />
          <Bookshelf title="Want to Read" books={booksWantToRead} />
          <Bookshelf title="Read" books={booksRead} />
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

export default Home