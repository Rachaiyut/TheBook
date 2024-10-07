import { useQuery } from "@tanstack/react-query";
import { getNewBooks } from "../../../services/book/getBooks";

export function useGetBooks() {
    const { isLoading, data } = useQuery({
        queryKey: ['books'],
        queryFn: getNewBooks
    });

    return { isLoading, data }
}