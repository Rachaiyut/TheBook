function Dropdown({ register }) {


    return (
        <select
            className="focus:outline-none w-40 px-2 py-1 text-xs"
            {...register('genres')}
        >
            <option>Select Products</option>
            <option value="Books">Books</option>
            <option value="Magazines">Magazines</option>
        </select>
    )
}

export default Dropdown;