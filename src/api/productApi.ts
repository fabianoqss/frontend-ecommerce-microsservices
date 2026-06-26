import { apiClient } from './apiClient'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
}

export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get<Product[]>('/api/product')
  return data
}

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await apiClient.get<Product>(`/api/product/${id}`)
  return data
}

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const { data } = await apiClient.post<Product>('/api/product', product)
  return data
}

export const updateProduct = async (id: string, product: Omit<Product, 'id'>): Promise<Product> => {
  const { data } = await apiClient.put<Product>(`/api/product/${id}`, product)
  return data
}

export const deleteProduct = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/product/${id}`)
}
