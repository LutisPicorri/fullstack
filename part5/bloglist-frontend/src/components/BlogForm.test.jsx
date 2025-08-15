import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  const mockCreateBlog = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls createBlog with the right details when a new blog is created', async () => {
    const user = userEvent.setup()
    
    render(<BlogForm createBlog={mockCreateBlog} />)

    const inputs = screen.getAllByRole('textbox')
    const titleInput = inputs[0]
    const authorInput = inputs[1]
    const urlInput = inputs[2]
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'Test Blog Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'http://test.com')
    await user.click(createButton)

    expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    expect(mockCreateBlog).toHaveBeenCalledWith({
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://test.com'
    })
  })

  it('clears the form after creating a blog', async () => {
    const user = userEvent.setup()
    
    render(<BlogForm createBlog={mockCreateBlog} />)

    const inputs = screen.getAllByRole('textbox')
    const titleInput = inputs[0]
    const authorInput = inputs[1]
    const urlInput = inputs[2]
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'Test Blog Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'http://test.com')
    await user.click(createButton)

    expect(titleInput).toHaveValue('')
    expect(authorInput).toHaveValue('')
    expect(urlInput).toHaveValue('')
  })
})
