const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  
  return blogs.reduce((favorite, blog) => 
    blog.likes > favorite.likes ? blog : favorite
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // Count blogs per author
  const authorCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  // Find author with most blogs
  const entries = Object.entries(authorCounts)
  const topAuthor = entries.reduce((top, [author, count]) => {
    return count > top.blogs ? { author, blogs: count } : top
  }, { author: entries[0][0], blogs: entries[0][1] })

  return topAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // Sum likes per author
  const authorLikes = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes
    return likes
  }, {})

  // Find author with most likes
  const entries = Object.entries(authorLikes)
  const topAuthor = entries.reduce((top, [author, likes]) => {
    return likes > top.likes ? { author, likes } : top
  }, { author: entries[0][0], likes: entries[0][1] })

  return topAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
