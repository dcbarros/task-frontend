import {
  useEffect,
  useState,
} from 'react'

import './App.css'

import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'

import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
} from './services/taskApi'


function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true)

        const data = await getTasks()

        setTasks(data)
        setError('')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])


  async function handleCreate(title) {
    try {
      const newTask = await createTask(title)

      setTasks((currentTasks) => [
        ...currentTasks,
        newTask,
      ])

      setError('')
    } catch (err) {
      setError(err.message)
    }
  }


  async function handleComplete(taskId) {
    try {
      const updatedTask =
        await completeTask(taskId)

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId
            ? updatedTask
            : task
        )
      )

      setError('')
    } catch (err) {
      setError(err.message)
    }
  }


  async function handleDelete(taskId) {
    try {
      await deleteTask(taskId)

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== taskId
        )
      )

      setError('')
    } catch (err) {
      setError(err.message)
    }
  }


  return (
    <main className="app-container">
      <header>
        <p className="eyebrow">
          Projeto piloto CI/CD
        </p>

        <h1 data-cy="page-title">
          Task Pilot
        </h1>

        <p>
          FastAPI + React + pytest +
          Cypress + Jenkins
        </p>
      </header>

      <TaskForm
        onCreate={handleCreate}
      />

      {error && (
        <p
          className="error-message"
          role="alert"
          data-cy="error-message"
        >
          {error}
        </p>
      )}

      {loading ? (
        <p data-cy="loading">
          Carregando tarefas...
        </p>
      ) : (
        <TaskList
          tasks={tasks}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      )}
    </main>
  )
}


export default App