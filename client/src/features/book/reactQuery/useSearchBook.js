import { useMutation, useQueryClient } from "@tanstack/react-query"
// import toast from "react-hot-toast"

import { searchBook as searchBookApi } from "../../../services/book/searchBooks";

export function useSearchBook() {
    const queryClient = useQueryClient();

    const { isPending: isSearching, mutate: searchBook } = useMutation({
        mutationFn: searchBookApi,
        onSuccess: () => {
            // toast.success("Cabin created successfully.")

            queryClient.invalidateQueries({
                queryKey: ["books"]
            })
        },
        // onError: (err) => toast.error(err.message)
    })

    return { isSearching, searchBook }

}