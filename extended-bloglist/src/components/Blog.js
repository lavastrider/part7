import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setNotif } from '../reducers/notifReducer'
import { addingVote } from '../reducers/blogReducer'
//import { newComment } from '../reducers/commentReducer'
import { newComment, initializeComms } from '../reducers/commentReducer'

//do we want to add ability to delete?

const Blog = () => {
  const id = useParams().id
  console.log(id, 'is id in blog component')

  const dispatch = useDispatch()

  const blog = useSelector(state => state.blogs)
  console.log(blog, 'is blog in Blog component')

  const commentsSelect = useSelector(state => state.comments)
  console.log(commentsSelect, 'is commentsSelect in blog component')


  if (blog && commentsSelect) {
    const displayBlog = blog.find((diary) => diary.id === id)
    console.log(displayBlog, 'is displayblog')

    const commentsSelectMap = commentsSelect.map((thought) => thought.blog ? thought : null)
    console.log(commentsSelectMap, 'is comm select map with thought if thought blog exist')

    useEffect(() => {
      console.log('peep')
      //want to re-run filter maybe, every time map def is updated
      dispatch(initializeComms(id))
    }, [dispatch])

    const increaseLikes = async (id) => {

      const updatedBlogInfo = {
        likes: displayBlog.likes+1,
        author: displayBlog.author,
        title: displayBlog.title,
        url: displayBlog.url
      }

      console.log(updatedBlogInfo, 'is updated blog info')
      dispatch(addingVote(id, updatedBlogInfo))
      dispatch(setNotif(`You added a like to "${displayBlog.title}"`, 5))
    }

    const postComment = (event) => {
      event.preventDefault()
      const content = event.target.comment.value
      console.log(content, 'is content of text file')
      dispatch(newComment(content, id))
      event.target.comment.value = ''
    }

    if (displayBlog) {
      const cSMCopy = [...commentsSelectMap]
      const commentBlog = cSMCopy.filter((quip) => quip.blog.id ? quip.blog.id === id : quip.blog === id)
      console.log(commentBlog, 'is blog with comments that match blog id in blog component')

      //const commentBlog = commentsSelectMap.filter((quip) => quip.blog.id.toLowerCase().includes(id.toLowerCase()))
      //console.log(commentBlog, 'is blog with comments that match blog id in blog component')

      //const comments = commentsSelectMap.filter((quip) => quip.blog.id === id).map((notes, i) => <ul key={i}><li>{notes.comment}</li></ul>)
      //console.log(comments, 'is blog with comments that match blog id in blog component and is map')

      const comments = commentBlog.map((notes, i) => <ul key={i}><li>{notes.comment}</li></ul>)
      console.log(comments, 'is comments in display blog notes to notes without display blog user')

      if (displayBlog.user) {
        return (
          <div>
            <h1>{displayBlog.title}</h1>
            <p>by {displayBlog.author}</p>
            <p>{displayBlog.url}</p>
            <p>{displayBlog.likes} likes <button onClick={() => increaseLikes(displayBlog.id)}>like</button></p>
            <p>added by {displayBlog.user.personName}</p>
            <p></p>
            <h3>comments</h3>
            <form onSubmit={postComment}>
              <input type="text" name="comment"/> <button type="submit">add comment</button>
            </form>
            {comments}
          </div>
        )
      }
      else {

        return (
          <div>
            <h1>{displayBlog.title}</h1>
            <p>by {displayBlog.author}</p>
            <p>{displayBlog.url}</p>
            <p>{displayBlog.likes} likes <button onClick={() => increaseLikes(displayBlog.id)}>like</button></p>
            <p>added by {displayBlog.user}</p>
            <p></p>
            <p>peep</p>
            <h3>comments</h3>
            <form onSubmit={postComment}>
              <input type="text" name="comment"/> <button type="submit">add comment</button>
            </form>
            {comments}
          </div>
        )
      }
    }
  }
  else {
    return (
      <p>loading...</p>
    )
  }

}
export default Blog