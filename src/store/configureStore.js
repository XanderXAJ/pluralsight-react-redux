import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import reduxLogger from 'redux-logger';

let middleware = [];
if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, reduxImmutableStateInvariant(), reduxLogger()];
}

export default function configureStore(initialState) {
  return createStore(
      rootReducer,
      initialState,
      applyMiddleware(...middleware)
  );
}
