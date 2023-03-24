import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogsList from './components/BlogsList'
import { initializeBlogs, newBlogs } from './reducers/blogReducer'
import { setNotif } from './reducers/notifReducer'
import { userData, userToken } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogFormRef= useRef()

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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisib()
    dispatch(newBlogs(blogObject))
    dispatch(setNotif(`The blog post "${blogObject.title}" by ${blogObject.author} has been added`, 5))
  }


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
    <div>
      <h2>Blogs</h2>
      <Notification />
      {!user && loginForm()}
      {user && <div>
        <p>{user.personName} is logged in</p>
        <button onClick={logOut}>logout</button>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
        <h2>Blog List</h2>
        <BlogsList />
      </div>
      }
    </div>
  )
}

export default App