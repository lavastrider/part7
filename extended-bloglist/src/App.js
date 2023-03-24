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
//import { initializeBlogs, newBlogs } from './reducers/blogReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotif } from './reducers/notifReducer'
import { userData, userToken } from './reducers/userReducer'
//import {
//  BrowserRouter as Router,
//  Routes, Route, Link, useParams,
//  useNavigate
//} from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
        <Link style={padding} to="/blogs">blogs</Link>
      </div>
    </div>
  )
}

const Home = () => {
  return(
    <p>this exercise is hard</p>
  )
}

const Users = () => {
  const bloggies = useSelector(state => state.blogs)
  console.log(bloggies, 'is bloggies')

  if (bloggies.length > 0) {
    const blogPosters = []
    const blogInfo = {
      poster: '',
      posted: 0
    }

    //put authors of blogs in author array, no duplicates
    for (let j = 0; j<bloggies.length; j++) {
      //if the array is not empty
      if (blogPosters.length !== 0){
        //if the user isn't null
        if (bloggies[j].user) {
        //if the user isn't already there
          if (!(Object.values(blogPosters).map((creditor) => creditor.poster.includes(bloggies[j].user.personName)).includes(true))) {
            const newBlogInfo = Object.create(blogInfo)
            newBlogInfo.poster = bloggies[j].user.personName
            newBlogInfo.posted = 1
            blogPosters.push(newBlogInfo)
            //console.log(blogPosters, 'is blogPosters in if statement')
          } //else the user is already in the list
          else {
            //console.log(`We found a match! ${blogs[j].author} already is in the list`)
            const index = blogPosters.map((pencil) => pencil.poster).indexOf(bloggies[j].user.personName)
            //console.log(index, 'is index')
            //console.log(blogPosters[index].likes, 'should be the amount of likes that', blogPosters[index].author, 'has')
            if (blogPosters[index].poster === bloggies[j].user.personName) {
              blogPosters[index].posted += 1
            }
          //console.log(blogPosters[index].likes, 'is the new amount')
          }
        }
      }
      else { //the array is empty
        if (bloggies[j].user) {
          console.log('the array is length zero')
          console.log(bloggies[j].user, 'is bloggies j user')
          const newBlogInfo = Object.create(blogInfo)
          newBlogInfo.poster = bloggies[j].user.personName
          newBlogInfo.posted = 1
          blogPosters.push(newBlogInfo)
        }
      }
    }
    console.log(blogPosters, 'is blogPosters')

    const blogPostersObj = { blogPosters }
    console.log(blogPostersObj, 'is blog poster obj')

    const blogPostObjMa = blogPostersObj.blogPosters.map( (usernomen) => {
      <tr>
        <td>{usernomen.poster}</td>
        <td>{usernomen.posted}</td>
      </tr>
    })
    console.log(blogPostObjMa, 'is bPOM')

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
            {blogPostObjMa}
          </tbody>
        </table>
      </div>
    )
  }

  return(
    <div>
      <h1>Users</h1>
    </div>
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
  }

  //const addBlog = (blogObject) => {
  //  blogFormRef.current.toggleVisib()
  //  dispatch(newBlogs(blogObject))
  //  dispatch(setNotif(`The blog post "${blogObject.title}" by ${blogObject.author} has been added`, 5))
  //}


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

  //mappedBlogs.sort((a,b) => b.props.blog.likes-a.props.blog.likes)
  //console.log(mappedBlogs)
  //console.log(mappedBlogs[0], 'is mapped blogs zero')
  //console.log(mappedBlogs[0].props, 'is mapped blogs zero props')
  //console.log(mappedBlogs[0].props.blog, 'is mapped blogs zero props blog')
  //console.log(mappedBlogs[0].props.blog.likes, 'is mapped blogs zero props blog likes')

  //console.log(blogs, 'is blogs')
  //const sorted = [...blogs].sort((a,b) => a - b)
  //console.log(sorted, 'is sorted')
  //const sortVal = Object.values(blogs)
  //console.log(sortVal, 'is sort val')

  const user = useSelector(state => state.userInfo)


  return (
    <Router>
      <div>
        <Menu />
        <h2>Blogs</h2>
        <Notification />
        {!user && loginForm()}
        {user && <div>
          <p>{user.personName} is logged in</p>
          <button onClick={logOut}>logout</button>
        </div>
        }

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs" element={BlogsList} />
        </Routes>
      </div>
    </Router>
  )
}

export default App