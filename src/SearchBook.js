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

    updateQuery = (value) => {
        this.setState({query: value});
        if (value.trim() !== "") {
             search(value.trim(), 10).then(res => {
               if (res.error) {
                this.setState({ searchResults: [] });
               } else { 
                 this.bindShelfInfo(res);
               }
             })
        } else {
            this.setState({ searchResults: [] });
        };
    }
    
    loadBookShelf = () => {
        this.props.loadBookShelf();
    }

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
                  { this.state.searchResults.map((book, index) => (<li key={index}>
                        <Book book={book} onChange={this.onChange} />
                  </li>))}
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