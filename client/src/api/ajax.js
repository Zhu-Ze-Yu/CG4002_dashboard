import axios from 'axios'
const baseUrl = ''
// const baseUrl = 'http://localhost:4000'
export default function ajax(url, data={}, type='GET') {
  url = baseUrl + url
  if(type==='GET') { // send GET request
    // combine the string of request parameters
    // data: {username: tom, password: 123}
    // paramStr: username=tom&password=123
    let paramStr = ''
    Object.keys(data).forEach(key => {
      paramStr += key + '=' + data[key] + '&'
    })
    if(paramStr) {
      paramStr = paramStr.substring(0, paramStr.length-1)
    }
    // send GET request by using axios
    return axios.get(url + '?' + paramStr)
  } else {// send POST request
    // send POST request by using axios
    return axios.post(url, data)
  }
}
