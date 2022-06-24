import {
  DocumentAddIcon,
  DocumentRemoveIcon,
  DocumentTextIcon,
  DotsVerticalIcon,
  DuplicateIcon,
  MenuIcon,
  PlusSmIcon,
  RefreshIcon,
  TrashIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { IconButton } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { adminRequestHandler } from '../../../lib/admin'
import request from '../../../lib/request'
import Dropdown from '../../Dropdown'
import Modal from '../../Modal'
import Product from './Product'

const initialNewProducts = (category) => {
  let newProduct: CustomObject = {
    title: '',
    price: 0,
    category: category.slug,
    stock: 0,
  }

  if (category.subCategories.length > 0) {
    newProduct.subCategory = category.subCategories[0].slug
  }

  return [newProduct]
}

const AddProductsModal = ({ open, onClose, category, setCategories }) => {
  const [newProducts, setNewProducts] = useState(initialNewProducts(category))
  const [errors, setErrors] = useState({})
  const modalRef = useRef<HTMLDivElement>(null)

  // add new product
  useHotkeys(
    'ctrl+a',
    (e) => {
      e.preventDefault()
      if (newProducts.length == 0) return
      addHandler()
    },
    {
      enableOnTags: ['INPUT', 'TEXTAREA', 'SELECT'],
    }
  )

  // duplicate last product
  useHotkeys(
    'ctrl+d',
    (e) => {
      e.preventDefault()
      if (newProducts.length == 0) return
      duplicateHandler(newProducts.length - 1)
    },
    {
      enableOnTags: ['INPUT', 'TEXTAREA', 'SELECT'],
    }
  )

  // delete last product
  useHotkeys(
    'del',
    () => {
      if (newProducts.length == 0) return
      deleteHandler(newProducts.length - 1)
    },
    {
      enableOnTags: ['INPUT', 'TEXTAREA', 'SELECT'],
    }
  )

  const validateNewProducts = () => {
    setErrors({})
    newProducts.forEach((newProduct, index) => {
      let errorFields: CustomObject = {}
      Object.entries(newProduct).forEach(([field, value]) => {
        if (typeof value == 'string' && value == '') {
          errorFields[field] = `${field} cannot be empty`
        }
      })

      if (Object.keys(errorFields).length > 0) {
        setErrors({ ...errors, [index]: errorFields })
      }
    })
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

  const saveNewProducts = async () => {
    const message = `${newProducts.length} Product${
      newProducts.length > 1 ? 's' : ''
    }`
    adminRequestHandler({
      loading: `Saving ${message}...`,
      handler: async () => {
        const { data } = await request.post('/products', newProducts)
        updateCategoryProducts([...category.products, ...data.products])
        onClose()
      },
      success: `${message} Saved`,
    })
  }

  useEffect(() => {
    validateNewProducts()
  }, [newProducts])

  const inputHandler = (index: number, prop: string, value) => {
    setNewProducts((newProducts) => {
      return [
        ...newProducts.slice(0, index),
        { ...newProducts[index], [prop]: value },
        ...newProducts.slice(index + 1),
      ]
    })
  }

  const removePropHandler = (index: number, prop: string) => {
    setNewProducts((newProducts) => {
      delete newProducts[index][prop]
      return [
        ...newProducts.slice(0, index),
        { ...newProducts[index] },
        ...newProducts.slice(index + 1),
      ]
    })
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      if (modalRef) {
        modalRef.current.scrollTo({
          top: modalRef.current.scrollHeight,
          behavior: 'smooth',
        })
      }
    }, 0)
  }

  const addHandler = () => {
    setNewProducts([...newProducts, initialNewProducts(category)[0]])
    scrollToBottom()
  }

  const duplicateHandler = (index: number) => {
    setNewProducts((newProducts) => [
      ...newProducts.slice(0, index + 1),
      { ...newProducts[index] },
      ...newProducts.slice(index + 1),
    ])
    scrollToBottom()
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

  const dropdownItems = (newProduct, index) => [
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
    {
      icon: MenuIcon,
      label: 'Others',
      more: [
        {
          icon:
            newProduct.description !== undefined
              ? DocumentRemoveIcon
              : DocumentAddIcon,
          label: `${
            newProduct.description !== undefined ? 'Remove' : 'Add'
          } Description`,
          onClick: () => {
            if (newProduct.description !== undefined) {
              removePropHandler(index, 'description')
            } else {
              inputHandler(index, 'description', '')
            }
          },
        },
        {
          icon: DocumentTextIcon,
          label: 'Shortcuts',
          onClick: () => {
            alert(`
              ctrl+a : add new product
              ctrl+d : duplicate last product
              del : delete last product
          `)
          },
        },
      ],
    },
  ]

  return (
    <Modal open={open} onClose={onClose} ref={modalRef}>
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
            className="flex justify-center items-center bg-green-500 hover:bg-green-400 text-white transition-colors font-semibold w-full px-4 py-2 rounded-xl whitespace-nowrap"
          >
            <UploadIcon className="w-5 h-5 mr-1" /> Save ({newProducts.length})
          </button>
        </div>
      </header>

      <div className="overflow-auto p-5 space-y-6">
        {newProducts?.map((newProduct, index) => {
          return (
            <Product
              key={index}
              product={newProduct}
              category={category}
              dropdown={
                <Dropdown
                  items={dropdownItems(newProduct, index)}
                  minWidth={150}
                >
                  <IconButton>
                    <DotsVerticalIcon className="w-5 h-5 text-gray-500" />
                  </IconButton>
                </Dropdown>
              }
              index={index}
              errors={errors}
              onTitleChange={(e) =>
                inputHandler(index, 'title', e.target.value)
              }
              onPriceChange={(e) =>
                inputHandler(index, 'price', Number(e.target.value))
              }
              onStockChange={(e) =>
                inputHandler(index, 'stock', Number(e.target.value))
              }
              onSubCategoryChange={(e) =>
                inputHandler(index, 'subCategory', e.target.value)
              }
            />
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
