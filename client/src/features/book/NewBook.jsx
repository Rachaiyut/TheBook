import Carousel from "react-multi-carousel";
import Loader from "../../ui/Loader";

import { useGetBooks } from "./reactQuery/useGetBook";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const NewBook = () => {
    const { isLoading, data } = useGetBooks(); // Correct destructuring

    console.log(data, isLoading);

    return (
        <section className='text-spaceCadet bg-moonLily pb-16'>
            <h2 className="max-w-[1440px] mx-auto px-4 pt-4 pb-4 text-2xl font-bold">
                New Books
            </h2>
            <div className='max-w-[1440px] mx-auto px-4'>
                <Carousel
                    className='bg-[#f1f1f1] pt-8 pb-8'
                    responsive={responsive}
                    swipeable={true}
                    infinite={true}
                    keyBoardControl={true}
                    autoPlay={true}
                    autoPlaySpeed={5000}
                    transitionDuration={500}
                    showDots={true}
                >
                    {isLoading ? (
                        <Loader />
                    ) : (
                        data.data.map((bookItem) => (
                            <div className="flex items-center justify-center flex-col gap-2" key={bookItem.isbn}>
                                <div className='flex justify-center items-center'>
                                    <img
                                        className="h-72 text-center"
                                        src={bookItem.imageCover}
                                        alt={bookItem.name}
                                    />
                                </div>
                                <p>{bookItem.name}</p>
                                <p>{bookItem.authors.join(', ')}</p>
                            </div>
                        ))
                    )}
                </Carousel>
            </div>
        </section>
    );
};

export default NewBook;
