import Carousel from "react-multi-carousel"
import Loader from "../../ui/Loader";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


const NewBook = () => {
    return (
        <section className='text-spaceCadet bg-moonLily pb-16 '>
            <h2 className="max-w-[1340px] mx-auto px-10 pt-4 pb-4 text-2xl font-bold">
                New Books
            </h2>
            <div className='max-w-[1340px] mx-auto px-10'>
                <Carousel className='bg-[#f1f1f1] pt-8 pb-8' responsive={responsive}>
                    <Loader />
                </Carousel>
            </div>
        </section>
    )
}

export default NewBook