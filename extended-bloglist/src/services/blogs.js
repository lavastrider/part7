import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  //this is used when increasing the votes
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  console.log('we are in the update in service')
  return request.then((response) => response.data)
}

const deleteEntry = (id) => {
  console.log('we are in the delete entry')
  const config = {
    headers: { Authorization: token }
  }
  axios.delete(`${baseUrl}/${id}`, config)
  console.log('we deleted the entry')
}

export default {
  getAll,
  create,
  update,
  deleteEntry,
  setToken
}