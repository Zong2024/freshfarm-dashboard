import { useState, useEffect } from "react"
import api from "@/services/api"
import { postAdminProduct, putAdminProduct } from "../services/adminProduct"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { Checkbox } from "@/components/ui/Checkbox"

const defaultData = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: 0,
  price: 0,
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [],
  origin: "",
  farm: "",
  weight: "",
  origin_info: "",
  storage_method: "",
  shelf_life: "",
  eating_tips: "",
}

function ProductModal({ isOpen, setIsOpen, product, getProducts }) {
  const [formData, setFormData] = useState(defaultData)
  useEffect(() => {
    console.log(formData)
    console.log(product)
  }, [formData, product])

  useEffect(() => {
    if (product) {
      setFormData({
        ...defaultData,
        ...product,
        origin_price: Number(product.origin_price) || 0,
        price: Number(product.price) || 0,
        is_enabled: product.is_enabled ? 1 : 0,
        imagesUrl: product.imagesUrl || [],
      })
    } else {
      setFormData(defaultData)
    }
  }, [product])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
            ? 1
            : 0
          : type === "number"
            ? Number(value)
            : value,
    }))
  }

  const handleImageChange = (index, value) => {
    const newImagesUrl = [...formData.imagesUrl]
    newImagesUrl[index] = value
    setFormData(prevData => ({
      ...prevData,
      imagesUrl: newImagesUrl,
    }))
  }

  const addImageInput = () => {
    setFormData(prevData => ({
      ...prevData,
      imagesUrl: [...prevData.imagesUrl, ""],
    }))
  }

  const removeImageInput = index => {
    const newImagesUrl = formData.imagesUrl.filter((_, i) => i !== index)
    setFormData(prevData => ({
      ...prevData,
      imagesUrl: newImagesUrl,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (product) {
        await putAdminProduct(product.id, formData)
      } else {
        await postAdminProduct(formData)
      }
      setIsOpen(false)
      getProducts()
    } catch (error) {
      console.error("Failed to save product:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Create Product"}
          </DialogTitle>
          <DialogDescription>
            {product ? "編輯產品詳情" : "輸入新產品資料"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                name='title'
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='category'>Category</Label>
              <Input
                id='category'
                name='category'
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='unit'>Unit</Label>
              <Input
                id='unit'
                name='unit'
                value={formData.unit}
                onChange={handleChange}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='origin_price'>Origin Price</Label>
              <Input
                id='origin_price'
                name='origin_price'
                type='number'
                value={Number(formData.origin_price)}
                onChange={handleChange}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='price'>Price</Label>
              <Input
                id='price'
                name='price'
                type='number'
                value={Number(formData.price)}
                onChange={handleChange}
                required
              />
            </div>
            <div className='grid gap-2 col-span-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className='grid gap-2 col-span-2'>
              <Label htmlFor='imageUrl'>Main Image URL</Label>
              <Input
                id='imageUrl'
                name='imageUrl'
                value={formData.imageUrl}
                onChange={handleChange}
              />
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt='Main Product Image'
                  className='w-24 h-24 object-cover mt-2'
                />
              )}
            </div>
            <div className='grid gap-2 col-span-2'>
              <Label>Additional Image URLs</Label>
              {formData.imagesUrl.map((image, index) => (
                <div key={index} className='flex items-center space-x-2'>
                  <Input
                    value={image}
                    onChange={e => handleImageChange(index, e.target.value)}
                  />
                  <Button
                    type='button'
                    variant=''
                    size='sm'
                    onClick={() => removeImageInput(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type='button'
                variant=''
                size='sm'
                onClick={addImageInput}
              >
                Add Image URL
              </Button>
            </div>
            {/* 規格區 */}
            <div className='col-span-2 text-lg font-semibold mt-4 mb-2'>
              Specifications
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='origin'>Origin</Label>
              <Input
                id='origin'
                name='origin'
                value={formData.origin}
                onChange={handleChange}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='farm'>Farm</Label>
              <Input
                id='farm'
                name='farm'
                value={formData.farm}
                onChange={handleChange}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='weight'>Weight</Label>
              <Input
                id='weight'
                name='weight'
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='origin_info'>Origin Info</Label>
              <Input
                id='origin_info'
                name='origin_info'
                value={formData.origin_info}
                onChange={handleChange}
              />
            </div>
            {/* 保存與食用區 */}
            <div className='col-span-2 text-lg font-semibold mt-4 mb-2'>
              Storage & Eating Tips
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='storage_method'>Storage Method</Label>
              <Input
                id='storage_method'
                name='storage_method'
                value={formData.storage_method}
                onChange={handleChange}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='shelf_life'>Shelf Life</Label>
              <Input
                id='shelf_life'
                name='shelf_life'
                value={formData.shelf_life}
                onChange={handleChange}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='eating_tips'>Eating Tips</Label>
              <Input
                id='eating_tips'
                name='eating_tips'
                value={formData.eating_tips}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='flex items-center space-x-2 col-span-2'>
            <Checkbox
              id='is_enabled'
              name='is_enabled'
              checked={!!formData.is_enabled}
              onCheckedChange={checked =>
                handleChange({
                  target: { name: "is_enabled", type: "checkbox", checked },
                })
              }
            />
            <Label htmlFor='is_enabled'>Enabled</Label>
          </div>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal
