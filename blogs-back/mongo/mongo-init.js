db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'blog_db'
    },
  ],
})

db.createCollection('blogs')
db.createCollection('users')

db.users.insert({ username: 'citrus', name: 'Ms Citrus', password: 'cit-pass', adult: true })
