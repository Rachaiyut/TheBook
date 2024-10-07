import { useForm } from "react-hook-form";

import { useSearchBook } from "./reactQuery/useSearchBook";

// React Icon
import { FaSearch } from "react-icons/fa";

// UI
import Dropdown from "../../ui/DropDown";
import Search from "../../ui/Search";

function SearchBar() {
    const { register, handleSubmit } = useForm();

    const { isSearching, searchBook } = useSearchBook()

    const onSubmit = (data) => {
        searchBook(data)
    }

    const onError = (errors) => {
        console.log(errors)
    }


    return (
        <form
            className="flex items-center rounded-l-sm border-2 border-spaceCadet"
            onSubmit={handleSubmit(onSubmit, onError)}
        >
            <Dropdown register={register} />
            <Search register={register} />
            <button
                className="bg-black p-3 "
                type="submit"
            >
                <FaSearch className="text-white text-xs" />
            </button>
        </form>
    )
}

export default SearchBar; 