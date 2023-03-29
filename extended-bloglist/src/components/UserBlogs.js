import Spinner from 'react-bootstrap/Spinner'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const UserBlogs = () => {
  const id = useParams().id
  console.log(id, 'is id in usersblogs')

  const bloggies = useSelector(state => state.blogs)
  console.log(bloggies, 'is bloggies')

  if (bloggies.length > 0) {
    //find user that has same id as id
    //save that user info to nomen

    var nomen = ''
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

    return (
      <div className="container">
        <h1>{nomen}</h1>
        <h3>Here is the list of blogs {nomen} has posted:</h3>
        {posterBlogs.map((posting, ind) => {
          return (
            <ul key={ind}>
              <li><Link to={`/blogs/${posting.id}`}>{posting.title}</Link></li>
            </ul>
          )
        })}
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