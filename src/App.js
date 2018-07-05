import React from 'react'
import { Route, Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { getAll, update } from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBook from './SearchBook'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[],
  }

  componentDidMount() {
    this.loadBookShelf();
  }
  
  loadBookShelf = () => {
  	getAll().then((books) => this.setState({books}));
  }

  onChange = (book, bookStatus) => {
    // update books array, append updated book to the end of the array
    // update bookshelf locally without getAll api request
    let prevBooks = this.state.books;
    book.shelf = bookStatus;
    let index = prevBooks.findIndex(target => target.id === book.id);
    prevBooks.splice(index, 1);
    prevBooks.push(book);
    // update state for re-render
    this.setState({books: prevBooks});
    // update server data
    update(book, bookStatus);
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route path='/search' render={ () => <SearchBook onChange={this.onChange} loadBookShelf={this.loadBookShelf} /> } />
        <Route exact path='/' render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={books} onChange={this.onChange} />     
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
