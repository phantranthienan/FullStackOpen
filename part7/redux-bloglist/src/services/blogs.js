import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  axios.defaults.headers.common['Authorization'] = token
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  console.log(response.data)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  console.log(response.data)
  return response.data
}

const remove = async (id) => {
  const respone = await axios.delete(`${baseUrl}/${id}`)
  return respone.data
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { content: comment })
  return response.data
}

export default { getAll, setToken, create, update, remove, addComment }
