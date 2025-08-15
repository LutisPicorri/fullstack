import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Blog from './Blog'

describe('Blog', () => {
  const mockBlog = {
    id: '1',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const mockUpdateBlog = vi.fn()
  const mockRemoveBlog = vi.fn()
  const mockUser = {
    username: 'testuser',
    name: 'Test User'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders blog title and author by default', () => {
    render(
      <Blog 
        blog={mockBlog} 
        updateBlog={mockUpdateBlog} 
        user={mockUser} 
        removeBlog={mockRemoveBlog} 
      />
    )

    // Use getAllByText since the title appears in both summary and expanded views
    const titleElements = screen.getAllByText('Test Blog by Test Author')
    expect(titleElements).toHaveLength(2)
  })

  it('does not render URL or likes by default', () => {
    render(
      <Blog 
        blog={mockBlog} 
        updateBlog={mockUpdateBlog} 
        user={mockUser} 
        removeBlog={mockRemoveBlog} 
      />
    )

    // The URL and likes are in the DOM but hidden with CSS display: none
    // We should check that the expanded section is hidden
    const expandedSection = screen.getByText('likes 5').closest('.blog-expanded')
    expect(expandedSection).toHaveStyle({ display: 'none' })
  })

  it('shows URL and likes when view button is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <Blog 
        blog={mockBlog} 
        updateBlog={mockUpdateBlog} 
        user={mockUser} 
        removeBlog={mockRemoveBlog} 
      />
    )

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(screen.getByText('http://test.com')).toBeInTheDocument()
    expect(screen.getByText('likes 5')).toBeInTheDocument()
    
    // Check that the expanded section is now visible (display: block)
    const expandedSection = screen.getByText('likes 5').closest('.blog-expanded')
    expect(expandedSection).toHaveStyle({ display: 'block' })
  })

  it('calls updateBlog twice when like button is clicked twice', async () => {
    const user = userEvent.setup()
    
    render(
      <Blog 
        blog={mockBlog} 
        updateBlog={mockUpdateBlog} 
        user={mockUser} 
        removeBlog={mockRemoveBlog} 
      />
    )

    // First click view button to show details
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    // Then click like button twice
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
    // Both calls should have likes: 6 because the component always uses blog.likes + 1
    // from the original blog object, not the updated one
    expect(mockUpdateBlog).toHaveBeenNthCalledWith(1, '1', {
      ...mockBlog,
      likes: 6
    })
    expect(mockUpdateBlog).toHaveBeenNthCalledWith(2, '1', {
      ...mockBlog,
      likes: 6
    })
  })
})
