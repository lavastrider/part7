import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setNotif } from '../reducers/notifReducer'
import { addingVote } from '../reducers/blogReducer'
import { initializeComms } from '../reducers/commentReducer'

//do we want to add ability to delete?

const Blog = () => {
  const id = useParams().id
  console.log(id, 'is id in blog component')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeComms(id))
  }, [dispatch])

  const blog = useSelector(state => state.blogs)
  console.log(blog, 'is blog in Blog component')

  const commentsSelect = useSelector(state => state.comments)
  console.log(commentsSelect, 'is commentsSelect in blog component')


  if (blog && commentsSelect) {
    const displayBlog = blog.find((diary) => diary.id === id)
    console.log(displayBlog, 'is displayblog')

    const commentsSelectMap = commentsSelect.map((thought) => thought.blog ? thought : null)
    console.log(commentsSelectMap, 'is comm select map with thought if thought blog exist')

    const commSelectMapDef = []

    for (let i=0; i<commentsSelectMap.length; i++){
      if (commentsSelectMap[i]){
        commSelectMapDef.push(commentsSelectMap[i])
      }
    }

    console.log(commSelectMapDef, 'is cSM after loop')

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

    if (displayBlog) {
      const commentBlog = commSelectMapDef.filter((quip) => quip.blog.id === id)
      console.log(commentBlog, 'is blog with comments that match blog id in blog component')

      if (displayBlog.user) {
        const comments = commentBlog.map((notes, i) => <ul key={i}><li>{notes.comment}</li></ul>)
        console.log(comments, 'is comments in display blog notes to notes')
        //const comBl = displayBlog.comments
        //console.log(comBl, 'is comBl')

        return (
          <div>
            <h1>{displayBlog.title}</h1>
            <p>{displayBlog.url}</p>
            <p>{displayBlog.likes} likes <button onClick={() => increaseLikes(displayBlog.id)}>like</button></p>
            <p>added by {displayBlog.user.personName}</p>
            <p></p>
            <h3>comments</h3>
            {comments}
          </div>
        )
      }
      else {
        const comments = commentBlog.map((notes, i) => <ul key={i}><li>{notes.comment}</li></ul>)
        console.log(comments, 'is comments in display blog notes to notes')

        return (
          <div>
            <h1>{displayBlog.title}</h1>
            <p>{displayBlog.url}</p>
            <p>{displayBlog.likes} likes</p>
            <p>added by {displayBlog.user}</p>
            <p></p>
            <h3>comments</h3>
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