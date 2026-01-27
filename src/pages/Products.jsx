import { useState, useEffect, useCallback } from "react"
import { getAdminProducts, deleteAdminProduct } from "@/services/adminProduct"
import ProductModal from "@/components/ProductModal"
import { Button } from "@/components/ui/Button"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination"

function Products() {
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const getProducts = useCallback(async (page = 1) => {
    try {
      const result = await getAdminProducts(page)

      if (result.success) {
        setProducts(result.data)
        setPagination(result.pagination)
      }
    } catch (error) {
      console.error("讀取商品失敗", error)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      getProducts()
    })()
  }, [])

  const handleCreate = () => {
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  const handleEdit = product => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = async productId => {
    if (!window.confirm("確定要刪除此商品?")) return
    try {
      await deleteAdminProduct(productId)
      alert("刪除成功！")
      await getProducts()
    } catch (error) {
      console.error("刪除失敗", error)
    }
  }

  return (
    <div className='container mx-auto py-10'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Products</h1>
        <Button onClick={handleCreate}>Create Product</Button>
      </div>
<div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Enabled</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.is_enabled ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          {pagination.has_pre && (
            <PaginationItem>
              <PaginationPrevious
                href='#'
                onClick={e => {
                  e.preventDefault()
                  getProducts(pagination.current_page - 1)
                }}
              />
            </PaginationItem>
          )}
          {[...Array(pagination.total_pages || 0)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href='#'
                onClick={() => getProducts(i + 1)}
                isActive={pagination.current_page === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {pagination.has_next && (
            <PaginationItem>
              <PaginationNext
                href='#'
                onClick={() => getProducts(pagination.current_page + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      <ProductModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        product={selectedProduct}
        getProducts={getProducts}
      />
    </div>
  )
}

export default Products
