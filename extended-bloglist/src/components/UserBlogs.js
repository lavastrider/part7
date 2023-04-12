import Spinner from 'react-bootstrap/Spinner'
import { useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import gravService from '../services/gravatar'
import { useState, useEffect } from 'react'

const textStyle = {
  fontFamily: 'Tillana'
}

const linkStyle = {
  cursor: 'move'
}

const smallerTextStyle = {
  fontSize: '20px',
  marginLeft: '1%'
}

const hrStyle = {
  color: '#94B9F0',
  //borderColor: '#94B9F0'
}

const hrStyle1 = {
  color: '#94B9F0',
  marginLeft: '-2%'
}

const marginStyle = {
  marginLeft: '1%'
}

const marginStyle1 = {
  marginLeft: '2%'
}

const imgStyle = {
  borderRadius: 50
}

const UserBlogs = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const id = useParams().id
  console.log(id, 'is id in usersblogs')

  const [userImg, setUserImg] = useState('')

  const bloggies = useSelector(state => state.blogs)
  console.log(bloggies, 'is bloggies')

  const users= useSelector(state => state.userInfo.appendUsers)
  console.log(users, 'is users in userblogs')

  useEffect(() => {
    const getDataWrapper = async () => {
      const response = await gravService.getImage(id)
      console.log(response, 'is img in userblogs')
      setUserImg(response)
    }
    getDataWrapper()
  }, [])



  if (bloggies.length > 0 && users) {
    const userInfo = users.map((info) => info.id === id ? ({ username: info.username, personName: info.personName }) : null)
    const nomen = userInfo.filter((value) => value !== null)
    console.log(nomen[0], 'is user info fil at nomen 0')

    const posterBlogs = []
    const blogObj = {
      title: '',
      id: ''
    }

    //put blogs the user has posted into array
    for (let j = 0; j < bloggies.length; j++) {
      //if the user of the blog isn't null
      if (bloggies[j].user){
        //console.log(bloggies[j].user, 'is bloggies j user when making sure it isn not null')
        //if the id of the blog poster is the same as the id from saved user
        if (bloggies[j].user.id === id) {
          //console.log(bloggies[j].user, 'is bloggies j user when the user id equals id from params')
          const newBlogEntry = Object.create(blogObj)
          newBlogEntry.title = bloggies[j].title
          newBlogEntry.id = bloggies[j].id
          posterBlogs.push(newBlogEntry)
        }
      }
    }

    //console.log(posterBlogs, 'is poster blogs')

    return (
      <div style={textStyle}>
        <h1 style={marginStyle}><img src={userImg} alt='avatar.png' width='10%' height='10%' style={imgStyle}></img> {nomen[0].personName}</h1>
        <hr style={hrStyle}></hr>
        <h3 style={smallerTextStyle}>{nomen[0].username}</h3>
        <hr style={hrStyle}></hr>
        {posterBlogs.length === 0 && <div>
          <h3 style={marginStyle}>{nomen[0].personName} has not posted a blog yet!</h3>
          <hr style={hrStyle}></hr>
        </div>}
        {posterBlogs.length > 0 && <div>
          <h3 style={marginStyle} >Here is the list of blogs {nomen[0].personName} has posted:</h3>
          <hr style={hrStyle}></hr>
          {posterBlogs.map((posting, ind) => {
            return (
              <div style={marginStyle1} key={ind}>
                <Link style={linkStyle} to={`/blogs/${posting.id}`}>{posting.title}</Link>
                <hr style={hrStyle1}></hr>
              </div>
            )
          })}
        </div>}
      </div>
    )
  }

  return (
    <Spinner animation="border" variant="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default UserBlogs