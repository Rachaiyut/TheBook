import BookStore from "../assets/img/bookstore.jpg";
import BookStore2 from "../assets/img/books.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1, 
    },
};

function Hero() {
    return (
        <section className="text-spaceCadet bg-moonLily pb-8">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 gap-8 pt-2 md:px-4">
                {/* Set max width and height for framing */}
                <div className="w-full max-w-[1440px] h-64 min-h-[500px] mx-auto">
                    <Carousel
                        className="w-full h-full"
                        responsive={responsive}
                        infinite={true}
                        keyBoardControl={true}
                        autoPlay={true}
                        autoPlaySpeed={5000}
                        transitionDuration={500}
                        showDots={true}
                    >
                        <div className="w-full h-full">
                            <img
                                className="object-cover w-full h-full"
                                src={BookStore}
                                alt="Book Store"
                            />
                        </div>
                        <div className="w-full h-full">
                            <img
                                className="object-cover w-full h-full"
                                src={BookStore2}
                                alt="Books"
                            />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

export default Hero;

