import { RefreshIcon, UploadIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { adminRequestHandler } from '../../../lib/admin'
import request from '../../../lib/request'
import Modal from '../../Modal'
import ModalHeader from '../ModalHeader'
import ModalHeaderButton from '../ModalHeaderButton'
import Product from './Product'

const initProduct = (product, category) => {
  let currentProduct: CustomObject = {
    title: product.title,
    price: product.price,
    stock: product.stock,
  }

  if (category.subCategories.length > 0) {
    currentProduct.subCategory = category.subCategories[0].slug
  }

  return currentProduct
}

const EditProductModal = ({
  open,
  onClose,
  setCategories,
  product,
  category,
}) => {
  const [editedProduct, setEditedProduct] = useState<CustomObject>(
    initProduct(product, category)
  )

  const onFieldChange = (field, value) => {
    setEditedProduct({
      ...editedProduct,
      [field]: value,
    })
  }

  const resetHandler = () => {
    let obj: CustomObject = {
      title: product.title,
      price: product.price,
      stock: product.stock,
    }
    if (product.subCategory?.slug) {
      obj.subCategory = product.subCategory.slug
    }
    setEditedProduct(obj)
  }

  const updateCategoryProducts = (products) => {
    setCategories((categories) => {
      const index = categories.findIndex((c) => c.id == category.id)
      return [
        ...categories.slice(0, index),
        { ...category, products },
        ...categories.slice(index + 1),
      ]
    })
  }

  const saveHandler = () => {
    adminRequestHandler({
      loading: 'Saving...',
      handler: async () => {
        let body = { ...editedProduct }
        if (editedProduct.subCategory) {
          body.subCategory = {
            connect: { slug: editedProduct.subCategory },
          }
        }
        const { data } = await request.put(`/products/${product.id}`, body)
        const index = category.products.findIndex((p) => p.id == product.id)
        updateCategoryProducts([
          ...category.products.slice(0, index),
          data.product,
          ...category.products.slice(index + 1),
        ])
        onClose()
      },
      success: 'Product saved',
    })
  }

  return (
    <Modal {...{ open, onClose }}>
      <ModalHeader
        title="Edit Product"
        logo={category.logoImg}
        rightMenu={
          <>
            <ModalHeaderButton
              onClick={resetHandler}
              variant="red"
              fill="outlined"
              Icon={RefreshIcon}
            >
              Reset
            </ModalHeaderButton>
            <ModalHeaderButton
              onClick={saveHandler}
              variant="green"
              fill="solid"
              Icon={UploadIcon}
            >
              Save
            </ModalHeaderButton>
          </>
        }
      />
      <div className="overflow-auto p-5 space-y-6">
        <Product
          category={category}
          product={editedProduct}
          onTitleChange={(e) => onFieldChange('title', e.target.value)}
          onPriceChange={(e) => onFieldChange('price', e.target.value)}
          onStockChange={(e) => onFieldChange('stock', e.target.value)}
          onSubCategoryChange={(e) =>
            onFieldChange('subCategory', e.target.value)
          }
        />
      </div>
    </Modal>
  )
}

export default EditProductModal
