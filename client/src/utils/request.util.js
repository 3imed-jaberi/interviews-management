import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000/api'

const client = axios.create({ baseURL: API_BASE_URL })

function request(options, isAuth = true) {
  function onSuccess(response) {
    return response
  }

  function onError(error) {
    console.log('Request Failed !')
    console.log('Axios Config: ', error.config)
    console.log('Error:', error.response ? error.response : error.message)

    return Promise.reject(error.response || error.message)
  }

  const token = localStorage.getItem('x-token')
  const _headers = isAuth
    ? { "Authorization": `Bearer ${token}` }
    : Object.create(null)

  return client({
    ...options,
    headers: {
      ...options.headers,
      ..._headers
    }
  })
    .then(onSuccess)
    .catch(onError)
}

export { request }
