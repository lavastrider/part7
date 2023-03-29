import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { newBlogs } from '../reducers/blogReducer'
import { setNotif } from '../reducers/notifReducer'
import { useField } from '../hooks/index'

const Create = () => {
  const title = useField('title')
  const author = useField('author')
  const site = useField('url')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addBlog = (blogObject) => {
    dispatch(newBlogs(blogObject))
    navigate('/blogs')
    dispatch(setNotif(`The blog post "${blogObject.title}" by ${blogObject.author} has been added`, 5))
  }

  const createBlogObj = (event) => {
    event.preventDefault()
    addBlog({
      title: title.value,
      author: author.value,
      url: site.value,
      likes: 0
    })
    console.log('we are in create blog object')
  }

  return(
    <div className="container">
      <form onSubmit={createBlogObj}>
        <div>
          Title:
          <input {...title} placeholder="What's the title?"/>
        </div>
        <div>
          Author:
          <input {...author} placeholder="Who wrote it?"/>
        </div>
        <div>
          Link:
          <input {...site} placeholder="https://..."/>
        </div>
        <Button type="submit">submit</Button>
      </form>
    </div>
  )
}

export default Create