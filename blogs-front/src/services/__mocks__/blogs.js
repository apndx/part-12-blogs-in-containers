let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const blogs = [
  {
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
  },
  {
    id: '5c4ac680bb1e925e7323cb2d',
    title: 'Old blog',
    author: 'Oldie',
    url: 'http://old.fi',
    likes: 3,
    user: {
      _id: '5c35fe3e2d79c76979a6acbb',
      username: 'bloggeri',
      name: 'Bloggeri'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }
