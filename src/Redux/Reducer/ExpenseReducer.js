import { createSlice } from "@reduxjs/toolkit";
import { addTransaction, allTransaction, updateTransaction, deleteTransaction } from "../Actions/ExpenseAction";

const expenseSlice = createSlice({
    name : "expense",
    initialState : [],
    extraReducers : (builder) => {
        builder.addCase(addTransaction.fulfilled, (state,action) => {
            state.push(action.payload.transaction)
        })
        .addCase(allTransaction.fulfilled, (state,action) => {
            return [...action.payload]
        })
        .addCase(updateTransaction.fulfilled, (state,action) => {
            let index = state.findIndex(item => item.id === action.payload.id)
            state[index] = {
                ...state[index],
                ...action.payload.transaction
            }
        })
        .addCase(deleteTransaction.fulfilled, (state,action) => {
            let index = state.findIndex(item => item.id === action.payload.id)
            state.splice(index,1)
        })
    }
})

export default expenseSlice