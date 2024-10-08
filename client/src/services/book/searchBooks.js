// Example implementation of getBook function
export const searchBook = async (data) => {
    const { genres, book } = data;

    const response = await fetch(`http://localhost:8000/api/v1/books/${book}`);

    if (!response.ok) {
        throw new Error('Network Error');
    }

    const result = await response.json()


    return result.data;
};
