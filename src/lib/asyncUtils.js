export const createPromiseThunk = (type, promiseCreator) => (param) => async (
  dispatch
) => {
  dispatch({ type });
  try {
    const payload = await promiseCreator(param);
    dispatch({
      type: `${type}_SUCCESS`,
      payload,
    });
  } catch (error) {
    dispatch({
      type: `${type}_ERROR`,
      payload: error,
      error: true,
    });
  }
};

export const handleAsyncActions = (type, key, keepData) => (state, action) => {
  switch (action.type) {
    case type:
      return {
        ...state,
        [key]: reducerUtils.loading(keepData ? state[key].data : null),
      };
    case `${type}_SUCCESS`:
      return {
        ...state,
        [key]: reducerUtils.success(action.payload),
      };
    case `${type}_ERROR`:
      return {
        ...state,
        [key]: reducerUtils.error(action.payload),
      };
    default:
      return state;
  }
};

export const reducerUtils = {
  initial: (data = null) => ({
    data,
    loading: false,
    error: null,
  }),
  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null,
  }),
  success: (data) => ({
    data,
    loading: false,
    error: null,
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error,
  }),
};
