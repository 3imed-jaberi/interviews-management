import { request } from '../utils/request.util'

//
export async function login(payload) {
  try {
    // send token to save on backend 
    const response = await request({
      method: 'POST',
      url: '/login',
      data: payload
    }, false)
      .then(response => response.data)

    return [true, response]
  } catch (error) {
    return [false, error]
  }
}

//
export async function register(payload) {
  try {
    // send token to save on backend 
    const response = await request({
      method: 'POST',
      url: '/users',
      data: payload
    }, false)
      .then(response => response.data)

    return [true, response]
  } catch (error) {
    return [false, error]
  }
}

//
export async function getUserById(id) {
  try {
    // send token to save on backend 
    const response = await request({
      method: 'GET',
      url: `/users/${id}`
    }, true)
      .then(response => response.data)

    return [true, response]
  } catch (error) {
    return [false, error]
  }
}

export async function getUsers() {
  try {
    // send token to save on backend 
    const response = await request({
      method: 'GET',
      url: `/users`
    })
      .then(response => response.data)

    return [true, response]
  } catch (error) {
    return [false, error]
  }
}