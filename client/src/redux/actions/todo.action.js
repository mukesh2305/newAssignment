import {
    ALL_TODO_FAILURE,
    ALL_TODO_REQUEST,
    ALL_TODO_SUCCESS,
    NEW_TODO_FAILURE,
    NEW_TODO_REQUEST,
    NEW_TODO_SUCCESS,
    NEW_EMAIL_REQUEST,
    NEW_EMAIL_SUCCESS,
    NEW_EMAIL_FAILURE,
} from "../constants/todo.constant";
import axios from "axios";

// Create Todo
export const createTodoItems = (todoData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_TODO_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
            `http://localhost:4000/api/v1/create`,
            todoData,
            config
        );

        dispatch({
            type: NEW_TODO_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_TODO_FAILURE,
            payload: error.response.data.message,
        });
    }
};

// Get All Todo
export const getAllTodoItems = (currentPage) => async (dispatch) => {
    try {
        dispatch({ type: ALL_TODO_REQUEST });

        const { data } = await axios.get(`http://localhost:4000/api/v1/getAllTodos?page=${currentPage}`);

        // console.log(data);
        dispatch({
            type: ALL_TODO_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_TODO_FAILURE,
            payload: error.response.data.message,
        });
    }
}

// update Email
export const updateEmailTodo = (id, email) => async (dispatch) => {
    try {
        dispatch({ type: NEW_EMAIL_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(
            `http://localhost:4000/api/v1/updateEmail/${id}`,
            { email: email },
            config
        );
        console.log("data", data);
        dispatch({
            type: NEW_EMAIL_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_EMAIL_FAILURE,
            payload: error.response.data.message,
        });
    }
}