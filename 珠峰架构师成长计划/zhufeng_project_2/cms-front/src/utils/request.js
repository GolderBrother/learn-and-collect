import fetch from 'dva/fetch';
const BASE_URL = 'http://47.105.172.221:7001';
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function checkCode(result) {//{code:0,data,error}
  if (result.code == 0) {
    return result.data;
  }

  const error = new Error(result.error);
  throw error;
}

export default function request(url, options={}) {
  options.credentials = 'include';
  let token = localStorage.getItem('token');
  options.headers = options.headers||{};
  options.headers= {
    ...options.headers,
    Authorization:`Bearer ${token}`
  }
  return fetch(BASE_URL+url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkCode)
    .catch(err => ({ err }));
}
