import { useNavigate } from "react-router-dom"

function Logo() {
    const navigate = useNavigate()

    return (
        <h1
            className="font-bold text-2xl md:text-5xl cursor-pointer"
            onClick={() => navigate('/home')}
        >
            Book
        </h1>
    )
}

export default Logo