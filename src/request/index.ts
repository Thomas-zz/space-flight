import axios from 'axios'
import qs from 'qs'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  // baseURL: `https://qcmkmk.api.cloudendpoint.cn`,
  transformRequest: [
    (data) => {
      data = qs.stringify(data)
      return data
    },
  ],
})

export default request
