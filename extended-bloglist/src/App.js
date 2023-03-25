//import { useState, useEffect, useRef } from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import { useDispatch } from 'react-redux'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
//import BlogForm from './components/BlogForm'
import BlogsList from './components/BlogsList'
import Blog from './components/Blog'
//import { initializeBlogs, newBlogs } from './reducers/blogReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotif } from './reducers/notifReducer'
import { userData, userToken, initializeUsers } from './reducers/userReducer'
//import {
//  BrowserRouter as Router,
//  Routes, Route, Link, useParams,
//  useNavigate
//} from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'

const Menu = () => {

  const user = useSelector(state => state.userInfo)
  console.log(user, 'is user use selector userinfo')

  const logOut = () => {
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      if (!(window.localStorage.getItem('loggedBlogAppUser'))) {
        window.location.reload(true)
      }
    } catch (exception) {
      console.log('we have an error')
    }
  }

  const padding = {
    paddingRight: 5
  }

  if (user.length === 0) {
    return (
      <div>
        <div>
          <Link style={padding} to="/users">users</Link>
          <Link style={padding} to="/blogs">blogs</Link>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <div>
          <Link style={padding} to="/users">users</Link>
          <Link style={padding} to="/blogs">blogs</Link>
          <p>{user.personName} is logged in <button onClick={logOut}>logout</button></p>
        </div>
      </div>
    )
  }
}

const Home = () => {
  return(
    <p>this exercise is hard</p>
  )
}

const UsersBlogs = () => {
  const id = useParams().id
  console.log(id, 'is id in usersblogs')

  const bloggies = useSelector(state => state.blogs)
  console.log(bloggies, 'is bloggies')

  if (bloggies.length > 0) {
    //find user that has same id as id
    //save that user info to nomen

    var nomen = ''
    const posterBlogs = []

    //put blogs the user has posted into array
    for (let j = 0; j < bloggies.length; j++) {
      //if the user of the blog isn't null
      if (bloggies[j].user){
        //console.log(bloggies[j].user, 'is bloggies j user when making sure it isn not null')
        //if the id of the blog poster is the same as the id from saved user
        if (bloggies[j].user.id === id) {
          //console.log(bloggies[j].user, 'is bloggies j user when the user id equals id from params')
          nomen = bloggies[j].user.personName
          posterBlogs.push(bloggies[j].title)
        }
      }
    }

    //console.log(posterBlogs, 'is poster blogs')
    //const phrases = anecdotes.find((words) => words.id=== Number(id))
    //could do above for posterBlogs
    //will decide later

    return (
      <div>
        <h1>{nomen}</h1>
        <h2>added blogs</h2>
        {posterBlogs.map((posting, ind) => {
          return (
            <ul key={ind}>
              <li>{posting}</li>
            </ul>
          )
        })}
      </div>
    )
  }

  return (
    <p>loading...</p>
  )

}

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
          <table>
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
          </table>
        </div>
      )
    }
  }

  return(
    <p>loading...</p>
  )

}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  //const blogFormRef= useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    //here is where we do login stuff
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    //console.log(loggedUserJSON, 'is logged user')
    if (loggedUserJSON) {
      const usered = JSON.parse(loggedUserJSON)
      dispatch(userData(usered))
      //console.log(user, 'is user in useeffect')
      dispatch(userToken(usered))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const usering = await loginService.login({ username, password })
      window.localStorage.setItem( 'loggedBlogAppUser', JSON.stringify(usering) )
      dispatch(userData(usering))
      dispatch(userToken(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotif('Error: Wrong username or password', 5))
    }
    //navigate('/blogs')
  }

  //const addBlog = (blogObject) => {
  //  blogFormRef.current.toggleVisib()
  //  dispatch(newBlogs(blogObject))
  //  dispatch(setNotif(`The blog post "${blogObject.title}" by ${blogObject.author} has been added`, 5))
  //}

  //sign up form?
  
  const signUpForm = (props) => {
    console.log(props, is value passed to sign up form for eslint')
  }
  
  signUpForm('new user')

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const user = useSelector(state => state.userInfo)
  console.log(user, 'is user use selector userinfo')

  if (user.length === 0) {
    return (
      <Router>
        <div>
          <Menu />
          <h2>Blogs</h2>
          <Notification />
          {loginForm()}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UsersBlogs />} />
            <Route path="/blogs" element={<BlogsList />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </div>
      </Router>
    )
  }


  return (
    <Router>
      <div>
        <Menu />
        <h2>Blogs</h2>
        <Notification />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UsersBlogs />} />
          <Route path="/blogs" element={<BlogsList />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App