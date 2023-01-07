import axios from 'axios'   // Use axios for making API requests

// API base url
const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)    // Attempt to create user with user data

    if (response.data) {    // If user creation succeeds
        localStorage.setItem('user', JSON.stringify(response.data)) // Add user data to local storage, including token for authentication
    }

    return response.data    // Return user data
}

// Log in user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)  // Attempt login with user data 

    if (response.data) {    // If login succeeds
        localStorage.setItem('user', JSON.stringify(response.data)) // Add user data to local storage, including token for authentication 
    }

    return response.data    // Return user data
}

// Logout user
const logout = async () => {
    localStorage.removeItem('user') // Delete user data from local storage, including token
}

// Export functions
const authService = {
    register,
    login,
    logout
}

export default authService