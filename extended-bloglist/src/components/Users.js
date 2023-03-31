import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { Table } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'


const userHeadStyle = {
  textAlign: 'center',
  color: 'magenta',
  fontFamily: 'Consolas'
}

const imgFlipStyle = {
  transform: 'scaleX(-1)'
}

const tableLineStyle = {
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

const Users = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const setup = useSelector(state => state.userInfo)
  console.log(setup, 'is setup in users')

  if (setup) {
    const bloggiesUsers = useSelector(state => state.userInfo.appendUsers)
    console.log(bloggiesUsers, 'is bloggies users')

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

      const kbImg = 'https://c8.alamy.com/comp/AY7NJT/close-up-of-persons-fingers-pressing-laptop-keyboard-with-english-AY7NJT.jpg'
      const avatar = 'https://static.vecteezy.com/system/resources/thumbnails/008/844/878/small/arrow-icon-design-free-png.png'

      return (
        <div className='container'>
          <div style={userHeadStyle}>
            <h2><img src={kbImg} width='20' height='20'></img> Users <img src={kbImg} width='20' height='20' style={imgFlipStyle}></img></h2>
          </div>
          <Table>
            <thead>
              <tr style={tableLineStyle}>
                <td></td>
                <td><strong>blogs posted</strong></td>
              </tr>
            </thead>
            <tbody>
              {blogPosters.map((posting, ind) => {
                return (
                  <tr style={tableLineStyle} key={ind}>
                    <td><img src={avatar} alt='user avatar' width='20' height='20'></img> <Link to={`/users/${posting.posterId}`}>{posting.poster}</Link></td>
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