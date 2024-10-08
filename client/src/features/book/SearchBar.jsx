import { useState } from "react";

import { useForm } from "react-hook-form";
import { useSearchBook } from "./reactQuery/useSearchBook";
import { FaSearch } from "react-icons/fa";

import Dropdown from "../../ui/DropDown";
import Search from "../../ui/Search";
import ResultDropDown from "./ResultDropDown";

function SearchBar() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const { register, handleSubmit } = useForm();
    const { searchBook, books } = useSearchBook();

    const onSubmit = (data) => {
        searchBook(data);
    };

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <form
                className="flex items-center rounded-l-sm border-2 border-spaceCadet"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Dropdown register={register} />
                <Search register={register} />
                <button className="bg-black p-3" type="submit">
                    <FaSearch className="text-white text-xs" />
                </button>
            </form>
            {isDropdownVisible && books && books.length > 0 && (
                <div className="absolute z-10 w-full">
                    <ResultDropDown books={books} />
                </div>
            )}
        </div>
    );
}

export default SearchBar;
