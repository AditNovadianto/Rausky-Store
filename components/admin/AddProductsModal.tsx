import {
  DotsVerticalIcon,
  DuplicateIcon,
  PlusSmIcon,
  RefreshIcon,
  TrashIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import request from '../../lib/request'
import Dropdown from '../Dropdown'
import Modal from '../Modal'

const initialNewProducts = (category) => {
  let newProduct: CustomObject = {
    title: '',
    price: '',
    category: category.slug,
  }

  if (category.subCategories.length > 0) {
    newProduct.subCategory = category.subCategories[0].slug
  }

  return [newProduct]
}

const AddProductsModal = ({ open, onClose, category }) => {
  const [newProducts, setNewProducts] = useState(initialNewProducts(category))
  const [errors, setErrors] = useState({})
  const router = useRouter()

  const validateNewProducts = () => {
    setErrors({})
    newProducts.forEach((newProduct, index) => {
      let errorFields: CustomObject = {}
      Object.entries(newProduct).forEach(([field, value]) => {
        if (!value) {
          errorFields[field] = `${field} cannot be empty`
        }
      })

      if (Object.keys(errorFields).length > 0) {
        setErrors({ ...errors, [index]: errorFields })
      }
    })
  }

  const saveNewProducts = async () => {
    let toastId: string
    const message = `${newProducts.length} product${
      newProducts.length > 1 ? 's' : ''
    }`

    try {
      toastId = toast.loading(`Saving ${message}...`)
      await request.post('/products', newProducts)
      toast.success(`${message} saved`, { id: toastId })
      location.reload()
    } catch (err) {
      console.log(err)
      let errorMessage = ''
      if (err.status == 403) {
        errorMessage = 'Opps... fake admin is not allowed to do this operation'
      } else {
        errorMessage = 'Failed. Check console for details'
      }
      toast.error(errorMessage, { id: toastId })
    }
  }

  useEffect(() => {
    validateNewProducts()
  }, [newProducts])

  console.log(errors)

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
    setNewProducts([...newProducts, initialNewProducts(category)[0]])
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

  const resetHandler = () => {
    setNewProducts(initialNewProducts(category))
  }

  const resetSpecificHandler = (index: number) => {
    const [reset] = initialNewProducts(category)
    setNewProducts((newProducts) => [
      ...newProducts.slice(0, index),
      reset,
      ...newProducts.slice(index + 1),
    ])
  }

  useEffect(() => {
    resetHandler()
  }, [category])

  return (
    <Modal open={open} onClose={onClose}>
      <header className="sticky top-0 z-[100] bg-white p-5 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3">
          {category.logoImg && (
            <img src={category.logoImg} className="w-10 h-10 rounded-2xl" />
          )}
          <h2 className="text-2xl font-bold">Add Products</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={resetHandler}
            disabled={newProducts.length == 0}
            className="flex justify-center items-center border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors font-semibold w-full px-4 py-2 rounded-xl whitespace-nowrap"
          >
            <RefreshIcon className="w-5 h-5 mr-1" /> Reset All
          </button>
          <button
            type="button"
            onClick={saveNewProducts}
            disabled={newProducts.length == 0 || Object.keys(errors).length > 0}
            className="flex justify-center items-center bg-green-500 hover:bg-green-400 text-white transition-colors font-semibold w-full px-4 py-2 rounded-xl"
          >
            <UploadIcon className="w-5 h-5 mr-1" /> Save ({newProducts.length})
          </button>
        </div>
      </header>

      <div className="overflow-auto p-5 space-y-6">
        {newProducts?.map((newProduct, index) => {
          return (
            <div key={index}>
              <header className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center space-x-4">
                  <span className="bg-green-500 text-white w-8 h-8 shadow-lg shadow-green-300/50 flex items-center justify-center rounded-full">
                    {index + 1}
                  </span>
                  <span>{newProduct.title || 'Untitled Product'}</span>
                </h3>
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
                      icon: RefreshIcon,
                      label: 'Reset',
                      onClick: () => {
                        resetSpecificHandler(index)
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
              </header>
              <div className="flex justify-between space-x-4 mt-5">
                {/* FORM */}
                <div className="w-full rounded-2xl space-y-4">
                  {/* TITLE */}
                  <label className="block">
                    <span className="block text-sm text-gray-500 mb-1">
                      Title
                    </span>
                    <input
                      type="text"
                      className="input"
                      value={newProduct.title}
                      onChange={(e) =>
                        inputHandler(index, 'title', e.target.value)
                      }
                    />
                    {errors[index]?.title && (
                      <span className="text-sm text-red-500 font-medium">
                        {errors[index].title}
                      </span>
                    )}
                  </label>
                  {/* PRICE */}
                  <label className="block">
                    <span className="block text-sm text-gray-500 mb-1">
                      Price
                    </span>
                    <input
                      type="number"
                      min={0}
                      className="input"
                      value={newProduct.price}
                      onChange={(e) =>
                        inputHandler(index, 'price', e.target.value)
                      }
                    />
                    {errors[index]?.price && (
                      <span className="text-sm text-red-500 font-medium">
                        {errors[index].price}
                      </span>
                    )}
                  </label>

                  {/* SUBCATEGORY */}
                  {category.subCategories.length ? (
                    <label className="block w-full">
                      <span className="block text-sm text-gray-500 mb-1">
                        Sub Category
                      </span>
                      <select
                        className="select w-full p-3 rounded-xl"
                        value={newProduct.subCategory}
                        onChange={(e) =>
                          inputHandler(index, 'subCategory', e.target.value)
                        }
                      >
                        {category.subCategories.map((subCategory) => (
                          <option key={subCategory.id} value={subCategory.slug}>
                            {subCategory.name}
                          </option>
                        ))}
                      </select>
                      {errors[index]?.subCategory && (
                        <span className="text-sm text-red-500 font-medium">
                          {errors[index].subCategory}
                        </span>
                      )}
                    </label>
                  ) : null}
                </div>

                {/* PREVIEW */}
                <div className="w-full">
                  <span className="block text-sm text-gray-500 mb-1">
                    Preview
                  </span>

                  {/* TODO: refactor, bikin komponen topup sendiri */}
                  <div
                    className={
                      'px-4 py-3 border rounded-xl hover:border-green-400'
                    }
                  >
                    <div className="flex items-center">
                      {category.logoImg && (
                        <img
                          src={
                            (newProduct.subCategory
                              ? category.subCategories.find(
                                  (c) => c.slug == newProduct.subCategory
                                )
                              : category
                            )?.logoImg
                          }
                          className="w-10 h-10 object-cover rounded-lg mb-1.5"
                        />
                      )}

                      <button className="block md:hidden p-1.5 bg-gray-200 hover:bg-red-500 text-gray-500 hover:text-gray-100 rounded-xl ml-auto">
                        <TrashIcon className="w-5 h-5 text-current" />
                      </button>
                    </div>
                    <div>
                      <p className="font-semibold">
                        {newProduct.title || 'Untitled Product'}
                      </p>
                      <p className="text-gray-500">
                        Rp {Number(newProduct.price).toLocaleString()}
                      </p>

                      <div className="flex items-center mt-3">
                        <div className="flex items-center flex-grow md:flex-grow-0 justify-between text-gray-500">
                          <button className="w-8 h-8 rounded-xl font-medium border hover:bg-gray-800 hover:text-gray-100">
                            {' '}
                            -{' '}
                          </button>
                          <div className="px-5">{1}</div>
                          <button className="w-8 h-8 rounded-xl font-medium border hover:bg-gray-800 hover:text-gray-100">
                            {' '}
                            +{' '}
                          </button>
                        </div>
                        <button className="hidden md:block p-1.5 bg-gray-200 hover:bg-red-500 text-gray-500 hover:text-gray-100 rounded-xl ml-auto">
                          <TrashIcon className="w-5 h-5 text-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <button
          type="button"
          onClick={addHandler}
          className="mt-3 text-gray-500 flex justify-center items-center font-medium w-full py-2 rounded-xl"
        >
          <PlusSmIcon className="w-5 h-5 mr-1" /> Product
        </button>
      </div>
    </Modal>
  )
}

export default AddProductsModal
