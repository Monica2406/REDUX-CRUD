import { configureStore, combineReducers } from "@reduxjs/toolkit";
import expenseSlice from "../Reducer/ExpenseReducer";

// combine multiple reducers
const AppReducer = combineReducers({
    //state : reducer
    transactions : expenseSlice.reducer
})

// main store
const AppStore = configureStore({
    reducer : AppReducer,
    devTools : true
})

export default AppStore