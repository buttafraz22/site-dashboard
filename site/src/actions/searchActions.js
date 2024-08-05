import { SET_SEARCH_TERM } from '../lib/constants/actionTypes';

/*
    This module returns an action object as a hook.
    An Action has a payload and a type. 
    Payload is the value of the state we want to set, 
    and type is the type of the action occuring.

    Syntax of action:
        action = (newValueOfState) => ({
            type: ACTION_TYPE,   // this is a constant
            payload: newValueOfState
        });
*/


export const setSearchTerm = (searchTerm) => ({
    type: SET_SEARCH_TERM,
    payload: searchTerm
});