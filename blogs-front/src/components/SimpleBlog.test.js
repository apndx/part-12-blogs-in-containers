import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'


test('renders title, author, likes', () => {
  const simpleBlog = {
    title: 'Blogi yksinkertaisuudesta',
    author: 'Simplisti',
    likes: 3
  }

  const component = render(
    <SimpleBlog blog ={simpleBlog} />
  )

  expect(component.container).toHaveTextContent(
    'Blogi yksinkertaisuudesta'
  )

  expect(component.container).toHaveTextContent(
    'Simplisti'
  )

  expect(component.container).toHaveTextContent(
    'has 3 likes'
  )

})

it('clicking a button once calls handler once', async () => {
  const blogAboutLikes = {
    title: 'Blogi tykkäämisen taidosta',
    author: 'Liker',
    likes: 99
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog = {blogAboutLikes} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)

})


