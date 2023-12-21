import './style.css'
import PropTypes from "prop-types";
import {memo} from "react";



export const CommentLayout = memo(({head, main, footer}) => {
  return (
    <div className='comment-layout'>
      <div className='comment-layout-head'>
        {head}
      </div>
      <div className='comment-layout-center'>
        {main}
      </div>
      <div className='comment-layout-footer'>
        {footer}
      </div>
    </div>
  )
})


CommentLayout.propTypes = {
  children: PropTypes.node,
  head: PropTypes.node,
  footer: PropTypes.node
}