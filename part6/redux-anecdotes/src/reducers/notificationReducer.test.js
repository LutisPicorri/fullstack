import { describe, it, expect, vi } from 'vitest'
import notificationReducer, { setNotification, clearNotification, setNotificationWithTimeout } from './notificationReducer'

describe('notification reducer', () => {
  it('should return initial state', () => {
    const state = notificationReducer(undefined, { type: 'INIT' })
    expect(state).toBe('Welcome to anecdotes app!')
  })

  it('should handle setNotification action', () => {
    const initialState = ''
    const action = setNotification('Test notification')
    const newState = notificationReducer(initialState, action)
    
    expect(newState).toBe('Test notification')
  })

  it('should handle clearNotification action', () => {
    const initialState = 'Current notification'
    const action = clearNotification()
    const newState = notificationReducer(initialState, action)
    
    expect(newState).toBe('')
  })

  it('should not modify state for unknown action', () => {
    const initialState = 'Current notification'
    const action = { type: 'UNKNOWN' }
    const newState = notificationReducer(initialState, action)
    
    expect(newState).toEqual(initialState)
  })

  it('should handle setNotificationWithTimeout action creator', async () => {
    const mockDispatch = vi.fn()
    const actionCreator = setNotificationWithTimeout('Test message', 2)
    
    await actionCreator(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(setNotification('Test message'))
  })
})
