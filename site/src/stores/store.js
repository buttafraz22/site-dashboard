/*
    This file maps the central provider for the reducers.
    As with context providers, the user of this store should
    wrap the entire component in which the state is used with
    the provider of this store. (Usually, the App component is wrapped).
*/

import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../reducers/searchReducer";

const store = configureStore({reducer: searchReducer});

export default store;