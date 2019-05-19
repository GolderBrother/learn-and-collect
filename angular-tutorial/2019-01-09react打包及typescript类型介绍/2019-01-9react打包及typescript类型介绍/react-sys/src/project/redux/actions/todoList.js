import { createAction } from 'redux-actions';

export const add= createAction('ADD');
export const del= createAction('DEL');

export const addTodo = createAction('ADD_TODO');
export const delTodo = createAction('DEL_TODO');
export const toggleTodo = createAction('TOGGLE_TODO');
export const setVisibility = createAction('VISIBILITY_TODO');