import http from "node:http"
// import { json } from "./middleware/json"

const server = http.createServer(async (request, response) => {
  // const { method, url } = request

  // await json(request, response)

  // return response.writeHead(404).end()

  return response.end('hello World')
})

server.listen(3333)