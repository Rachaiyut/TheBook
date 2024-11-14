import { useRef, useState } from "react";
import { createPortal } from "react-dom";

import PropTypes from "prop-types";

// Redux
import { useDispatch } from "react-redux";
import { logout } from "../features/authenticate/redux/authSlice";

// React Router DOM
import { Link, useNavigate } from "react-router-dom";

// Context
import { OptionalFormProvider } from "../contexts/OptionalFormContext";

// Ui
import Modal from "./Modal";

const pages = [
    { title: "Manage Account", path: "/my-account/account" },
    { title: "My Order", path: "/my-account/order" },
    { title: "Wishlist", path: "/my-account/wishlist" },
    { title: "Log In/ Sign Up", path: "/signup" },
];

function MenuDropDown({ children, color, bgColor, className = "" }) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dialogRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const showModal = () => dialogRef.current.show();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <>
            <OptionalFormProvider>
                {createPortal(<Modal ref={dialogRef} />, document.body)}
            </OptionalFormProvider>

            <div style={{ display: "flex" }}>
                <div
                    className="relative inline-flex align-middle w-full"
                    onMouseLeave={() => setDropdownVisible(false)}
                >
                    <button
                        className={`${className} font-bold uppercase text-sm hover:underline outline-none focus:outline-none`}
                        style={{ transition: "all .15s ease" }}
                        type="button"
                        onMouseEnter={() => setDropdownVisible(true)}
                    >
                        {children}
                    </button>

                    <div
                        className={`${dropdownVisible ? "block" : "hidden"} absolute top-full left-0 z-50 text-base py-2 list-none text-left rounded shadow-lg ${bgColor}`}
                        style={{ minWidth: "12rem" }}
                    >
                        {pages.map((item, index) => (
                            <MenuDropDownItem
                                key={index}
                                item={item}
                                color={color}
                                showModal={showModal}
                                handleLogout={handleLogout}
                                token={token}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}


function MenuDropDownItem({ item, color, showModal, handleLogout, token }) {
    const isAuthRoute = item.path === "/signup";
    const isLoggedIn = !!token;

    if (isAuthRoute) {
        return (
            <li
                className={`text-sm py-2 px-4 font-bold block w-full whitespace-no-wrap ${color} hover:cursor-pointer hover:underline`}
                onClick={isLoggedIn ? handleLogout : showModal}
            >
                {isLoggedIn ? "Logout" : item.title}
            </li>
        );
    }

    return (
        <li
            className={`text-sm py-2 px-4 font-bold block w-full whitespace-no-wrap ${color} hover:cursor-pointer hover:underline`}
            onClick={!isLoggedIn ? showModal : undefined}
        >
            {isLoggedIn ? (
                <Link
                    to={item.path}
                    className={`text-sm font-bold block w-full whitespace-no-wrap ${color} bg-transparent`}
                >
                    {item.title}
                </Link>
            ) : (
                item.title
            )}
        </li>
    );
}

MenuDropDown.propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    bgColor: PropTypes.string,
    className: PropTypes.string,
};

MenuDropDownItem.propTypes = {
    item: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
    token: PropTypes.string,
};

export default MenuDropDown;
