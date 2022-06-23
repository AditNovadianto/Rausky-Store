import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

const createProductColumns = (products) => {
  return [
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
            <button className="hover:text-green-500">
              <PencilIcon className="w-5 h-5" />
            </button>
            <button className="hover:text-red-500">
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        )
      },
    },
  ] as GridColDef[]
}

const createProductRows = (products) => {
  console.log(products)
  return products.map((product) => {
    let data = {
      id: product.id,
      title: product.title,
      img: product.img,
      price: product.price,
    }
    return data
  })
}

const ProductsTable = ({ products }) => {
  return (
    <div className="mt-10 h-screen">
      <DataGrid
        disableSelectionOnClick
        rows={createProductRows(products)}
        columns={createProductColumns(products)}
        checkboxSelection
      />
    </div>
  )
}

export default ProductsTable
