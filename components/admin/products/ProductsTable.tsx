import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'
import DeleteProductModal from './DeleteProductModal'
import EditProductModal from './EditProductModal'

const ProductsTable = ({ setCategories, category }) => {
  const { products } = category
  const [showEditProduct, setShowEditProduct] = useState(false)
  const [showDeleteProduct, setShowDeleteProduct] = useState(false)

  const [selectedProductId, setSelectedProductId] = useState('')

  const [selectedProductIds, setSelectedProductsIds] = useState([])

  const editHandler = (productId) => {
    setSelectedProductId(productId)
    setShowEditProduct(true)
  }

  const deleteHandler = async (productId) => {
    setSelectedProductId(productId)
    setShowDeleteProduct(true)
  }

  const columns: GridColDef[] = [
    {
      field: 'img',
      renderCell: (params) => {
        return <img src={params.row.img} className="h-[70%] rounded-2xl" />
      },
    },
    {
      field: 'title',
      width: 300,
    },
    {
      field: 'price',
      width: 200,
      renderCell: (params) => `Rp ${params.row.price.toLocaleString()}`,
    },
    {
      field: 'actions',
      renderCell: (params) => {
        return (
          <div className="flex space-x-4 text-gray-500">
            <button
              onClick={() => editHandler(params.row.id)}
              className="hover:text-green-500"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => deleteHandler(params.row.id)}
              className="hover:text-red-500"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        )
      },
    },
  ]

  const rows = products
    .sort((p1, p2) => p1.price - p2.price)
    .map((product) => {
      let data = {
        id: product.id,
        title: product.title,
        img: product.img,
        price: product.price,
      }
      return data
    })

  const selectedProduct = useMemo(
    () => products.find((p) => p.id == selectedProductId),
    [selectedProductId, products]
  )

  const selectedProducts = useMemo(
    () => selectedProductIds.map((id) => products.find((p) => p.id == id)),
    [selectedProductIds, products]
  )

  return (
    <div className="mt-10 h-[90vh]">
      {selectedProductIds.length > 0 && (
        <div className="mb-5">
          <button
            onClick={() => setShowDeleteProduct(true)}
            className="text-red-500 hover:underline font-medium flex items-center"
          >
            <TrashIcon className="w-5 h-5 mr-1" /> Delete (
            {selectedProductIds.length})
          </button>
        </div>
      )}
      <DataGrid
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        checkboxSelection
        selectionModel={selectedProductIds}
        onSelectionModelChange={(productIds) => {
          setSelectedProductsIds(productIds)
        }}
      />
      {selectedProduct && (
        <EditProductModal
          open={showEditProduct}
          product={selectedProduct}
          category={category}
          setCategories={setCategories}
          onClose={() => {
            setShowEditProduct(false)
            setSelectedProductId('')
          }}
        />
      )}
      {(selectedProduct || selectedProducts.length > 0) && (
        <DeleteProductModal
          open={showDeleteProduct}
          product={selectedProduct}
          products={selectedProducts}
          category={category}
          setCategories={setCategories}
          onClose={() => {
            setShowDeleteProduct(false)
            setSelectedProductId('')
            setSelectedProductsIds([])
          }}
        />
      )}
    </div>
  )
}

export default ProductsTable
