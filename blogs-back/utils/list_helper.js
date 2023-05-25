const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {

  const likes = blogs.map(blog => blog.likes)

  const reducer = (sum, item) => {
    return sum + item
  }
  return likes.reduce(reducer, 0)
}

const favourite = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  console.log(likes)
  const likeIndex = blogs.indexOf(Math.max.apply(null, likes))

  return blogs[likeIndex]
}

module.exports = {
  dummy, totalLikes, favourite
}
