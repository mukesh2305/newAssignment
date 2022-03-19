import {
    NEW_TODO_REQUEST,
    NEW_TODO_SUCCESS,
    NEW_TODO_FAILURE,
    ALL_TODO_REQUEST,
    ALL_TODO_SUCCESS,
    ALL_TODO_FAILURE,
    NEW_EMAIL_REQUEST,
    NEW_EMAIL_SUCCESS,
    NEW_EMAIL_FAILURE,
} from "../constants/todo.constant";

export const getTodoReducer = (state = { todos: [] }, action) => {
    switch (action.type) {
        case ALL_TODO_REQUEST:
            return {
                loading: true,
                todos: [],
            };
        case ALL_TODO_SUCCESS:
            return {
                loading: false,
                todos: action.payload,
            };
        case ALL_TODO_FAILURE:
            return {
                loading: false,
                todos: [],
                error: action.payload,
            };
        default:
            return state;
    }
}

export const newTodoReducer = (state = { todos: {} }, action) => {
    switch (action.type) {
        case NEW_TODO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: action.payload,
            };
        case NEW_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const newEmailReducer = (state = { todos: {} }, action) => {
    switch (action.type) {
        case NEW_EMAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: action.payload,
            };

        case NEW_EMAIL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}