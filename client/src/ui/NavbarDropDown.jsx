import { useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Contexts
import { OptionalFormProvider } from "../contexts/OptionalFormContext";

// Components
import Modal from "./Modal";

const PagesDropDown = [
    { title: "Manage Account", path: "/my-account" },
    { title: "My Order", path: "/my-account/order" },
    { title: "Wishlist", path: "/my-account/wishlist" },
    { title: "Log In/ Sign Up", path: "/signup" },
]

function NavbarDropDown({
    children,
    color,
    bgColor,
    className = "",
}) {
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const dialog = useRef();

    const handleShow = () => {
        dialog.current.show();
    };


    return (
        <>
            <OptionalFormProvider>
                {createPortal(<Modal ref={dialog} />, document.body)}
            </OptionalFormProvider>

            <div style={{ display: "flex" }}>
                <div
                    className="relative inline-flex align-middle w-full"
                    onMouseLeave={() => setDropdownPopoverShow(false)} // Close on mouse leave
                >
                    <button
                        className={`${className} font-bold uppercase text-sm hover:underline outline-none focus:outline-none`}
                        style={{ transition: "all .15s ease" }}
                        type="button"
                        onMouseEnter={() => setDropdownPopoverShow(true)} // Open on hover
                    >
                        {children}
                    </button>

                    <div
                        className={`${dropdownPopoverShow ? "block" : "hidden"
                            } absolute top-full left-0 z-50 text-base py-2 list-none text-left rounded shadow-lg ${bgColor}`}
                        style={{ minWidth: "12rem" }}
                    >
                        {PagesDropDown.map((item, index) => (
                            <NavbarDropDownItem key={index} item={item} color={color} handleOpen={handleShow} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

function NavbarDropDownItem({ item, color, handleOpen }) {
    if (item.path === "/signup") {
        return (
            <div>
                <div
                    className={`text-sm py-2 px-4 font-bold block w-full whitespace-no-wrap ${color} hover:cursor-pointer hover:underline`}
                    onClick={handleOpen}
                >
                    {item.title}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Link
                    to={item.path}
                    className={`text-sm py-2 px-4 font-bold block w-full whitespace-no-wrap ${color} bg-transparent hover:cursor-pointer hover:underline`}
                >
                    {item.title}
                </Link>
            </div>
        );
    }
}

NavbarDropDown.propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    bgColor: PropTypes.string,
    className: PropTypes.string,
    pages: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            component: PropTypes.element,
        })
    ),
};

NavbarDropDownItem.propTypes = {
    item: PropTypes.object,
    color: PropTypes.string,
    handleOpen: PropTypes.func,
};

export default NavbarDropDown;
