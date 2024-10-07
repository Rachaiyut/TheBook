import { Link } from "react-router-dom";

function Navigation() {
    return (
        <ul className="hidden md:flex md:pt-4 md:pb-2 gap-6 font-bold text-sm md:text-base flex-grow justify-start">
            <Link className="transition-transform transform hover:-translate-y-1 hover:cursor-pointe" to={"/home"}>Home</Link>
            <li className="transition-transform transform hover:-translate-y-1 hover:cursor-pointe" >Company</li>
            <li className="transition-transform transform hover:-translate-y-1 hover:cursor-pointe" >Resources</li>
            <li className="transition-transform transform hover:-translate-y-1 hover:cursor-pointe" >About</li>
            <li className="transition-transform transform hover:-translate-y-1 hover:cursor-pointe" >Contact</li>
        </ul>
    )
}

export default Navigation