//if (process.env.NODE_ENV !== 'production') {
//  require('dotenv').config()
//}

require('dotenv').config()
let port = process.env.PORT
let mongoUrl = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT
  mongoUrl = process.env.TEST_MONGODB_URI
}

module.exports = {
  mongoUrl,//: 'mongodb://the_username:the_password@localhost:3456/blog_db',
  port
}
