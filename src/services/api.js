import axios from "axios"
import Cookies from "js-cookie"

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000, // 建議加上超時設定，避免請求掛在那邊太久
})

// Request 攔截器：發送請求前執行
api.interceptors.request.use(
  config => {
    const token = Cookies.get("hexToken")
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => Promise.reject(error),
)

api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    //錯誤處理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token 失效或未授權
          alert("登入逾時或權限不足，請重新登入")
          Cookies.remove("hexToken")
          window.location.href = "#/login"
          break
        case 404:
          console.error("找不到資源")
          break
        case 500:
          console.error("伺服器內部錯誤")
          break
        default:
          console.error("發生錯誤：", error.response.data.message)
      }
    } else if (error.request) {
      console.error("網路連線問題，請檢查網路狀態")
    }

    return Promise.reject(error)
  },
)

export default api
