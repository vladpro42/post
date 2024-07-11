import { usePagination } from "../../../hooks/usePaginatiom"
import { Button } from "../button/Button"

export const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const pagesArray = usePagination(totalPages)

    return <div>
        {
            pagesArray.map(item => {
                return <Button style={item === currentPage ? {
                    borderColor: 'red', color: 'red'
                } : {}} key={item}
                    onClick={() => handlePageChange(item)}
                >
                    {item}
                </Button>

            })
        }
    </div>
}