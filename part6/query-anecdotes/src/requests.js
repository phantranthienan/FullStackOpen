import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createAnecdote = async (content) => {
    const anecdote = { content, id: getId(), votes: 0 }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

export const updateAnecdote = async (anecdote) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
}

