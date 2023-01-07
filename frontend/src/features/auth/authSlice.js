import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { set } from 'mongoose'
import authService from './authService'

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {  // Set initial application state
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user) // Attempt to register user with data from user, get response data back
    } catch (error) {   // If there is an error
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)    // Reject the promise with error message
    }
})

// Log in user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)    // Attempt to log in user with data from user, get response data back
    } catch (error) {   // If there is an error
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message) // Reject the promise with the error message
    }
})

// Log out user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()  // Call logout from authService
})

// Authentication slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => { // Reset reducer for setting state back to default, takes in state & reassigns values
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {   // Extra reducers for managing state during register & login
        builder
            // REGISTER
            .addCase(register.pending, (state) => { // Application is loading while register promise is pending
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {   // Loading completed, registration successfull, set the user in state from action payload
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {    // Loading completed, registration error, set message to error message from action payload
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null   // registration was unsuccessful, set user to null
            })
            // LOGIN
            .addCase(login.pending, (state) => {    // Application loading while login is pending
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {  // Done loading, login successful, set user in state
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {   // Done loading, login error, set error message
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null   // Set user to null
            })
            .addCase(logout.fulfilled, (state) => { // Logout successful
                // state.isSuccess = false
                state.user = null   // Set user to null
            })
    },
})

// Export functions
export const { reset } = authSlice.actions
export default authSlice.reducer