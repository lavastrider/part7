import { useSelector, useDispatch } from 'react-redux'
import { setNotif } from '../reducers/notifReducer'
import { addingVote, removeEntry } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)
  //console.log(blogs, 'is blogs from useSelector')

  const users = useSelector(state => state.userInfo)

  const dispatch = useDispatch()

  const deleteBlog = async (id) => {
    const blog = blogs.find((book) => book.id === id)
    const agree = window.confirm(`Are you sure you want to delete ${blog.title}?`)
    if (agree) {
      dispatch(removeEntry(blog.id))
      //console.log('we deleted the blog inside of deleteblog in app')
      dispatch(setNotif(`"${blog.title}" has successfully been deleted`, 5))
    }
  }

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

  //would somehow like to have diaries be sorted

  const diaries = useSelector((state) =>
    state.blogs.map((blog) =>
      <Blog
        key={blog.id}
        blog={blog}
        userInfo={users}
        increaseLikes={() => increaseLikes(blog.id)}
        deleteEntry={() => deleteBlog(blog.id)}
      />
    ).sort((a, b) => {b.props.blog.likes - a.props.blog.likes})
  )
  console.log(diaries, 'is diaries')

  return diaries
}

export default BlogList