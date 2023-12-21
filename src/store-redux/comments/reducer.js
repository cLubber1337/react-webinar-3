const COMMENT_ACTION = {
  LOAD_START: "comments/load-start",
  LOAD_SUCCESS: "comments/load-success",
  LOAD_ERROR: "comments/load-error",
  CREATE_NEW_COMMENT: "comments/create-new-comment",
  SET_IS_FETCHING: "comments/set-is-fetching",
}

export const loadStartAC = () => ({type: COMMENT_ACTION.LOAD_START})
export const loadSuccessAC = (data) => ({type: COMMENT_ACTION.LOAD_SUCCESS, data})
export const loadErrorAC = (error) => ({type: COMMENT_ACTION.LOAD_ERROR, error})
export const createNewCommentAC = (newComment) => ({type: COMMENT_ACTION.CREATE_NEW_COMMENT, newComment})

export const setIsFetchingAC = (isFetching) => ({type: COMMENT_ACTION.SET_IS_FETCHING, isFetching})


export const initialState = {
  data: {},
  waiting: false,
  isFetching: false,
  error: null
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case COMMENT_ACTION.LOAD_START:
      return {...state, data: {}, waiting: true};

    case COMMENT_ACTION.LOAD_SUCCESS:
      return {...state, data: action.data, waiting: false};

    case COMMENT_ACTION.LOAD_ERROR:
      return {...state, data: {}, waiting: false, isFetchingComment: false, error: action.error};

    case COMMENT_ACTION.CREATE_NEW_COMMENT:
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          items: [...state.data.items, action.newComment]
        }
      }
    case COMMENT_ACTION.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }

    default:
      return state;
  }
}


export default reducer;
