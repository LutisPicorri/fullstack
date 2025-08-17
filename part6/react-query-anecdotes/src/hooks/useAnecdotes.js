import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import anecdoteService from '../services/anecdotes'
import { NotificationContext } from '../contexts/NotificationContext'

export const useAnecdotes = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    retry: false,
    refetchOnWindowFocus: false
  })
}

export const useCreateAnecdote = () => {
  const queryClient = useQueryClient()
  const [, notificationDispatch] = useContext(NotificationContext)
  
  return useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      
      // Show success notification
      notificationDispatch({ 
        type: 'SET_NOTIFICATION', 
        payload: `a new anecdote '${newAnecdote.content}' created!` 
      })
      
      // Clear notification after 5 seconds
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
    onError: (error) => {
      // Show error notification
      notificationDispatch({ 
        type: 'SET_NOTIFICATION', 
        payload: `too short anecdote, must have length 5 or more` 
      })
      
      // Clear notification after 5 seconds
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  })
}

export const useVoteAnecdote = () => {
  const queryClient = useQueryClient()
  const [, notificationDispatch] = useContext(NotificationContext)
  
  return useMutation({
    mutationFn: ({ id, anecdote }) => anecdoteService.update(id, anecdote),
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], 
        anecdotes.map(anecdote => 
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      )
      
      // Show success notification
      notificationDispatch({ 
        type: 'SET_NOTIFICATION', 
        payload: `anecdote '${updatedAnecdote.content}' voted` 
      })
      
      // Clear notification after 5 seconds
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  })
}
