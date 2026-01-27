import api from "./api"
const path = import.meta.env.VITE_APP_API_PATH

export const getAdminProducts = async (page = 1) => {
  try {
    const response = await api.get(`api/${path}/admin/products?page=${page}`)
    const { products, pagination } = response.data
    return {
      success: true,
      data: products,
      pagination: pagination,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      pagination: {},
      error: error.response?.data?.message || "取得產品失敗",
    }
  }
}

export const deleteAdminProduct = async id => {
  try {
    const response = await api.delete(`api/${path}/admin/product/${id}`)
    const { product } = response.data
    return {
      success: true,
      data: product,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      pagination: {},
      error: error.response?.data?.message || "刪除產品失敗",
    }
  }
}

export const postAdminProduct = async data => {
  try {
    const response = await api.post(`api/${path}/admin/product`, { data })
    const { product } = response.data
    return {
      success: true,
      data: product,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      pagination: {},
      error: error.response?.data?.message || "新增產品失敗",
    }
  }
}

export const putAdminProduct = async (id, data) => {
  try {
    const response = await api.put(`api/${path}/admin/product/${id}`, { data })
    const { product } = response.data
    return {
      success: true,
      data: product,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      pagination: {},
      error: error.response?.data?.message || "編輯產品失敗",
    }
  }
}
