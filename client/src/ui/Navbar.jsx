import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

//Components
import NavbarDropDown from "./NavbarDropDown";

import SearchBar from "../features/book/SearchBar";
import Logo from "./Logo";


function Navbar() {
	return (
		<nav className="text-spaceCadet">

			{/* MENU */}
			<div className="container max-w-[1440px] mx-auto pt-10 pb-2 md:px-4 flex justify-between items-center" >
				<Logo />
				<SearchBar />
				<div className="flex items-center justify-between gap-4">
					<NavbarDropDown
						color="text-spaceCadet"
						bgColor="bg-[#f1f1f1]"
						className="hidden md:flex justify-center gap-2 items-center whitespace-nowrap "
					>
						<FaUserCircle className="w-6 h-6 text-lg md:text-xl" />
						<p className="hidden md:block md:text-md text-base">MY ACCOUNT</p>
					</NavbarDropDown>

					<div>|</div>

					{/* CART LOGO */}
					<div className="pl-2">
						<FaShoppingCart className="w-6 h-6 md:text-xl transition-transform transform hover:-translate-y-1 hover:cursor-pointer" />
					</div>
				</div>
			</div >

			<div className="container max-w-[1440px] mx-auto pt-2 pb-4 md:px-4 flex justify-between items-center">
				<div>Books</div>
			</div>
		</nav >
	)
}

export default Navbar;