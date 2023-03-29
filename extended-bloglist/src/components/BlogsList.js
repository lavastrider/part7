import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const BlogList = () => {

  //const blogStyle = {
  //  paddingTop: 10,
  //  paddingLeft: 2,
  //  border: 'solid',
  //  borderWidth: 1,
  //  marginBottom: 5
  //}


  //would somehow like to have diaries be sorted

  const diaries = useSelector((state) =>
    state.blogs.map((blog) =>
      //<div style={blogStyle} className="container" key={blog.id}>
      <ListGroup className="container" key={blog.id}>
        <ListGroup.Item variant="light"><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></ListGroup.Item>
      </ListGroup>
    )
  )
  console.log(diaries, 'is diaries')

  return (
    <div>
      <p>check me out</p>
      {diaries}
    </div>
  )
}

export default BlogList