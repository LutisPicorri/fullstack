import { describe, it, expect } from 'vitest'
import filterReducer, { setFilter } from './filterReducer'

describe('filter reducer', () => {
  it('should return empty string as initial state', () => {
    const state = filterReducer(undefined, { type: 'INIT' })
    expect(state).toBe('')
  })

  it('should handle setFilter action', () => {
    const initialState = ''
    const action = setFilter('test filter')
    const newState = filterReducer(initialState, action)
    
    expect(newState).toBe('test filter')
  })

  it('should handle empty filter', () => {
    const initialState = 'previous filter'
    const action = setFilter('')
    const newState = filterReducer(initialState, action)
    
    expect(newState).toBe('')
  })

  it('should not modify state for unknown action', () => {
    const initialState = 'current filter'
    const action = { type: 'UNKNOWN' }
    const newState = filterReducer(initialState, action)
    
    expect(newState).toEqual(initialState)
  })
})
