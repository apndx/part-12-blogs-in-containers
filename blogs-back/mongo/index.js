const mongoose = require('mongoose')
const Blog = require('./models/Blog')
const User = require('./models/User')

const { MONGO_URL } = require('../utils/config')

if (MONGO_URL && !mongoose.connection.readyState) mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })


module.exports = {
  Blog, User
}
