import {CommentLayout} from "../../components/comment-layout";
import {CommentCount} from "../../components/comment-сount";
import {CommentForm} from "../../components/comment-form";
import {commentFormValues} from "../../libs/comment-form-values";
import {CommentItems} from "../../components/comment-items";
import {useCallback, useState} from "react";
import {useDispatch, useSelector as useReduxSelector} from "react-redux";
import commentsActions from '../../store-redux/comments/actions';
import useInit from "../../hooks/use-init";
import shallowequal from "shallowequal";
import useSelector from "../../hooks/use-selector";
import {useNavigate, useParams} from "react-router-dom";


export const CommentList = () => {
  const [showForm, setShowForm] = useState(true)
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    exists: state.session.exists,
    userId: state.session.user._id
  }))
  const reduxSelect = useReduxSelector(state => ({
    comments: state.comments.data,
    waiting: state.comments.waiting,
    isFetching: state.comments.isFetching

  }), shallowequal);

  const callBacks = {
    createNewComment: useCallback((text) =>
      dispatch(commentsActions.createNewComment({text, _id: params.id, _type: "article"})), []),
    createNewAnswer: useCallback((_id) => (text) => dispatch(commentsActions.createNewComment({
        text,
        _id,
        _type: "comment"
      }))
      , []),
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  }


  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);


  if (reduxSelect.waiting) {
    return <div style={{textAlign: 'center'}}>Загрузка...</div>
  } else {
    return (
      <CommentLayout
        head={
          <CommentCount count={reduxSelect.comments.count}/>
        }
        main={
          <CommentItems items={reduxSelect.comments.items}
                        isAuth={select.exists}
                        userId={select.userId}
                        showForm={showForm}
                        setShowForm={setShowForm}
                        createNewAnswer={callBacks.createNewAnswer}
                        disabled={reduxSelect.isFetching}
                        onSignIn={callBacks.onSignIn}
          />
        }
        footer={showForm &&
          <CommentForm isAuth={select.exists}
                       onSubmit={callBacks.createNewComment}
                       values={commentFormValues.newComment}
                       disabled={reduxSelect.isFetching}
                       onSignIn={callBacks.onSignIn}
          />}
      >
      </CommentLayout>
    )
  }
}
