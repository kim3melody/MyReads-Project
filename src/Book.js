import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {

    /**
    * @description Callback function to pass data to books state in App
    * @param {object} this.props.book - book object
    * @ param {string} event.target.value - select tag value
    */
    handleChange = (event) => {
        event.preventDefault();
        this.props.onChange(this.props.book, event.target.value);
    };

    render() {
        const { book } = this.props;
		// incase book doesn't have the following attributes
        if (!book.authors) { book.authors = [] };
        if (!book.shelf) { book.shelf = "none" };
        if (!book.imageLinks) { book.imageLinks = {thumbnail: ""}};

        return(     
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" 
                         style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={this.handleChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>

                <div>{book.authors.map((author, index) => (
                    <div key={index} className="book-authors">{author}</div>
                ))}</div>
            </div>      
            );
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};
export default Book;