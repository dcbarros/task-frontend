const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request(path, options = {}) {
    const response = await fetch(
        `${API_URL}${path}`,
        options
    )

    if (!response.ok) {
        let message = 'Erro ao comunicar com a API'

        try {
            const body = await response.json()

            if (body.detail) {
                message = body.detail
            }
        } catch {
          // Mantém a mensagem de erro padrão.
        }

        throw new Error(message)
    }

    if(response.status === 204) {
        return null
    }

    return response.json()
}

export function getTasks() {
  return request('/tasks')
}


export function createTask(title) {
  return request('/tasks', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      title,
    }),
  })
}


export function completeTask(taskId) {
  return request(
    `/tasks/${taskId}/complete`,
    {
      method: 'PATCH',
    }
  )
}


export function deleteTask(taskId) {
  return request(
    `/tasks/${taskId}`,
    {
      method: 'DELETE',
    }
  )
}

