import {createNewCommentAC, loadErrorAC, loadStartAC, loadSuccessAC, setIsFetchingAC} from "./reducer";

export default {

  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch(loadStartAC())
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count&limit=*&search[parent]=${id}`,
        });
        dispatch(loadSuccessAC(res.data.result));
      } catch (e) {
        dispatch(loadErrorAC(e.message));
      }
    }
  },
  createNewComment: ({text, _id, _type}) => {
    return async (dispatch, getState, services) => {
      dispatch(setIsFetchingAC(true))
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?lang=ru&fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)`,
          method: 'POST',
          body: JSON.stringify({text, parent: {_id, _type}})
        });
        dispatch(createNewCommentAC(res.data.result));
        dispatch(setIsFetchingAC(false))
      } catch (e) {
        dispatch(loadErrorAC(e.message));
        dispatch(setIsFetchingAC(false))
      }
    }
  }
}
