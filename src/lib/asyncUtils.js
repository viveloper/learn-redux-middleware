import { call, put } from 'redux-saga/effects';

export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return function* saga(action) {
    try {
      const result = yield call(promiseCreator, action.payload);
      yield put({
        type: SUCCESS,
        payload: result,
      });
    } catch (e) {
      yield put({
        type: ERROR,
        payload: e,
        error: true,
      });
    }
  };
};

export const createPromiseSagaById = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return function* saga(action) {
    const id = action.payload;
    try {
      const post = yield call(promiseCreator, id);
      yield put({
        type: SUCCESS,
        payload: post,
        meta: id,
      });
    } catch (e) {
      yield put({
        type: ERROR,
        payload: e,
        error: true,
        meta: id,
      });
    }
  };
};

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

const defaultIdSelector = (param) => param;

export const createPromiseThunkById = (
  type,
  promiseCreator,
  idSelector = defaultIdSelector
) => (param) => async (dispatch) => {
  const id = idSelector(param);
  dispatch({ type, meta: id });
  try {
    const payload = await promiseCreator(param);
    dispatch({
      type: `${type}_SUCCESS`,
      payload,
      meta: id,
    });
  } catch (error) {
    dispatch({
      type: `${type}_ERROR`,
      payload: error,
      error: true,
      meta: id,
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

export const handleAsyncActionsById = (type, key, keepData) => (
  state,
  action
) => {
  const id = action.meta;

  switch (action.type) {
    case type:
      return {
        ...state,
        [key]: {
          ...state[key],
          [id]: reducerUtils.loading(
            keepData ? state[key][id] && state[key][id].data : null
          ),
        },
      };
    case `${type}_SUCCESS`:
      return {
        ...state,
        [key]: {
          ...state[key],
          [id]: reducerUtils.success(action.payload),
        },
      };
    case `${type}_ERROR`:
      return {
        ...state,
        [key]: {
          ...state[key],
          [id]: reducerUtils.error(action.payload),
        },
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
