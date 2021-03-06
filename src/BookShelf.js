import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends React.Component {

    /**
    * @description Call back function for passing book shelf change info
    * @param {object} book - book object
    * @param {string} bookStatus - book.shelf
    */
    onChange = (book, bookStatus) => {
        this.props.onChange(book, bookStatus);
    };

    render() {
        const { books } = this.props;
        //manually configured shelf name and corresponding book attribute values
        const shelves = [
        ["currentlyReading", "Currently Reading"],
        ["wantToRead", "Want to Read"],
        ["read", "Read"],
        ];
        
        return(
            <div className="bookshelf">
                {shelves.map((shelf, index) => (
                    <div key={index}>
                        <h2 className="bookshelf-title">{shelf[1]}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.filter(book => book.shelf === shelf[0]).map((book, index) => (
                                    <li key={index}>
                                    <Book book={book} onChange={this.onChange} />
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                ))}
            </div>
            );
    }
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};
export default BookShelf