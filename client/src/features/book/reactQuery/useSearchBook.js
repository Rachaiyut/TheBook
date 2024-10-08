import { useMutation, useQueryClient } from "@tanstack/react-query"

import { searchBook as searchBookApi } from "../../../services/book/searchBooks";

export function useSearchBook() {
    const queryClient = useQueryClient();

    const { mutate: searchBook, data: books, } = useMutation({
        mutationFn: searchBookApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["books"]
            })
        },
    })

    return { searchBook, books }

}