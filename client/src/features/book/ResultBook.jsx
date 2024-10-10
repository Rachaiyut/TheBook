import { useLocation } from "react-router-dom";

function ResultBook() {
    const location = useLocation();
    const { books } = location.state || {};

    console.log(books);

    return (
        <div className="w-full mx-auto pl-4 md:pl-12 lg:pl-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-8 gap-y-16 justify-items-center">
                {books && books.length > 0 ? (
                    books.map((bookItem) => (
                        <div
                            className="flex items-start justify-center flex-col gap-2 w-full max-w-xs bg-white border border-gray-200 shadow-md transition-transform transform hover:scale-105"
                            key={bookItem.isbn}
                        >
                            <div className="flex justify-center items-center w-full h-full">
                                <img
                                    className="object-cover "
                                    src={bookItem.imageCover}
                                    alt={bookItem.name}
                                />
                            </div>
                            <div className="p-4 flex items-start flex-col gap-1">
                                <p className="text-sm font-semibold text-center">{bookItem.name}</p>
                                <p className="text-xs text-center text-gray-600">
                                    by{" "}
                                    <span className="text-green-500">
                                        {bookItem.authors.join(", ")}
                                    </span>
                                </p>
                                <p className="text-xs text-center text-gray-800">
                                    Paperback ฿{bookItem.price}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-700">No books found</p>
                )}
            </div>
        </div>
    );
}

export default ResultBook;
