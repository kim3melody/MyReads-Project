import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getAll, search } from './BooksAPI'
import Book from './Book'

class SearchBook extends React.Component {
    state = {
        searchResults: [],
        query: '',
    }

    /**
    * description Update component state with query string, update search result using API and rerender coponent
    * @ param {string} value -  text input value
    */
    updateQuery = (value) => {
        this.setState({query: value});
        // added condition to remove search results when string is empty
        if (value.trim() !== "") {
            search(value.trim(), 10).then(res => {
                if (res.error) {
                    this.setState({ searchResults: [] });
                } else { 
                    // bindShelfInfo method contains getAll API and setState methods
                    this.bindShelfInfo(res);
                }
            })
        } else {
            this.setState({ searchResults: [] });
        };
    }

    /**
    * @ description Callback function from App component
    */
    loadBookShelf = () => {
        this.props.loadBookShelf();
    }

    /**
    * @ description Double loop to assign existing book.shelf attributes to search results
    *               Calls setState() to update component state.searchResults  
    * @ param {list} res - search API result that is not empty
    */
    bindShelfInfo = (res) => {
        getAll().then((books) => {
            for (let i of books) {
                for (let j of res) {
                    if (i.id === j.id) {
                        j.shelf = i.shelf;
                    }
                }
            };
            this.setState({ searchResults: res});
        });
    }

    /**
    * @ description Callback fucntion from App component to update book.shelf change to the server
    * @ param {object} book - book object
    * @ param {string} bookStatus - book.shelf
    */
    onChange = (book, bookStatus) => {
        // call back function to pass book shelf info
        this.props.onChange(book, bookStatus);
    }

    render() {
        console.log(this.state); 
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" onClick={this.loadBookShelf}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author" 
                            value={this.state.query} 
                            onChange={(event) => this.updateQuery(event.target.value)} 
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchResults.map((book, index) => (
                            <li key={index}>
                                <Book book={book} onChange={this.onChange} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

SearchBook.propTypes = {
    onChange: PropTypes.func.isRequired,
    loadBookShelf: PropTypes.func.isRequired,
}
export default SearchBook