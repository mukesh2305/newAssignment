import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    getTodoReducer,
    newTodoReducer,
} from "./redux/reducer/todo.reducer";

const reducer = combineReducers({
    createTodo: newTodoReducer,
    getTodos: getTodoReducer,

});

let intialState = {};

const middleware = [thunk];
const store = createStore(
    reducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
