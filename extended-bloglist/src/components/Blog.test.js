import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('tests that are for the exercises', () => {

  test('renders blog title and author', () => {
  
    const blog = {
      title: 'Lene Marlin Discography',
      author: 'Record Label',
      url: 'lenemarlin.com/discography'
    }
  
    const { container } = render(<Blog blog={blog}/>)

    //test that checks that the component displaying a blog renders the blog title and author
    //but does not render url or likes by default

    const element = container.querySelector('.default-view')
    //console.log(element, 'is container with query selector')
    //console.log(element.textContent, 'is element text')
    expect(element).toHaveTextContent('Lene Marlin Discography by Record Label view')
    expect(element).toHaveTextContent('Record Label')
    expect(element).not.toHaveTextContent('lenemarlin.com/discography')
    
    //re-render to set to neutral
  })

  test('blog url and likes shown when button clicked', async () => {
    //test that checks that the blog's url and number of likes are shown when button
    //controlling details clicked
    //let count = 0
    
    const blog = {
      title: 'Lene Marlin Discography',
      author: 'Record Label',
      url: 'lenemarlin.com/discography'
    }
  
    const { container } = render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    //console.log(button, 'is button')
    await user.click(button)
    const element = container.querySelector('.detail-view')
    //screen.debug(element, 'is element')
      
    //console.log(count, 'is count')
    
    //console.log(element, 'is element')
    //screen.debug(element)

    expect(element).toHaveTextContent('lenemarlin.com/discography')
    expect(element).toHaveTextContent('likes')
  })


  test('if like button pressed twice like handler called twice', async () => {
    //test which ensures that if like button pressed twice, event handler that component received
    //as props is called twice

    const blog = {
      title: 'Youtube Poop',
      author: 'Internet Explained',
      url: 'wordpress.com/youtubememes/ytpoop'
    }
    
    const mockHandler = jest.fn()

    const { container } = render(<Blog blog={blog} increaseLikes={mockHandler}/>)

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    
    const element = container.querySelector('.detail-view')
    expect(element).toHaveTextContent('wordpress.com/youtubememes/ytpoop')

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    
    expect(mockHandler.mock.calls).toHaveLength(2)
    
    
  })


  test('new blog created correctly', async () => {
    //test for new blog form
    //should check that form calls event handler it received as props with right details
    //when new blog created

    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog}/>)

    const inputTitle = screen.getByPlaceholderText('The title of the blog')
    const inputAuthor = screen.getByPlaceholderText('The author of the blog')
    const inputUrl = screen.getByPlaceholderText('The URL of the blogpost')
    const sendButton = screen.getByText('create')

    await user.type(inputTitle, 'How to Blow Bubbles')
    await user.type(inputAuthor, 'Spongebob Squarepants')
    await user.type(inputUrl, 'instructables.com/howtoblowbubbles')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('How to Blow Bubbles')
    expect(createBlog.mock.calls[0][0].author).toBe('Spongebob Squarepants')
    expect(createBlog.mock.calls[0][0].url).toBe('instructables.com/howtoblowbubbles')

  })
})