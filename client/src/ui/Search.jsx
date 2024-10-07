
function Search({ register }) {

    return (
        <input
            className="focus:outline-none w-96 px-2 py-1 text-xs"
            placeholder="Title, author, keyword or ISBN"
            type="text"
            {...register('book')}
        />
    )
}

export default Search