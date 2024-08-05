/*
    The reducer is the piece of logic that maps changes in the tree
    to the state variable in memory. We start by defining the initial
    state. What the reducer does is that it recieves an action as parameter:

    --> (The action for the searchAction is at ../actions/searchActions.js).

    Recall the syntax of action:
        action = (newValueOfState) => ({
            type: ACTION_TYPE,   // this is a constant
            payload: newValueOfState
        });

    In the reducer function, we set the state as the new state type.
*/

import {SET_SEARCH_TERM} from '../lib/constants/actionTypes';

const initialState = {
    searchTerm : ''
}

const searchReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_SEARCH_TERM:
            return{
                ...state,
                searchTerm:action.payload
            };
        default:
            return state;
    }
}

export default searchReducer;