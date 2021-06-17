import { request } from '../utils/request.util'

//
export async function getOffers() {
  try {
    // send token to save on backend 
    const response = await request({
      method: 'GET',
      url: '/offers'
    })
      .then(response => response.data)

    return [true, response]
  } catch (error) {
    return [false, error]
  }
}

//
export async function getOfferBy(id) {
  try {
    // send token to save on backend 
    const response = await request({
      method: 'GET',
      url: `/offers/${id}`
    })
      .then(response => response.data)

    return [true, response]
  } catch (error) {
    return [false, error]
  }
}

//
export async function createOffer(payload) {
  try {
    // send token to save on backend 
    const response = await request({
      method: 'POST',
      url: '/offers',
      data: payload
    })
      .then(response => response.data)

    return [true, response]
  } catch (error) {
    return [false, error]
  }
}