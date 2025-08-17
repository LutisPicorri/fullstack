import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Unicafe = () => {
  const dispatch = useDispatch()
  const feedback = useSelector(state => ({
    good: state.good,
    ok: state.ok,
    bad: state.bad
  }))

  const handleGood = () => {
    dispatch({ type: 'GOOD' })
  }

  const handleOk = () => {
    dispatch({ type: 'OK' })
  }

  const handleBad = () => {
    dispatch({ type: 'BAD' })
  }

  const handleZero = () => {
    dispatch({ type: 'ZERO' })
  }

  const total = feedback.good + feedback.ok + feedback.bad
  const average = total === 0 ? 0 : (feedback.good - feedback.bad) / total
  const positive = total === 0 ? 0 : (feedback.good / total) * 100

  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={handleGood}>good</button>
      <button onClick={handleOk}>ok</button>
      <button onClick={handleBad}>bad</button>
      <button onClick={handleZero}>reset stats</button>
      
      <h2>Statistics</h2>
      <div>good {feedback.good}</div>
      <div>ok {feedback.ok}</div>
      <div>bad {feedback.bad}</div>
      <div>all {total}</div>
      <div>average {average.toFixed(2)}</div>
      <div>positive {positive.toFixed(1)} %</div>
    </div>
  )
}

export default Unicafe
