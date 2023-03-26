import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments`)
  //const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject)
  console.log(response, 'is response in create')
  return response.data
}

const update = (id, newObject) => {
  console.log(id, 'is id in update')
  console.log(newObject, 'is new object in update')
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  console.log('we are in the update in service')
  console.log(request, 'is request in service')
  //console.log(request.then(response => response.data), 'is request then data')
  return request.then((response) => response.data)
}

//const deleteEntry = (id) => {
//  console.log('we are in the delete entry')
//  const config = {
//    headers: { Authorization: token }
//  }
//  axios.delete(`${baseUrl}/${id}`, config)
//  console.log('we deleted the entry')
//}

export default {
  getAll,
  create,
  update
}