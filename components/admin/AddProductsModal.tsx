import {
  DotsVerticalIcon,
  DuplicateIcon,
  PlusSmIcon,
  TrashIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import Dropdown from '../Dropdown'
import Modal from '../Modal'

const AddProductsModal = ({ open, onClose, category }) => {
  const [newProducts, setNewProducts] = useState([
    {
      title: '',
      price: '',
      img: category.logoImg || '',
      category: category.slug,
      subCategory: '',
    },
  ])

  const inputHandler = (index: number, prop: string, value) => {
    setNewProducts((newProducts) => {
      return [
        ...newProducts.slice(0, index),
        { ...newProducts[index], [prop]: value },
        ...newProducts.slice(index + 1),
      ]
    })
  }

  const addHandler = () => {
    setNewProducts([
      ...newProducts,
      {
        title: '',
        price: '',
        img: category.logoImg || '',
        category: category.slug,
        subCategory: '',
      },
    ])
  }

  const duplicateHandler = (index: number) => {
    setNewProducts((newProducts) => [
      ...newProducts.slice(0, index + 1),
      { ...newProducts[index] },
      ...newProducts.slice(index + 1),
    ])
  }

  const deleteHandler = (index: number) => {
    setNewProducts((newProducts) => [
      ...newProducts.slice(0, index),
      ...newProducts.slice(index + 1),
    ])
  }

  console.log(newProducts)

  return (
    <Modal open={open} onClose={onClose}>
      <header className="sticky top-0 bg-white p-5 flex justify-between items-center shadow-sm">
        <h2 className="text-2xl font-bold">Add Products</h2>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="flex justify-center items-center bg-green-500 hover:bg-green-400 text-white font-semibold w-full px-4 py-2 rounded-xl"
          >
            <UploadIcon className="w-5 h-5 mr-1" /> Save
          </button>
          <img src={category.logoImg} className="w-10 h-10 rounded-2xl" />
        </div>
      </header>
      <div className="overflow-auto p-5 space-y-4">
        {newProducts?.map((newProduct, index) => {
          console.log(index)
          return (
            <div key={index} className="rounded-xl space-y-4 border p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">product {index + 1}</h3>
                <Dropdown
                  items={[
                    {
                      icon: DuplicateIcon,
                      label: 'Duplicate',
                      onClick: () => {
                        duplicateHandler(index)
                      },
                    },
                    {
                      icon: TrashIcon,
                      label: 'Delete',
                      onClick: () => {
                        deleteHandler(index)
                      },
                    },
                  ]}
                  minWidth={150}
                >
                  <IconButton>
                    <DotsVerticalIcon className="w-5 h-5 text-gray-500" />
                  </IconButton>
                </Dropdown>
              </div>
              <label className="block">
                <span className="block text-sm text-gray-500 mb-1">Title</span>
                <input
                  type="text"
                  className="input"
                  value={newProduct.title}
                  onChange={(e) => inputHandler(index, 'title', e.target.value)}
                />
              </label>
              <label className="block">
                <span className="block text-sm text-gray-500 mb-1">Price</span>
                <input
                  type="number"
                  className="input"
                  value={newProduct.price}
                  onChange={(e) => inputHandler(index, 'price', e.target.value)}
                />
              </label>
              <label className="block w-full">
                <span className="block text-sm text-gray-500 mb-1">
                  Sub Category
                </span>
                {category.subCategories.length ? (
                  <select
                    className="select w-full p-3 rounded-xl"
                    value={newProduct.subCategory}
                    onChange={(e) =>
                      inputHandler(index, 'subCategory', e.target.value)
                    }
                  >
                    <option value=""> --select-- </option>
                    {category.subCategories.map((subCategory) => (
                      <option key={subCategory.id} value={subCategory.slug}>
                        {subCategory.name}
                      </option>
                    ))}
                  </select>
                ) : null}
                <button
                  type="button"
                  className="mt-3 flex items-center text-green-500"
                >
                  <PlusSmIcon className="w-5 h-5 mr-1" /> Sub Category
                </button>
              </label>
            </div>
          )
        })}
        <button
          type="button"
          onClick={addHandler}
          className="mt-3 flex justify-center items-center border border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-medium w-full py-2 rounded-xl"
        >
          <PlusSmIcon className="w-5 h-5 mr-1" /> Product
        </button>
      </div>
    </Modal>
  )
}

export default AddProductsModal
