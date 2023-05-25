
// //oldies
// import React from 'react'
// import { mount } from 'enzyme'
// import App from './App'
// import Blog from './components/Blog'
// jest.mock('./services/blogs')
// import blogService from './services/blogs'
// import { prettyDOM } from 'dom-testing-library'

// describe('<App />', () => {
//   let app
//   beforeAll(() => {
//     app = mount(<App />)
//   })

//   it('renders all blogs it gets from backend', () => {
//     app.update()
//     const blogComponents = app.find(Blog)
//     console.log('blogComponents', blogComponents.debug())
//     blogComponents.debug()
//     console.log(prettyDOM(blogComponents))
//     expect(blogComponents.length).toEqual(blogService.blogs.length)

//   })
// })



//uusi hook tapa

import React from 'react'
import { render,  waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'


describe('<App />', () => {
  it('renders empty list when not logged in', async () => {

    const component = render(
      <App />
    )
    component.rerender(<App />)
    waitForElement(
      () => component.container.querySelector('.blog')
    )

    const blogs = await component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)

  })


  it('renders all blogs it gets from backend', async () => {
    const user = {
      username: 'testihenkilo',
      token: '123456789',
      name: 'Testi Henkilo'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)
    waitForElement(
      () => component.container.querySelector('.blog')
    )
    //component.debug()

    const blogs = await component.container.querySelectorAll('.blog')

    expect(component.container).toHaveTextContent(
      'The testest Blog'
    )
  })
})