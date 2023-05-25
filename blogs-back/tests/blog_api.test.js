const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, blogsInDb, usersInDb } = require('./test_helper')


describe('when there is initially some blogs saved', async () => {

  beforeAll(async () => {
    await Blog.remove({})
    console.log('cleared')

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('all blogs are returned as json', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.lenght).toBe(blogsInDatabase.lenght)

    const returnedContents = response.body.map(blog => blog.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedContents).toContain(blog.title)
    })
  })
})

describe('adding a new blog', async () => {

  test('POST /api/blogs is successful with a valid blog', async() => {
    const blogsAtTheBeginning = await blogsInDb()

    const newBlog = { 
      title: 'Our fourth blog',
      author: 'The Bloggers',
      url: 'https://www.somethingelsealtohgetheritis.fi',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtTheBeginning.length +1)

    const titles = blogsAfterOperation.map(blog => blog.title)
    expect(titles).toContain('Our fourth blog')
  })

  test('POST /api/blogs default likes is 0 if likes is empty', async() => {
    const blogsAtTheBeginning = await blogsInDb()

    const newBlog = {
      title: 'Their fift blog',
      author: 'The Bloggers Family',
      url: 'https://www.somethingfamilysays.fi'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtTheBeginning.length +1)
    
    const newBlogFromDb = blogsAfterOperation.find(blog => blog.title === 'Their fift blog')
    const likes = newBlogFromDb.likes
    expect(likes).toBe(0)
  })

  test('POST /api/blogs fails with proper statuscode if title or url is missing', async () => {
    const blogsAtTheBeginning = await blogsInDb()

    const newBlogNoTitleNoUrl = {
      author: 'The Bloggers Family',
      likes:0
    }

    await api
      .post('/api/blogs')
      .send(newBlogNoTitleNoUrl)
      .expect(400)

    const newBlogNoTitle = {
      author: 'The Bloggers Family',
      url: 'https://www.somethingfamilysays.fi',
      likes:0
    }

    await api
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .expect(400)

    const newBlogNoUrl = {
      title: 'Their fift blog',
      author: 'The Bloggers Family',
      likes:0
    }

    await api
      .post('/api/blogs')
      .send(newBlogNoUrl)
      .expect(400)

    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtTheBeginning.length)

  })
})


describe.only('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'blogDude',
      name: 'Bob Blogger',
      password: 'blogPass',
      adult: true
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u=>u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
    const usersBeforeOperation = await usersInDb()
  
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
      adult: false
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    expect(result.body).toEqual({ error: 'username must be unique'})  
    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users fails with proper statuscode and message if password is less than 3 chars long', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUserShortPass = {
      username: 'shorty',
      name: 'Super Short',
      password: 'sa',
      adult: false
    }

    const result = await api
      .post('/api/users')
      .send(newUserShortPass)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'password must be at least 3 characters long'}) 
    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

})


afterAll(() => {
  server.close()
})