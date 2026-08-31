import { TaskItem } from './TaskItem'


export function TaskList({
  tasks,
  onComplete,
  onDelete,
}) {
  if (tasks.length === 0) {
    return (
      <p data-cy="empty-state">
        Nenhuma tarefa cadastrada.
      </p>
    )
  }

  return (
    <ul
      className="task-list"
      data-cy="task-list"
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}