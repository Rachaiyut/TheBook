import Navbar from "../ui/Navbar";
import Hero from "../ui/Hero"
import BestSeller from '../features/book/BestSeller'
import NewBook from "../features/book/NewBook";
import Footer from "../ui/Footer";

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <BestSeller />
            <NewBook />
            <Footer />
        </>
    )
}

export default Home; 