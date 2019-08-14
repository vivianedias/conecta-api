import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers/index';

const configureStore = (initialState = {}) => {
    const store = createStore (
        rootReducers,
        initialState,
        compose (
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
    return store;
}

export default configureStore;