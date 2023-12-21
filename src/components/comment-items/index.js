import './style.css'
import {CommentItem} from "../comment-item";
import {CommentForm} from "../comment-form";
import {commentFormValues} from "../../libs/comment-form-values";
import {memo, useCallback, useState} from "react";
import {commentsToTree} from "../../utils/comments-to-tree";
import PropTypes from "prop-types";


export const CommentItems = memo(({
                               items,
                               isAuth,
                               showForm,
                               setShowForm,
                               createNewAnswer,
                               disabled,
                               userId
                             }) => {

  const [commentId, setCommentId] = useState(null)

  const callbacks = {
    showResponseForm: useCallback((id) => {
      setShowForm(false)
      setCommentId(id)
    }, []),
    hideResponseForm: useCallback(() => {
      setShowForm(true)
      setCommentId(null)
    }, []),
    onSubmit: useCallback((value) => createNewAnswer(commentId)(value), [commentId]),
  }

  const comments = commentsToTree(items)

  return <div className={'comment-items'}>
    {comments.map((item) =>
      <div style={{paddingLeft: item.level * 30}} key={item._id} className='comment-items-wrapper'>
        <CommentItem
          userId={userId}
          item={item}
          onShow={callbacks.showResponseForm}
        />
        {!showForm && commentId === item._id &&
          <CommentForm isAuth={isAuth}
                       onHide={callbacks.hideResponseForm}
                       link={'/login'}
                       values={commentFormValues.newAnswer}
                       onSubmit={callbacks.onSubmit}
                       disabled={disabled}

          />}
      </div>
    )}
  </div>
})

CommentItems.propsTypes = {
  items: PropTypes.array,
  isAuth: PropTypes.bool,
  showForm: PropTypes.bool,
  setShowForm: PropTypes.func,
  createNewAnswer: PropTypes,
  disabled: PropTypes.bool,
  userId: PropTypes.string
}