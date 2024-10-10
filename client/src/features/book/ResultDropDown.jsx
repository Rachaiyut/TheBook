import PropTypes from "prop-types";

function ResultDropDown({ books }) {

    return (
        <div className="absolute z-10 w-full">
            <ul
                role="listbox"
                tabIndex={0}
                className="focus:outline-none py-4 pl-5 text-xs bg-gray-200 w-full"
            >
                {books.map((book) => (
                    <li
                        key={book.isbn}
                        role="option"
                        tabIndex={0}
                        className=" hover:bg-gray-200 cursor-pointer"
                    >
                        {book.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

ResultDropDown.propTypes = {
    books: PropTypes.arrayOf(
        PropTypes.shape({
            isbn: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
};

export default ResultDropDown;
