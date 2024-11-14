// React Icon
import { FaUserCircle } from "react-icons/fa";

// UI
import MenuDropDown from "./MenuDropDown";
import SearchBar from "../features/book/SearchBar";
import CartBadge from "./CartBadge";
import Logo from "./Logo";

function Navbar() {

	return (
		<nav className="text-spaceCadet">
			{/* MENU */}
			<div className="container max-w-[1440px] mx-auto pt-10 pb-2 mb-4 md:px-4 flex justify-between items-center" >
				<Logo />
				<SearchBar />
				<div className="flex items-center justify-between gap-4">
					<MenuDropDown
						color="text-spaceCadet"
						bgColor="bg-[#f1f1f1]"
						className="hidden md:flex justify-center gap-2 items-center whitespace-nowrap "
					>
						<FaUserCircle className="w-6 h-6 text-lg md:text-xl" />
						<p className="hidden md:block md:text-md text-base">MY ACCOUNT</p>
					</MenuDropDown>

					<span>|</span>

					{/* CART LOGO */}
					<CartBadge />
				</div>
			</div >
		</nav >
	)
}

export default Navbar;