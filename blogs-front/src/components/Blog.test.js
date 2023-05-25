import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent  } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const mockHandler = jest.fn()

  const blog = {
    id: '5c4ac620bb1e925e7323cb2c',
    title: 'The testest Blog',
    author: 'Testest Blogger',
    url: 'http://testests.com',
    likes: 0,
    user: {
      _id: '5c35fe3e2d79c76979a6acbb',
      username: 'bloggeri',
      name: 'Bloggeri'
    }
  }

  beforeEach(() => {
    component = render(
      <Blog blog ={blog}
        onLike = {mockHandler}
        onDelete = {mockHandler}>
        <div className="testDiv" />
      </Blog>
    )
  })

  it('renders', () => {
    component.container.querySelector('.testDiv')
    //component.debug()
  })
  it('at start it renders only title and author', () => {
    const div = component.container.querySelector('.togglables')
    expect(div).toHaveStyle('display: none')
  })

  it('clicking the button brings additional details into view', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglables')
    expect(div).not.toHaveStyle('display: none')
  })

})
