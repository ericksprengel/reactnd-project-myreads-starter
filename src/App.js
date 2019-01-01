import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage';
import Home from './Home';

class BooksApp extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route path="/" exact component={Home} />
          <Route path="/search" component={SearchPage} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
