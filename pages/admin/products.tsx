import { PencilIcon, PlusSmIcon } from '@heroicons/react/outline'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import AdminContainer from '../../components/admin/AdminContainer'
import { getUserAdmin } from '../../lib/admin'
import { parseData } from '../../lib/utils'
import { getAllCategories } from '../api/categories'
import AddProductsModal from '../../components/admin/products/AddProductsModal'
import Chart from '../../components/Chart'
import ProductsTable from '../../components/admin/products/ProductsTable'

const Products = ({ user, categories: categoriesFromServer }) => {
  const [categories, setCategories] = useState(categoriesFromServer)
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [showAddProducts, setShowAddProducts] = useState(false)

  const category = categories[categoryIndex]
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
          onChange={(e) => setCategoryIndex(Number(e.target.value))}
          className="select"
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
              <h2 className="text-xl font-semibold">{category.name}</h2>
              {/* TODO: bikin edit category detail -> munculin modal buat ngedit name, description, requirements, subcategories */}
              <button className="mt-1 text-green-500 hover:underline font-medium flex items-center">
                <PencilIcon className="w-5 h-5 mr-2" /> Edit Category
              </button>
            </div>
          </div>
        </div>

        {/* TODO: ganti hardcoded category chart dengan dynamic data */}
        {/* CATEGORY CHART */}
        <div className="flex-grow w-full">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg text-gray-600">Total Revenue</h3>
              <select className="select mt-1">
                <option value="">All Time</option>
                <option value="">Previous Month</option>
                <option value="">This Month</option>
              </select>
            </div>
            <h3 className="text-3xl font-semibold">Rp 5,000,000</h3>
          </div>
          <div className="mt-4">
            <div>
              <h3 className="text-lg text-gray-600">Total Sales</h3>
              <select className="select mt-1">
                <option value="">2022</option>
                <option value="">2021</option>
                <option value="">2020</option>
              </select>
            </div>
            <Chart
              type="line"
              className="mt-4"
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                ],
                datasets: [
                  {
                    label: 'Sales',
                    borderColor: 'green',
                    backgroundColor: 'green',
                    data: [10, 30, 20, 80, 90, 75, 89],
                  },
                ],
              }}
            />
          </div>
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
          <button
            onClick={() => setShowAddProducts(true)}
            className="flex items-center bg-green-500 text-white px-2 py-1 font-medium rounded-md hover:bg-green-400"
          >
            <PlusSmIcon className="w-5 h-5 mr-1" /> Product
          </button>
          <AddProductsModal
            open={showAddProducts}
            onClose={() => setShowAddProducts(false)}
            setCategories={setCategories}
            category={category}
          />
        </div>

        {/* TODO: tampilin products pake table mui */}
        <ProductsTable setCategories={setCategories} category={category} />
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
    productInclude: 'subCategory',
  })

  return parseData({
    props: {
      user,
      categories,
    },
  })
}
