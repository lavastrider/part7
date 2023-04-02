import Spinner from 'react-bootstrap/Spinner'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const textStyle = {
  fontFamily: 'Tillana'
}

const smallerTextStyle = {
  fontSize: '20px',
  marginLeft: '1%'
}

const hrStyle = {
  color: '#94B9F0',
  //borderColor: '#94B9F0'
}

const hrStyle1 = {
  color: '#94B9F0',
  marginLeft: '-2%'
}

const marginStyle = {
  marginLeft: '1%'
}

const marginStyle1 = {
  marginLeft: '2%'
}

const UserBlogs = () => {
  const id = useParams().id
  console.log(id, 'is id in usersblogs')

  const bloggies = useSelector(state => state.blogs)
  console.log(bloggies, 'is bloggies')

  //const nomen = User.findById(id)
  //or useSelector for state.userInfo where id matches useparams id

  if (bloggies.length > 0) {
    //find user that has same id as id
    //save that user info to nomen

    var nomen = ''
    var nomenUse = ''
    const posterBlogs = []
    const blogObj = {
      title: '',
      id: ''
    }

    //put blogs the user has posted into array
    for (let j = 0; j < bloggies.length; j++) {
      //if the user of the blog isn't null
      if (bloggies[j].user){
        //console.log(bloggies[j].user, 'is bloggies j user when making sure it isn not null')
        //if the id of the blog poster is the same as the id from saved user
        if (bloggies[j].user.id === id) {
          //console.log(bloggies[j].user, 'is bloggies j user when the user id equals id from params')
          nomen = bloggies[j].user.personName
          nomenUse = bloggies[j].user.username
          const newBlogEntry = Object.create(blogObj)
          newBlogEntry.title = bloggies[j].title
          newBlogEntry.id = bloggies[j].id
          posterBlogs.push(newBlogEntry)
        }
      }
    }

    //console.log(posterBlogs, 'is poster blogs')
    //const phrases = anecdotes.find((words) => words.id=== Number(id))
    //if do this don't think i can get nomen so not going to
    //could do above for posterBlogs
    //will decide later
    //doesn't work if the user has posted zero blogs

    return (
      <div style={textStyle}>
        <h1 style={marginStyle}>UserAvatar {nomen} <h3 style={smallerTextStyle}>aka {nomenUse}</h3></h1>
        <hr style={hrStyle}></hr>
        <h3 style={marginStyle}>About {nomen}</h3>
        <hr style={hrStyle}></hr>
        {posterBlogs.length === 0 && <h3 style={marginStyle}>{nomen} has not posted a blog yet!</h3>}
        {posterBlogs.length > 0 && <div>
          <h3 style={marginStyle} >Here is the list of blogs {nomen} has posted:</h3>
          {posterBlogs.map((posting, ind) => {
            return (
              <div style={marginStyle1} key={ind}>
                <Link to={`/blogs/${posting.id}`}>{posting.title}</Link>
                <hr style={hrStyle1}></hr>
              </div>
            )
          })}
        </div>}
      </div>
    )
  }

  return (
    <Spinner animation="border" variant="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default UserBlogs