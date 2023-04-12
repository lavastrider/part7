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

const tableLineStyle = {
  fontFamily: 'Tillana',
  borderBottom: '1px solid #94B9F0',
  //lineHeight: '50px'
}

const spinnerStyle = {
  color: 'purple'
}

const textStyle = {
  color: 'black',
  cursor: 'move'
}

const Users = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const bloggiesUsers = useSelector(state => state.userInfo.appendUsers)
  console.log(bloggiesUsers, 'is bloggies users')

  if (bloggiesUsers) {

    const bloggiesUserMap = bloggiesUsers.map((posting, ind) => {
      return (
        <tr style={tableLineStyle} key={ind}>
          <td><Link style={textStyle} to={`/users/${posting.id}`}>{posting.personName} ({posting.username})</Link></td>
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