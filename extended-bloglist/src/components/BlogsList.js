import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '../hooks/index'
//import { useField } from '../hooks/index'
//import ListGroup from 'react-bootstrap/ListGroup'
//import Button from 'react-bootstrap/Button'

//const blogStyle = {
//  paddingTop: 10,
//  paddingBottom: '-20',
//  paddingLeft: 10,
//  //backgroundColor: '#102B5C'
//  backgroundColor: '#DEDEDB',
//  lineHeight: 0.1,
//  fontFamily: 'Tillana',
//  //fontSize: '1.1vw'
//}

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

//const headStyle = {
//  fontFamily: 'Tillana',
//  paddingLeft: '10px',
//  lineHeight: 0.5,
//  //fontSize: '2.15vw'
//}

const hrStyle = {
  padding: '-10',
  color: '#94B9F0',
  borderWidth: 2
}

//@media screen and (maxWidth: 500px) {
//  blogStyle, headStyle {
//    fontSize: '50px'
//  }
//}

const BlogList = () => {

  const isPhoneTablet = useMediaQuery('(max-width: 500px)')
  //console.log(isPhoneTablet, 'is isphonetablet')

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: '-20',
    paddingLeft: 10,
    //backgroundColor: '#102B5C'
    backgroundColor: '#DEDEDB',
    lineHeight: 0.1,
    fontFamily: 'Tillana',
    fontSize: isPhoneTablet ? '1.2vw' : '2vw'
  }

  const headStyle = {
    fontFamily: 'Tillana',
    paddingLeft: '10px',
    lineHeight: 0.5,
    fontSize: isPhoneTablet ? '3vw' : '4vw'
    //fontSize: '2.15vw'
  }

  //would somehow like to have diaries be sorted

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

  return (
    <div>
      <h2 style={headStyle}>Click on a link to see information about a blog!</h2>
      <hr style={hrStyle}></hr>
      {diaries}
    </div>
  )
}

export default BlogList