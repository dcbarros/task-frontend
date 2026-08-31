import { useState } from 'react'


export function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('')


  async function handleSubmit(event) {
    event.preventDefault()

    const normalizedTitle = title.trim()

    if (!normalizedTitle) {
      return
    }

    await onCreate(normalizedTitle)

    setTitle('')
  }


  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
      data-cy="task-form"
    >
      <label htmlFor="task-title">
        Nova tarefa
      </label>

      <div className="task-form-row">
        <input
          id="task-title"
          type="text"
          placeholder="Ex.: Estudar Jenkins"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          data-cy="task-title-input"
        />

        <button
          type="submit"
          disabled={!title.trim()}
          data-cy="create-task-button"
        >
          Adicionar
        </button>
      </div>
    </form>
  )
}