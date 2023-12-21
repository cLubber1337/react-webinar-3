import PropTypes from "prop-types";
import './style.css'
import {memo} from "react";


export const CommentCount = memo(({count}) => {
  return <h2 className='comment-count'>Комментарии ({count})</h2>
})


CommentCount.propTypes = {
  count: PropTypes.number
}