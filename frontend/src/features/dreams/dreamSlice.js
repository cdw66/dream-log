import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dreamService from './dreamService'

const initialState = {
    dreams: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create a new dream entry
export const createDream = createAsyncThunk('dreams/create', async (dreamData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // Get user token since route is protected
        return await dreamService.createDream(dreamData, token)

    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get dreams of the user
export const getDreams = createAsyncThunk('dreams/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // Get user token since route is protected
        return await dreamService.getDreams(token)
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}) // Only need thunkAPI, not submitting any data

export const deleteDream = createAsyncThunk('dreams/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // Get user token since route is protected
        return await dreamService.deleteDream(id, token)
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const dreamSlice = createSlice({
    name: 'dream',
    initialState,
    reducers: {
        reset: (state) => initialState
    }, extraReducers: (builder) => {
        builder
            .addCase(createDream.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDream.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.dreams.push(action.payload) // Add dream data to dreams state array
            })
            .addCase(createDream.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDreams.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDreams.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.dreams = action.payload // Get dream data from dreams state array
            })
            .addCase(getDreams.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteDream.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteDream.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.dreams = state.dreams.filter((dream) => dream._id !== action.payload.id) // remove dream from the UI
            })
            .addCase(deleteDream.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = dreamSlice.actions
export default dreamSlice.reducer

