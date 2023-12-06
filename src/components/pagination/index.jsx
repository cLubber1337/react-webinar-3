import './style.css'
import {paginationRange} from "../../utils";
import PropTypes from "prop-types";


function Pagination({currentPage, setCurrentPage, totalPages}) {

    const pages = paginationRange(totalPages, currentPage)



    const classNameItem = (page) => {
        if (typeof page !== 'number') {
            return 'pagination-dots'
        }
        if (page === currentPage) {
            return 'pagination-item active-item'
        } else {
            return 'pagination-item'
        }
    }

    const onClickItem = (page) => {
        if (typeof page === 'number') {
            if (page === 1) {
                setCurrentPage(0)
            } else {
                setCurrentPage(page)
            }
        }
    }

    return (
        <div className={'pagination'}>
            <ul className={'pagination-list'}>

                {pages.map((page, id) => (
                    <li
                        className={classNameItem(page)}
                        key={id}
                        onClick={() => onClickItem(page)}
                    >
                        {page}
                    </li>
                ))}
            </ul>
        </div>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
    totalPages: PropTypes.number
}

export default Pagination