//import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setNotif } from '../reducers/notifReducer'
import { addingVote } from '../reducers/blogReducer'

//do we want to add ability to delete?

const Blog = () => {
  const id = useParams().id
  console.log(id, 'is id in blog component')

  const dispatch = useDispatch()

  const blog = useSelector(state => state.blogs)
  console.log(blog, 'is blog in Blog component')


  if (blog) {
    const displayBlog = blog.find((diary) => diary.id === id)
    console.log(displayBlog, 'is displayblog')

    const increaseLikes = async (id) => {

      const updatedBlogInfo = {
        likes: displayBlog.likes+1,
        author: displayBlog.author,
        title: displayBlog.title,
        url: displayBlog.url
      }

      console.log(updatedBlogInfo, 'is updated blog info')
      dispatch(addingVote(id, updatedBlogInfo))
      dispatch(setNotif(`You added a like to "${displayBlog.title}"`, 5))
    }

    if (displayBlog) {
      if (displayBlog.user) {
        return (
          <div>
            <h1>{displayBlog.title}</h1>
            <p>{displayBlog.url}</p>
            <p>{displayBlog.likes} likes <button onClick={() => increaseLikes(displayBlog.id)}>like</button></p>
            <p>added by {displayBlog.user.personName}</p>
            <p></p>
            <h3>comments</h3>
          </div>
        )
      }
      else {
        return (
          <div>
            <h1>{displayBlog.title}</h1>
            <p>{displayBlog.url}</p>
            <p>{displayBlog.likes} likes</p>
            <p>added by {displayBlog.user}</p>
            <p></p>
            <h3>comments</h3>
          </div>
        )
      }
    }
  }
  else {
    return (
      <p>loading...</p>
    )
  }

}
export default Blog