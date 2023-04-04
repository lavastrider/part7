//import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
//import gravService from '../services/gravatar'
import { Table } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

const userHeadStyle = {
  textAlign: 'center',
  color: 'black',
  fontFamily: 'Tillana'
}

//const imgFlipStyle = {
//  transform: 'scaleX(-1)'
//}

const tableLineStyle = {
  fontFamily: 'Tillana',
  borderBottom: '1px solid #94B9F0',
  //lineHeight: '50px'
}

//const vertLineStyle = {
//  borderLeft: '5px red double',
//  //position: 'absolute',
//  width: '100%',
//  height: '100%',
//  //float: 'left',
//  display: 'inline-block',
//  backgroundColor: '#DEDEDB'
//}

const spinnerStyle = {
  color: 'purple'
}

const textStyle = {
  color: 'black'
}

const Users = () => {

  const dispatch = useDispatch()
  //const [userImg, setUserImg] = useState('')
  //const [id, setId] = useState('')

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  //useEffect(() => {
  //  const getDataWrapper = async (id) => {
  //    const response = await gravService.getImage(id)
  //    console.log(response, 'is img in users')
  //    setUserImg(response)
  //  }
  //  //getDataWrapper()
  //}, [])

  const bloggiesUsers = useSelector(state => state.userInfo.appendUsers)
  console.log(bloggiesUsers, 'is bloggies users')

  //const userArray = []
  //const userAvi = {
  //}

  if (bloggiesUsers) {

    //console.log(blogPosters, 'is blog posters')
    //const avatar = 'https://static.vecteezy.com/system/resources/thumbnails/008/844/878/small/arrow-icon-design-free-png.png'
    //useEffect(() => {

    //}, [blogPosters])

    const bloggiesUserMap = bloggiesUsers.map((posting, ind) => {
      return (
        <tr style={tableLineStyle} key={ind}>
          <td><Link style={textStyle} to={`/users/${posting.posterId}`}>{posting.personName} ({posting.username})</Link></td>
          <td>{posting.blogs.length}</td>
        </tr>
      )
    })

    return (
      <div className='container'>
        <div style={userHeadStyle}>
          <h2>Users</h2>
        </div>
        <Table>
          <thead>
            <tr style={tableLineStyle}>
              <td></td>
              <td><strong>blogs posted</strong></td>
            </tr>
          </thead>
          <tbody>
            {bloggiesUserMap}
          </tbody>
        </Table>
      </div>
    )
  }

  return(
    <Spinner animation="border" style={spinnerStyle} variant="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default Users