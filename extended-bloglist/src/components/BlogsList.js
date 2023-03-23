import { useSelector, useDispatch } from 'react-redux'
import { setNotif } from '../reducers/notifReducer'
import { addingVote } from '../reducers/blogReducer'
//import Blog from './Blog'

const App = () => {

  const blogs = useSelector(state => state.blogs)
  console.log(blogs, 'is blogs from useSelector')

  const dispatch = useDispatch()

  //const deleteBlog = async (id) => {
  //  const blog = blogs.find((book) => book.id === id)
  //  const agree = window.confirm(`Are you sure you want to delete ${blog.title}?`)
  //  if (agree) {
  //    await blogService.deleteEntry(blog.id)
  //    //console.log('we deleted the blog inside of deleteblog in app')
  //    dispatch(setNotif(`"${blog.title}" has successfully been deleted`, 5))
  //    setUpdatedBlog(1)
  // }
  //}

  const increaseLikes = async (id) => {
    const blog = blogs.find((diary) => diary.id === id)
    console.log(blog, 'is blog')
    //console.log(blog.id, 'is blog id')
    //console.log(blog.user, 'is blog user')
    //console.log(blog.user.id, 'is blog user id')
    console.log(blog.likes, 'is blog likes before update')

    const updatedBlogInfo = {
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    console.log(updatedBlogInfo, 'is updated blog info')
    dispatch(addingVote(id, updatedBlogInfo))
    dispatch(setNotif(`You added a like to "${blog.title}"`, 5))
  }

  //const mappedBlogs = blogs.map(blog => <Blog key={blog.id} blog={blog} userInfo={user} increaseLikes={() => increaseLikes(blog.id)} deleteEntry={() => deleteBlog(blog.id)}/>)
  //const mappedBlogs = blogs.map(blog => <Blog key={blog.id} blog={blog}/>)
  //const mappedBlogs = blogs.map((blog) => blog.id)
  //console.log(mappedBlogs, 'is mapped blogs')
  return (
    <div>
      {blogs.map((blog) =>
        <div key={blog.id}>
          <div>
            {blog.title}
          </div>
          <div>
            has {blog.likes}
            <button onClick={() => increaseLikes(blog.id)}>like</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App