import React from 'react'
import Togglable from './Togglable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, onLike, onDelete }) => (

  <div style = {blogStyle}>
    <div className="details">
      {blog.title} -- {blog.author}
      <div className="additionals">
        <Togglable buttonLabel="show">
          <p>{blog.url} -- likes: {blog.likes}
            <button onClick={onLike}>like</button>
            <button onClick={onDelete}>delete</button></p>
          <p> added by {blog.user.name}</p>
        </Togglable>
      </div>
    </div>
  </div>
)

export default Blog
