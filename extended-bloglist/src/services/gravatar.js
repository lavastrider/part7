import axios from 'axios'
//const baseUrl = 'https://www.gravatar.com'
//const cors = require('cors')

const getImage = async ( id ) => {
  //needs to be renamed to get all
  console.log(id, 'is id in gravatar getimg. it should be the same as the user id')
  const userImgData = await axios.get('/api/grav')
  //console.log(userImgData, 'is user img data')
  console.log(userImgData.data, 'is user img data in get img')
  const userImgDataMap = userImgData.data.map((userInfo) => userInfo.id === id ? userInfo.thumbnail : null)
  console.log(userImgDataMap, 'is user img data map')
  const userImgFilter = userImgDataMap.filter((value) => value !== (null))
  //console.log(userImgFilter, 'is filter')
  return userImgFilter
}

const getImageSingle = async (id ) => {
  console.log(id, 'is id in single')
}

export default {
  getImage,
  getImageSingle
}