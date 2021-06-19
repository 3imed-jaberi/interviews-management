import { request } from '../utils/request.util'

//
export async function getCandidatures() {
  try {
    // send token to save on backend 
    const response = await request({
      method: 'GET',
      url: '/candidatures'
    })
      .then(response => response.data)

    return [true, response]
  } catch (error) {
    return [false, error]
  }
}

//
export async function getCandidaturesRelatedToOfferBy(id) {
  try {
    // send token to save on backend 
    const response = await request({
      method: 'GET',
      url: `/offers/${id}/candidatures`
    })
      .then(response => response.data)

    return [true, response]
  } catch (error) {
    return [false, error]
  }
}

//
export async function createCandidature(payload) {
  try {
    // send token to save on backend 
    const response = await request({
      method: 'POST',
      url: '/candidatures',
      data: payload
    })
      .then(response => response.data)

    return [true, response]
  } catch (error) {
    return [false, error]
  }
}

//
export async function updateCandidature(id, payload) {
  try {
    // send token to save on backend 
    const response = await request({
      method: 'PUT',
      url: `/candidatures/${id}`,
      data: payload,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${payload._boundary}`
      }
    })
      .then(response => response.data)

    return [true, response]
  } catch (error) {
    return [false, error]
  }
}
