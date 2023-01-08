import axios from 'axios'

const API_URL = '/api/dreams/'

// Create new dream entry
const createDream = async (dreamData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, dreamData, config)

    return response.data
}

// Get a user's dreams
const getDreams = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const deleteDream = async (dreamId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + dreamId, config)

    return response.data
}

const dreamService = {
    createDream,
    getDreams,
    deleteDream
}

export default dreamService