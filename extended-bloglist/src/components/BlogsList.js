import { useSelector } from 'react-redux'
//import Blog from './Blog'

const App = () => {

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

  //const increaseLikes = async (id) => {
  //  const blog = blogs.find((diary) => diary.id === id)
  // console.log(blog, 'is blog')
  //  console.log(blog.id, 'is blog id')
  //console.log(blog.user, 'is blog user')
  //console.log(blog.user.id, 'is blog user id')
  //  console.log(blog.likes, 'is blog likes before update')

  //  const updatedBlogInfo = {
  //    likes: blog.likes+1,
  //    author: blog.author,
  //   title: blog.title,
  //   url: blog.url
  //  }

  //  setUpdatedBlog(updatedBlogInfo.likes)
  //console.log(updatedBlogInfo, 'is updated blog info')
  //  await blogService.update(blog.id, updatedBlogInfo)
  //}

  const blogs = useSelector(state => state.blogs)
  console.log(blogs, 'is blogs from useSelector')

  //const mappedBlogs = blogs.map(blog => <Blog key={blog.id} blog={blog} userInfo={user} increaseLikes={() => increaseLikes(blog.id)} deleteEntry={() => deleteBlog(blog.id)}/>)
  //const mappedBlogs = blogs.map(blog => <Blog key={blog.id} blog={blog}/>)
  //console.log(mappedBlogs, 'is mapped blogs')
  return (
    <div>
      {blogs.map((blog) =>
        <div key={blog.id}>
          <div>
            {blog.title}
          </div>
          <div>
            has {blog.votes}
            <button onClick={() => console.log('button clicked')}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App