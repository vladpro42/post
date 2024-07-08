import { useMemo } from "react";

export function usePagination(totalPages) {

    const pagesArray = useMemo(() => new Array(totalPages).fill().map((_, i) => i + 1), [totalPages])
    return pagesArray
}