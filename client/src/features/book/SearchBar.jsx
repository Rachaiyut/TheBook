import { useState } from "react";

import { useNavigate } from 'react-router-dom';

import { useForm } from "react-hook-form";
import { useSearchBook } from "./reactQuery/useSearchBook";

// UI
import Dropdown from "../../ui/DropDown";
import Search from "../../ui/Search";
import ResultDropDown from "./ResultDropDown";
import SearchButton from "../../ui/SearchButton";

function SearchBar() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const { searchBook, books } = useSearchBook();

    const onSubmit = (data) => {
        searchBook(data);
        navigate(`/result/${data.book}`, { state: { books } })
        reset()
    };

    const handleSearhChange = (data) => {
        searchBook({ genre: "", book: data.target.value });
    }

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
                <Search register={register} onSearchChange={handleSearhChange} />
                <SearchButton />
            </form>
            
            {isDropdownVisible && books && books.length > 0 && <ResultDropDown books={books} />}
        </div>
    );
}

export default SearchBar;
