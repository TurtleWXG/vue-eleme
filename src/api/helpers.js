import axios from 'axios'

const urlMap = {
  development: '/',
  production: '',
}

const baseUrl = urlMap[process.env.NODE_ENV]

const appCode_OK = 1

export function get(url) {
  return async function(params) {
    try {
      const {
        data: { appCode, data },
      } = await axios.get(baseUrl + url, {
        params,
      })
      if (appCode === appCode_OK) {
        return data
      }
    } catch (error) {
      //
    }
  }
}
