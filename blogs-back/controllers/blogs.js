const blogsRouter = require('express').Router()
const { Blog }  = require('../mongo')
const { User } = require('../mongo')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(Blog.format))

})

// saving a new blog
blogsRouter.post('/', async (request, response) => {

  const body = request.body
  try {

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'title or url missing' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
      comments: []
    })

    if (blog.likes === undefined) {
      blog.likes = 0
    }

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(blog))

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === decodedToken.id) {

      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'not authorized to delete blog' })
    }
  }
  catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})



blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
    comments: body.comments
  }
  const updatedBlog = await Blog.findByIdAndUpdate({ _id: request.params.id }, blog, { new: true }).populate('user', { username: 1, name: 1 })

  if (!updatedBlog) {
    return response.status(400).send({ error: 'malformatted id' })
  } else {
    response.json(Blog.format(updatedBlog))
  }
})

// blogsRouter.post('/:id/comments', async (request, response) => {
//   const body = request.body
//   const comment = request.body.comment
//   const comments = request.body.comments.concat(comment)
//   try {

//   }


//   const blog = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//     user: body.user,
//     comments: user.blogs = user.blogs.concat(savedBlog._id)
//   }
//   const updatedBlog = await Blog.findByIdAndUpdate({ _id: request.params.id }, blog, { new: true }).populate('user', { username: 1, name: 1 })
//   if (!updatedBlog) {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else {
//     response.json(Blog.format(updatedBlog))
//   }
// })

module.exports = blogsRouter