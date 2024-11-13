
// Example implementation of getBook function
export const getTopBooksThisMonth = async () => {
    const response = await fetch('http://localhost:8000/api/v1/books/top5/month?minRating=4&limit=10'); // Make sure this endpoint is correct

    if (!response.ok) {
        throw new Error('Network Error');
    }

    const result = await response.json()


    return result;
};

export const getNewBooks = async () => {
    const response = await fetch('http://localhost:8000/api/v1/books/new/month');

    if (!response.ok) {
        throw new Error('Network Error');
    }

    const result = await response.json()

    return result;

}

// export const getBooks = async () => {
//     const response = await fetch();
// }