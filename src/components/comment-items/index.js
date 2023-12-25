import './style.css'
import {CommentItem} from "../comment-item";
import {CommentForm} from "../comment-form";
import {commentFormValues} from "../../libs/comment-form-values";
import {memo, useCallback, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import listToTree from "../../utils/list-to-tree";



export const CommentItems = memo(({
                                    items,
                                    isAuth,
                                    showForm,
                                    setShowForm,
                                    createNewAnswer,
                                    disabled,
                                    userId,
                                    onSignIn
                                  }) => {
  const [commentId, setCommentId] = useState(null)
  const commentFormRef = useRef(null);
  const callbacks = {
    showResponseForm: useCallback((id) => {
      setShowForm(false)
      setCommentId(id)
      commentFormRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, []),
    hideResponseForm: useCallback(() => {
      setShowForm(true)
      setCommentId(null)
    }, []),
    onSubmit: useCallback((value) => {
      callbacks.hideResponseForm()
      return (
        createNewAnswer(commentId)(value)
      )
    }, [commentId]),
  }

  useEffect(() => {
    if (!showForm && commentId) {
      commentFormRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [showForm, commentId]);

  const renderComments = useCallback((comments) => {
    return comments?.map((item) => {
      let step = 1
      if (item?.children.length > 0) {
        step = 0
      }
      return (
        <div key={item._id} className='comment-items-wrapper'>
          <CommentItem
            style={{paddingLeft: (item.level - 1) > 10 ? '300px' : (item.level - 1)  * 30}}
            userId={userId}
            item={item}
            onShow={callbacks.showResponseForm}
          />
          {item.children && renderComments(item.children)}
          {!showForm && commentId === item._id &&
            <CommentForm
              ref={commentFormRef}
              style={{paddingLeft: (item.level - step ) > 10 ? '300px' : (item.level - step)  * 30}}
              isAuth={isAuth}
              onHide={callbacks.hideResponseForm}
              values={commentFormValues.newAnswer}
              onSubmit={callbacks.onSubmit}
              disabled={disabled}
              onSignIn={onSignIn}
            />
          }
        </div>
      )
    })
  }, [commentId, showForm])


  return <div className={'comment-items'}>
    {renderComments(listToTree(items)[0]?.children)}
  </div>
})

CommentItems.propsTypes = {
  items: PropTypes.array,
  isAuth: PropTypes.bool,
  showForm: PropTypes.bool,
  setShowForm: PropTypes.func,
  createNewAnswer: PropTypes,
  disabled: PropTypes.bool,
  userId: PropTypes.string,
  onSignIn: PropTypes.func
}

