import axios from 'axios'
import { RequestInterceptor } from './RequestInterceptor'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT,
  timeout: 5000
})

// await RequestInterceptor.setRequestInterceptor(instance)
// await RequestInterceptor.setResponseInterceptor(instance)

const postRequest = async (url, data = {}) => {
  return await instance.post(url, data)
}

const getRequest = async (url, params = {}) => {
  return await instance.get(url, { params })
}

const putRequest = async (url, data = {}) => {
    return await instance.put(url, data)
  }

const patchRequest = async (url, data = {}) => {
  return await instance.patch(url, data)
}

const deleteRequest = async (url, params = {}) => {
  return await instance.delete(url, { params })
}

export const Requestor = {
  postRequest,
  getRequest,
  putRequest,
  patchRequest,
  deleteRequest
}