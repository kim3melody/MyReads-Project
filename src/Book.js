import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {

    handleChange = (event) => {
        event.preventDefault();
        //if (event.target.value === "none") {return};
        // call back function to pass book shelf info, introduced bookId for locating the book
        this.props.onChange(this.props.book, event.target.value);
    };

    render() {
        const { book } = this.props;
		if (!book.authors) { book.authors = [] };
		if (!book.shelf) { book.shelf = "none" };
		if (!book.imageLinks) { book.imageLinks = {thumbnail: ""}};
        return(     
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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