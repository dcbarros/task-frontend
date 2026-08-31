export function TaskItem({
  task,
  onComplete,
  onDelete,
}) {
  return (
    <li
      className={
        task.completed
          ? 'task-item task-completed'
          : 'task-item'
      }
      data-cy={`task-${task.id}`}
    >
      <div>
        <strong data-cy="task-title">
          {task.title}
        </strong>

        <span
          className="task-status"
          data-cy="task-status"
        >
          {task.completed
            ? 'Concluída'
            : 'Pendente'}
        </span>
      </div>

      <div className="task-actions">
        <button
          type="button"
          onClick={() => onComplete(task.id)}
          disabled={task.completed}
          data-cy="complete-task-button"
        >
          Concluir
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          data-cy="delete-task-button"
        >
          Excluir
        </button>
      </div>
    </li>
  )
}