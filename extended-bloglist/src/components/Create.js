import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { newBlogs } from '../reducers/blogReducer'
import { setNotif } from '../reducers/notifReducer'
import { useField } from '../hooks/index'

const submitBlogStyle = {
  backgroundColor: '#DEDEDB',
  borderColor: 'black',
  borderRadius: 25,
  borderWidth: 3,
  color: 'black',
  fontFamily: 'Tillana'
}

const textStyle = {
  fontFamily: 'Tillana',
  textAlign: 'center'
}

const hrStyle = {
  padding: '-10',
  color: '#94B9F0',
  borderWidth: 2
}

const inputStyle = {
  cursor: 'cell'
}

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
    <div className="container" style={textStyle}>
      <form onSubmit={createBlogObj}>
        <div>
          <input {...title}
            style={inputStyle}
            placeholder="What's the title?"
          />
        </div>
        <hr style={hrStyle}></hr>
        <div>
          <input {...author}
            style={inputStyle}
            placeholder="Who wrote it?"
          />
        </div>
        <hr style={hrStyle}></hr>
        <div>
          <input {...site}
            style={inputStyle}
            placeholder="https://..."
          />
        </div>
        <hr style={hrStyle}></hr>
        <Button type="submit" style={submitBlogStyle}>submit</Button>
        <hr style={hrStyle}></hr>
      </form>
    </div>
  )
}

export default Create