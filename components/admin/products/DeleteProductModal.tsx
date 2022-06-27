import { adminRequestHandler } from '../../../lib/admin'
import request from '../../../lib/request'
import Modal from '../../Modal'
import ModalHeader from '../ModalHeader'

const DeleteProductModal = ({
  open,
  onClose,
  setCategories,
  product,
  products,
  category,
}) => {
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

  const onDeleteHandler = async () => {
    adminRequestHandler({
      loading: 'Deleting...',
      handler: async () => {
        if (products.length > 1) {
          const responses = await Promise.all(
            products.map((product) => {
              return request.delete(`/products/${product.id}`)
            })
          )
          const deletedIds = responses.map((res) => res.data.id)
          setCategories((categories) => {
            const index = categories.findIndex((c) => c.id == category.id)
            return [
              ...categories.slice(0, index),
              {
                ...category,
                products: category.products.filter(
                  (p) => !deletedIds.includes(p.id)
                ),
              },
              ...categories.slice(index + 1),
            ]
          })
        } else {
          await request.delete(`/products/${product?.id || products[0].id}`)
          const index = category.products.findIndex(
            (p) => p.id == (product?.id || products[0].id)
          )
          updateCategoryProducts([
            ...category.products.slice(0, index),
            ...category.products.slice(index + 1),
          ])
        }
        onClose()
      },
      success: 'Delete Success',
    })
  }
  return (
    <Modal {...{ open, onClose }}>
      <ModalHeader
        title="Delete Product Confirmation"
        logo={category.logoImg}
      />
      <div className="p-5">
        <p className="flex flex-wrap items-center">
          Are you sure want to delete{' '}
          {products.length > 1 ? (
            <>
              {products.length} products ?
              <ul className="mt-3 w-full">
                {products.map((product) => (
                  <li key={product?.id} className="flex items-center">
                    <img
                      src={product?.img}
                      alt={product?.title}
                      className="w-5 h-5 mr-1"
                    />
                    <b>{product?.title}</b>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <span className="inline-flex items-center ml-1">
              <img
                src={product?.img || products[0]?.img}
                alt={product?.title || products[0]?.title}
                className="w-5 h-5 mr-1"
              />
              <b>{product?.title || products[0]?.title} ?</b>
            </span>
          )}
        </p>
        <div className="flex space-x-5 mt-8">
          <button
            onClick={onDeleteHandler}
            className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 font-medium rounded-xl transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white px-5 py-2 font-medium rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteProductModal
