const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <h2>{course.name}</h2>
      <ul>
        {course.parts.map(part => (
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        ))}
      </ul>
      <strong>total of {totalExercises} exercises</strong>
    </div>
  )
}

export default Course