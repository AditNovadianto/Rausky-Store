import { PencilIcon, PlusSmIcon } from '@heroicons/react/outline'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import AdminContainer from '../../components/admin/AdminContainer'
import { getUserAdmin } from '../../lib/admin'
import { parseData } from '../../lib/utils'
import { getAllCategories } from '../api/categories'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

const Products = ({ user, categories }) => {
  const [category, setCategory] = useState(categories[0])

  console.log(category)

  const editLogoImg = () => {
    prompt(`Logo image path/url`)
  }

  const editBannerImg = () => {
    prompt(`Banner image path/url`)
  }

  return (
    <AdminContainer user={user}>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        {/* SELECT CATEGORY */}
        <div className="flex items-center space-x-5">
          <h2 className="text-xl font-medium">Category</h2>
          <button className="flex items-center bg-green-500 text-white px-2 py-1 font-medium rounded-md hover:bg-green-400">
            <PlusSmIcon className="w-5 h-5 mr-1" /> Category
          </button>
        </div>
        <select
          onChange={(e) => setCategory(categories[e.target.value])}
          className="border focus:outline-none focus:border-green-400 focus:ring focus:ring-green-200 focus:ring-opacity-70 px-2 py-1 rounded-md cursor-pointer text-gray-600"
        >
          {categories.map((category, idx) => (
            <option key={category.id} value={idx}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-10 flex space-x-10">
        {/* CATEGORY OVERVIEW */}
        <div className="flex-grow w-full">
          {/* BANNER */}
          {category.bannerImg ? (
            <button
              onClick={editBannerImg}
              className="w-full mr-5 group relative rounded-2xl overflow-hidden"
            >
              <img
                className="w-full"
                src={category.bannerImg}
                alt={category.name + ' banner'}
              />
              <div className="absolute inset-0 bg-black/50 flex transition-opacity opacity-0 group-hover:opacity-100">
                <PencilIcon className="m-auto text-white w-5 h-5" />
              </div>
            </button>
          ) : (
            <button className="mr-5 flex items-center text-gray-600 hover:text-green-500">
              <PlusSmIcon className="w-5 h-5 mr-1" /> banner
            </button>
          )}
          <div className="flex items-center mt-4">
            {/* LOGO */}
            {category.logoImg ? (
              <button
                className="group relative mr-5 rounded-2xl overflow-hidden"
                onClick={editLogoImg}
              >
                <img
                  src={category.logoImg}
                  alt={category.name + ' logo'}
                  className="w-20 h-20 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex transition-opacity opacity-0 group-hover:opacity-100">
                  <PencilIcon className="m-auto text-white w-5 h-5" />
                </div>
              </button>
            ) : (
              <button className="mr-5 flex items-center text-gray-600 hover:text-green-500">
                <PlusSmIcon className="w-5 h-5 mr-1" /> logo
              </button>
            )}

            <div>
              <label>
                <span className="block text-gray-500 text-sm mb-1">Name</span>
                <input
                  className="text-xl font-medium focus:outline-none border rounded-md px-3 py-2 focus:border-green-400"
                  type="text"
                  value={category.name}
                />
              </label>
            </div>
          </div>
          <button className="mt-5 text-green-500 hover:underline font-medium flex items-center">
            <PencilIcon className="w-5 h-5 mr-2" /> Edit Details
          </button>
        </div>
        {/* CATEGORY CHART */}
        {/* TODO: bikin category chart pake react-charts https://react-chartjs-2.js.org/ */}
        <div className="border flex-grow w-full">
          <p>Total revenue</p>
          <p>Total Sales chart</p>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="mt-8">
        <div className="flex items-center space-x-5">
          <h2 className="text-xl font-medium">
            Products{' '}
            <span className="text-gray-500 font-normal">
              ({category.products.length})
            </span>
          </h2>
          <button className="flex items-center bg-green-500 text-white px-2 py-1 font-medium rounded-md hover:bg-green-400">
            <PlusSmIcon className="w-5 h-5 mr-1" /> Product
          </button>
        </div>

        {/* TODO: tampilin products pake table mui */}
        <div className="mt-5">
          {category.products.map((product) => (
            <div key={product.id}></div>
          ))}
        </div>
      </div>
    </AdminContainer>
  )
}

export default Products

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [user, error] = await getUserAdmin(ctx)
  if (error) return error

  const categories = await getAllCategories({
    include: 'subCategories,products',
  })

  return parseData({
    props: {
      user,
      categories,
    },
  })
}
