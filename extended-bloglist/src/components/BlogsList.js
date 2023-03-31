import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//import { useField } from '../hooks/index'
//import ListGroup from 'react-bootstrap/ListGroup'
//import Button from 'react-bootstrap/Button'

const BlogList = () => {

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: '-20',
    paddingLeft: 10,
    //backgroundColor: '#102B5C'
    backgroundColor: '#DEDEDB',
    lineHeight: 0.1
  }

  //const searchButtStyle = {
  //  backgroundColor: 'blue',
  //  borderColor: 'navy',
  //  borderRadius: 25,
  //  borderWidth: 3,
  //  color: 'white',
  //  fontFamily: 'Consolas'
  //}

  const linkStyle = {
    color: 'black',
    //fontStyle: 'none'
  }

  const headStyle = {
    fontFamily: 'Consolas',
    paddingLeft: '10px',
    lineHeight: 0.5
  }

  const hrStyle = {
    padding: '-10',
    color: '#94B9F0',
    borderWidth: 2
  }


  //would somehow like to have diaries be sorted

  //const titOrAuth = useField('tOA')
  //console.log(titOrAuth, 'is tit or auth')

  //const diaries = useSelector((state) =>
  //  state.blogs.map((blog) =>
  //    //<div style={blogStyle} className="container" key={blog.id}>
  //    <ListGroup className="container" key={blog.id}>
  //      <ListGroup.Item style={blogStyle}><Link style={linkStyle} to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></ListGroup.Item>
  //      <hr></hr>
  //    </ListGroup>
  //  )
  //)

  const diaries = useSelector((state) =>
    state.blogs.map((blog) =>
      //<div style={blogStyle} className="container" key={blog.id}>
      <div key={blog.id}>
        <p style={blogStyle}><Link style={linkStyle} to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></p>
        <hr style={hrStyle}></hr>
      </div>
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
      <h2 style={headStyle}>Click on a link to see information about a blog!</h2>
      <hr style={hrStyle}></hr>
      {diaries}
    </div>
  )
}

export default BlogList