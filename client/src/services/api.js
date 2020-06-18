import axios from 'axios' // lo mismo que fetch

const api = axios.create({
  baseURL: 'http://localhost:8000/',
})

export default api

//api.get()
//api.post()
//api.delete()
