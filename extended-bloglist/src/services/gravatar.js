import axios from 'axios'
import md5 from 'md5'
const baseUrl = 'https://www.gravatar.com'
//const cors = require('cors')

const getProfile = ( email ) => {
  const emailCleanHash = md5(email.toLowerCase().trim())
  console.log(email, 'is email before hashing in gravatar service in frontend')
  const request = axios.get(`${baseUrl}/${emailCleanHash}`)
  //const request = axios.get(baseUrl)
  console.log(request.then(response => response.data), 'is request then response data in gravatar service in frontend')
  return request.then(response => response.data)
}

const getImage = () => {

}

export default {
  getProfile,
  getImage
}