interface IQueryParams {
    title?: string;
    author?: string;
    genre?: string;
    minPrice?: number;
    maxPrice?: number;
    publishedAfter?: string;
    publishedBefore?: string;
    minRating?: number;
    available?: boolean;
    sort?: string;
    page?: string;
    limit?: number;
}

export default IQueryParams