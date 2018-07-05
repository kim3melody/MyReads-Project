import React from 'react'
import { Route, Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { getAll, update } from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBook from './SearchBook'

class BooksApp extends React.Component {
    state = {
        books:[],
    }

    /**
    * @description Load book shelf when components are loaded
    */
    componentDidMount() {
        this.loadBookShelf();
    }

    /**
    * @description Use asychronous API request to get book shelf data
    *              update app state 
    */
    loadBookShelf = () => {
        getAll().then((books) => this.setState({books}));
    }

    /**
    * @ description Handle book.shelf change, update state locally, send update request to server using update API
    * @ param {objecy} book - book oject
    * @ param {string} bookStatus - book.shelf
    */
    onChange = (book, bookStatus) => {
        let prevBooks = this.state.books;
        book.shelf = bookStatus;
        let index = prevBooks.findIndex(target => target.id === book.id);
        // move changed item to the end of list
        prevBooks.splice(index, 1);
        prevBooks.push(book);
        this.setState({books: prevBooks});

        // update server data
        update(book, bookStatus);
    }

    render() {
        const { books } = this.state;
        return (
            <div className="app">
                <Route path='/search' render={() => <SearchBook onChange={this.onChange} loadBookShelf={this.loadBookShelf} /> } />
                <Route exact path='/' render={() => (
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
