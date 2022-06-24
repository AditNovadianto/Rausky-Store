import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { adminRequestHandler } from '../../../lib/admin'
import request from '../../../lib/request'

const ProductsTable = ({ setCategories, category }) => {
  const { products } = category

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

  const deleteHandler = async (productId) => {
    if (!confirm('Are you sure want to delete ?')) return
    adminRequestHandler({
      loading: 'Deleting...',
      handler: async () => {
        await request.delete(`/products/${productId}`)
        const index = category.products.findIndex((p) => p.id == productId)
        updateCategoryProducts([
          ...category.products.slice(0, index),
          ...category.products.slice(index + 1),
        ])
      },
      success: 'Delete Success',
    })
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
            {/* TODO: bikin edit product handler */}
            <button className="hover:text-green-500">
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

  return (
    <div className="mt-10 h-[90vh]">
      <DataGrid
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        checkboxSelection
      />
    </div>
  )
}

export default ProductsTable
