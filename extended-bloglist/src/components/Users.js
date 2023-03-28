import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { Table } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

const Users = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const setup = useSelector(state => state.userInfo)
  console.log(setup, 'is setup')

  if (setup) {
    const bloggiesUsers = useSelector(state => state.userInfo.appendUsers)
    //console.log(bloggiesUsers, 'is bloggies users')

    if (bloggiesUsers) {
      //console.log(bloggiesUsers.length, 'is bloggies users length')

      const blogPosters = []
      const userInfo = {
        poster: '',
        posterUser: '',
        posterId: '',
        posted: 0
      }

      for (let j = 0; j < bloggiesUsers.length; j++) {
        //if array isn't empty
        if (blogPosters.length !== 0) {
          const newUserInfo = Object.create(userInfo)
          newUserInfo.poster = bloggiesUsers[j].personName
          newUserInfo.posterUser = bloggiesUsers[j].username
          newUserInfo.posterId = bloggiesUsers[j].id
          newUserInfo.posted = Object.values(bloggiesUsers[j].blogs).length
          blogPosters.push(newUserInfo)
        }
        else { //the array is empty
          //if the person has a name
          if (bloggiesUsers[j].personName) {
            const newUserInfo = Object.create(userInfo)
            newUserInfo.poster = bloggiesUsers[j].personName
            newUserInfo.posterUser = bloggiesUsers[j].username
            newUserInfo.posterId = bloggiesUsers[j].id
            newUserInfo.posted = Object.values(bloggiesUsers[j].blogs).length
            blogPosters.push(newUserInfo)
          }
        }
      }

      //console.log(blogPosters, 'is blog posters')

      return (
        <div>
          <h1>Users</h1>
          <Table striped>
            <thead>
              <tr>
                <td></td>
                <td><strong>blogs created</strong></td>
              </tr>
            </thead>
            <tbody>
              {blogPosters.map((posting, ind) => {
                return (
                  <tr key={ind}>
                    <td><Link to={`/users/${posting.posterId}`}>{posting.poster}</Link></td>
                    <td>{posting.posted}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      )
    }
  }

  return(
    <Spinner animation="border" variant="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default Users