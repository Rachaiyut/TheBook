import PropTypes from 'prop-types';

function Search({ register, onSearchChange }) {

    return (
        <input
            type="text"
            {...register('book', {
                onChange: onSearchChange
            })}
            className="focus:outline-none w-96 px-2 py-1 text-xs"
            placeholder="Name, author, keyword or ISBN"
        />
    )
}

Search.propTypes = {
    register: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
};

export default Search 