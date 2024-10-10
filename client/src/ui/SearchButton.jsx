import { FaSearch } from "react-icons/fa";

function SearchButton() {
    return (
        <button className="bg-black p-3" type="submit">
            <FaSearch className="text-white text-xs " />
        </button>
    )
}

export default SearchButton;