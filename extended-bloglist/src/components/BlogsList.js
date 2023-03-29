import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useField } from '../hooks/index'
import ListGroup from 'react-bootstrap/ListGroup'
//import Button from 'react-bootstrap/Button'

const BlogList = () => {

  const blogStyle = {
    paddingTop: 10,
    //paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: '#102B5C'
  }

  //const searchButtStyle = {
  //  backgroundColor: 'blue',
  //  borderColor: 'navy',
  //  borderRadius: 25,
  //  borderWidth: 3,
  //  color: 'white',
  //  fontFamily: 'Consolas'
  //}

  //  const searchBarStyle = {
  //    textAlign: 'right'
  //  }


  //would somehow like to have diaries be sorted

  const titOrAuth = useField('tOA')
  console.log(titOrAuth, 'is tit or auth')

  const diaries = useSelector((state) =>
    state.blogs.map((blog) =>
      //<div style={blogStyle} className="container" key={blog.id}>
      <ListGroup className="container" key={blog.id}>
        <ListGroup.Item style={blogStyle}><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></ListGroup.Item>
      </ListGroup>
    )
  )
  //console.log(diaries, 'is diaries')

  //  const blogsToShow = titOrAuth.value === ''
  //    ? diaries
  //    : 'hmm'
  //  console.log(blogsToShow, 'is blogs to show')
  //  <div style={searchBarStyle}>
  //        <form>
  //          <input {...titOrAuth} placeholder='Search by title or author'/>
  //          <Button style={searchButtStyle}>search</Button>
  //        </form>
  //      </div>

  return (
    <div>
      <p></p>
      {diaries}
    </div>
  )
}

export default BlogList