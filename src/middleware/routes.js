import { buildRoutePath } from "../utils/build-route-path.js"
import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { search } = request.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search,
      } : null)

      return response.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { title, description } = request.body

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      database.insert('tasks', task)

      return response.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      const { id } = request.params
      const { title, description } = request.body

      const ok = database.update('tasks', id, {
        title,
        description,
        updated_at: new Date(),
      })

      if (ok) {
        return response.writeHead(204).end()
      }

      return response.writeHead(404).end('Task não encontrada')
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (request, response) => {
      const { id } = request.params

      const ok = database.update('tasks', id, {
        completed_at: true,
        updated_at: new Date(),
      })

      if (ok) {
        return response.writeHead(204).end()
      }

      return response.writeHead(404).end('Task não encontrada')
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      const { id } = request.params

      const ok = database.delete('tasks', id)

      if (ok) {
        return response.writeHead(204).end()
      }

      return response.writeHead(404).end('Task não encontrada')
    }
  },
]