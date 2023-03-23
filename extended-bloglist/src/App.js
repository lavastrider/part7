import { useState, useEffect, useRef } from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { useDispatch } from 'react-redux'
//import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogsList from './components/BlogsList'
import { initializeBlogs, newBlogs } from './reducers/blogReducer'
import { setNotif } from './reducers/notifReducer'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [updatedBlog, setUpdatedBlog] = useState('')
  console.log(updatedBlog, 'is updated blog console to use for eslint error')

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
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //console.log(user, 'is user in useeffect')
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem( 'loggedBlogAppUser', JSON.stringify(user) )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotif('Error: Wrong username or password', 5))
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisib()
    dispatch(newBlogs(blogObject))
    //blogService
    //  .create(blogObject)
    //  .then((returnedBlog) => {
    //    console.log(returnedBlog, 'is the obj that is returned blog')
    //    setBlogs(blogs.concat(returnedBlog))
    // })
    //  .catch((error) => {
    //    dispatch(setNotif('There was an error when submitting the blog\'s information. Please try again.', 5))
    //    console.log(error, 'is error in blog service when adding blog')
    //  })
    dispatch(setNotif(`The blog post "${blogObject.title}" by ${blogObject.author} has been added`, 5))
    setUpdatedBlog(2000)
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
        <BlogsList user={user}/>
      </div>
      }
    </div>
  )
}

export default App