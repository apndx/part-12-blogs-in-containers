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

// init with user, some data is needed, this does not work without hash
db.users.insert({ username: 'citrus', name: 'Ms Citrus', password: 'cit-pass', adult: true })
