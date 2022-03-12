import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./rootSaga";
import {LOADING_SET, SET_CURRENCY, SET_LIKE_PAIRS, SET_PAIRS} from "./actions";
const sagaMiddleware = createSagaMiddleware()


export const initialState = {
  loading: true,
  pairs: [],
  likePairs: [],
  currency: {}
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_SET: {
      return {
        ...state,
        loading: action.payload,
      }
    }
    case SET_PAIRS: {
      return {
        ...state,
        pairs: action.payload,
      }
    }
    case SET_LIKE_PAIRS: {
      return {
        ...state,
        likePairs: action.payload,
      }
    }
    case SET_CURRENCY: {
      return {
        ...state,
        currency: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

const rootReducer = combineReducers({appReducer})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(sagaMiddleware)
  )
);
sagaMiddleware.run(rootSaga);
export default store;