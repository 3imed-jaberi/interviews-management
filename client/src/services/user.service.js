import { request } from '../utils/request.util'

//
export async function login(payload) {
  try {
    // send token to save on backend 
    const response = await request({
      method: 'POST',
      url: '/login',
      data: payload
    })
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
    })
      .then(response => response.data)

    return [true, response]
  } catch (error) {
    return [false, error]
  }
}