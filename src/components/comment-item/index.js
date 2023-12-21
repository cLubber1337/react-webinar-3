import './style.css'
import PropTypes from "prop-types";
import {memo} from "react";
import {formatDate} from "../../utils/format-date";


export const CommentItem = memo(({item, onShow,userId}) => {
  return <div className='comment-item'>
    <div className='comment-item-user'>
      <span className={userId === item.author?._id ? 'comment-item-user-name user-me' : 'comment-item-user-name'}>
        {item.author?.profile?.name}
      </span>
      <span className='comment-item-user-date'>
        {formatDate(item.dateCreate)}
      </span>
    </div>
    <div className='comment-item-text'>
      {item.text}
    </div>
      <button onClick={() => onShow(item._id)} className='comment-item-action'>Ответить</button>
  </div>
})

CommentItem.propTypes = {
  onShow: PropTypes.func,
  item: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string
      })
    }),
    parent: PropTypes.shape({
      _id: PropTypes.string,
      _type: PropTypes.string
    })
  }),
  userId: PropTypes.string
}