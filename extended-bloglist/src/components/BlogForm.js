import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    try {
      //console.log('well we at least fired this function')
      createBlog({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      })

      //so the blog's info is there. it exists. then why does it require a refresh?

      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    } catch (exception) {
      console.log(exception, 'is exception')
    }
  }

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }


  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            value={blogTitle}
            name="title"
            onChange={handleTitleChange}
            placeholder='The title of the blog'
          />
        </div>
        <div>
          author:
          <input
            id="author"
            value={blogAuthor}
            name="author"
            onChange={handleAuthorChange}
            placeholder='The author of the blog'
          />
        </div>
        <div>
          url:
          <input
            id="url"
            value={blogUrl}
            name="url"
            onChange={handleUrlChange}
            placeholder='The URL of the blogpost'
          />
        </div>
        <button id="createBlog" onClick={addBlog}>create</button>
      </form>
    </div>
  )
}

export default BlogForm