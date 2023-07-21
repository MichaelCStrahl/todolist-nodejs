export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (request, response) => {
      return response.end('Listagem de usuários')
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (request, response) => {
      return response.end('Criação de usuários')
    }
  }
]