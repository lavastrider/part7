import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  //would somehow like to have diaries be sorted

  const diaries = useSelector((state) =>
    state.blogs.map((blog) =>
      <div style={blogStyle} key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
      </div>
    )
  )
  console.log(diaries, 'is diaries')

  return diaries
}

export default BlogList