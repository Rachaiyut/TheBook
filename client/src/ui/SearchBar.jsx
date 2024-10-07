import { FaSearch } from "react-icons/fa";

import Dropdown from "./DropDown";
import Search from "./Search";

function SearchBar() {

    return (
        <form className="flex items-center rounded-l-sm border-2 border-spaceCadet">
            <Dropdown />
            <Search />
            <button
                className="bg-black p-3 rounded-none"
            >
                <FaSearch className="text-white text-xs" />
            </button>
        </form>
    )
}

export default SearchBar; 