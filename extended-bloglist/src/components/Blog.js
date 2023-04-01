//import { useEffect } from 'react'
//import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setNotif } from '../reducers/notifReducer'
import { addingVote, removeEntry } from '../reducers/blogReducer'
import { newComment } from '../reducers/commentReducer'
//import { newComment, initializeComms } from '../reducers/commentReducer'
import { useNavigate, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

const likeButtStyle = {
  fontFamily: 'Tillana',
  color: 'black',
  backgroundColor: '#858484',
  borderColor: 'black',
  borderRadius: 25
}

const delButtStyle = {
  fontFamily: 'Tillana',
  color: 'black',
  backgroundColor: '#858484',
  borderColor: 'black',
  borderRadius: 25
}

const allButtStyle = {
  fontFamily: 'Tillana',
  color: 'black',
  backgroundColor: '#858484',
  borderColor: 'black',
  borderRadius: 25
}

const commentButtStyle = {
  fontFamily: 'Tillana',
  color: 'black',
  backgroundColor: '#858484',
  borderColor: 'black',
  borderRadius: 25
}

const hrStyle = {
  padding: '-10',
  color: '#94B9F0',
  borderWidth: 2
}

const hrStyle1 = {
  padding: '-10',
  color: '#94B9F0',
  borderWidth: 2,
  marginLeft: -20
}

const lineHeightMargAdjStyle = {
  lineHeight: 0.5,
  margin: 5,
  //fontFamily: 'DeliciousHandrawn'
  fontFamily: 'Tillana'
}

const lineHeightMargAdjStyle1 = {
  fontFamily: 'Tillana',
  lineHeight: 0.5,
  marginRight: 20,
  textAlign: 'right'
}

const lineHeightAdjStyle = {
  fontFamily: 'Tillana',
  lineHeight: 0.5,
}

const margStyle = {
  fontFamily: 'Tillana',
  margin: 5
}

const margStyle1 = {
  fontFamily: 'Tillana',
  margin: 5,
  textAlign: 'right'
}

const Blog = () => {
  const id = useParams().id
  //console.log(id, 'is id in blog component')

  var sameUser = false

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blog = useSelector(state => state.blogs)
  //console.log(blog, 'is blog in Blog component')

  const commentsSelect = useSelector(state => state.comments)
  //console.log(commentsSelect, 'is commentsSelect in blog component')

  const userLocalStorage = window.localStorage.getItem('loggedBlogAppUser')
  //console.log(userLocalStorage, 'is user local storage')


  if (blog && commentsSelect) {
    const displayBlog = blog.find((diary) => diary.id === id)
    //console.log(displayBlog, 'is displayblog')

    const commentsSelectMap = commentsSelect.map((thought) => thought.blog ? thought : null)
    console.log(commentsSelectMap, 'is comm select map with thought if thought blog exist')

    //the following is done because as a result of deleting blogs via database,
    //some blogs in above map are null
    const cSMCopy = [...commentsSelectMap]
    const commSelectMapNull = cSMCopy.filter((comm) => comm)
    console.log(commSelectMapNull, 'is commSelectMapNull')

    const increaseLikes = async (id) => {

      const updatedBlogInfo = {
        likes: displayBlog.likes+1,
        author: displayBlog.author,
        title: displayBlog.title,
        url: displayBlog.url
      }

      //console.log(updatedBlogInfo, 'is updated blog info')
      dispatch(addingVote(id, updatedBlogInfo))
      dispatch(setNotif(`You added a like to "${displayBlog.title}"`, 5))
    }

    const deleteBlog = () => {
      const agree = window.confirm(`Are you sure you want to delete ${displayBlog.title}?`)
      if (agree) {
        dispatch(removeEntry(displayBlog.id))
        //console.log('we deleted the blog inside of deleteblog in app')
        navigate('/blogs')
        dispatch(setNotif(`"${displayBlog.title}" has successfully been deleted`, 5))
      }
    }

    const postComment = (event) => {
      event.preventDefault()
      const content = event.target.comment.value
      //console.log(content, 'is content of text file')
      dispatch(newComment(content, id))
      event.target.comment.value = ''
    }

    if (displayBlog) {

      if (userLocalStorage) {
        if (JSON.parse(userLocalStorage).username === displayBlog.user.username) {
          sameUser = true
        }
      }

      const cSMCopy1 = [...commSelectMapNull]
      const commentBlog = cSMCopy1.filter((quip) => quip.blog.id ? quip.blog.id === id : quip.blog === id)
      //console.log(commentBlog, 'is blog with comments that match blog id in blog component')

      const comments = commentBlog.map((notes, i) => <div style={lineHeightMargAdjStyle1} key={i}><p>{notes.comment}</p><hr style={hrStyle1}></hr></div>)
      //console.log(comments, 'is comments in display blog notes to notes without display blog user')

      const label = displayBlog.likes === 1
        ? 'like'
        : 'likes'

      if (displayBlog.user) {
        return (
          <div>
            <h1 style={lineHeightAdjStyle}><strong>{displayBlog.title}</strong></h1>
            <hr style={hrStyle}></hr>
            <p style={lineHeightMargAdjStyle}>by {displayBlog.author}</p>
            <hr style={hrStyle}></hr>
            <p style={lineHeightMargAdjStyle}>{displayBlog.url}</p>
            <hr style={hrStyle}></hr>
            <p style={lineHeightMargAdjStyle}>{displayBlog.likes} {label} <Button style={likeButtStyle} onClick={() => increaseLikes(displayBlog.id)}>like</Button></p>
            <hr style={hrStyle}></hr>
            <p style={lineHeightMargAdjStyle}>added by <Link to={`/users/${displayBlog.user.id}`}>{displayBlog.user.personName}</Link> {sameUser && <Button style={delButtStyle} onClick={() => deleteBlog()}>delete blog</Button>}</p>
            <hr style={hrStyle}></hr>
            <p style={lineHeightMargAdjStyle}><Button style={allButtStyle} onClick={() => navigate('/blogs')}>all blogs</Button></p>
            <hr style={hrStyle}></hr>
            <p></p>
            <h3 style={margStyle}>comments</h3>
            <form style={margStyle1} onSubmit={postComment}>
              <input type="text" name="comment"/> <Button style={commentButtStyle} type="submit">add comment</Button>
            </form>
            <hr style={hrStyle}></hr>
            {comments}
          </div>
        )
      }
      else {

        return (
          <div className="container">
            <h1>{displayBlog.title}</h1>
            <hr style={hrStyle}></hr>
            <p>by {displayBlog.author}</p>
            <p>{displayBlog.url}</p>
            <p>{displayBlog.likes} {label} <Button style={likeButtStyle} onClick={() => increaseLikes(displayBlog.id)}>like</Button></p>
            <p><Button onClick={() => navigate('/blogs')}>return to the list</Button></p>
            <p>pee</p>
            <h3>comments</h3>
            <form onSubmit={postComment}>
              <input type="text" name="comment"/> <Button type="submit">add comment</Button>
            </form>
            {comments}
          </div>
        )
      }
    }
  }
  else {
    return (
      <Spinner animation="border" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

}
export default Blog