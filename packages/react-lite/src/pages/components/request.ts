export default async (url = '', data = {}, type = 'get') => {
  const baseUrl = 'http://localhost:8080'
  type = type.toUpperCase()
  url = baseUrl + url

  if (type === 'GET') {
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += `${key}=${data[key]}&`
    })

    if (dataStr !== '') {
      dataStr = dataStr.substring(0, -1)
      url = url + '?' + dataStr
    }
  }

  let requestConfig = {
    credentials: 'same-origin',
    method: type,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    mode: "cors", // 用来决定是否允许跨域请求  值有 三个 same-origin，no-cors（默认）以及 cores;
    cache: "force-cache" // 是否缓存请求资源 可选值有 default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
  }


  if (type === 'POST') {
    Object.defineProperty(requestConfig, 'body', {
      value: JSON.stringify(data)
    })
  }

  try {
    const response = await fetch(url, requestConfig)
    const responseJson = await response.json()
    return responseJson
  } catch (error) {
    throw new Error(error)
  }
}