import { useState } from 'react'
import Container from '../../components/Container'
import Wrapper from '../../components/Wrapper'
import Link from '../../components/Link'
import { parseData } from '../../lib/utils'
import { getSpecificCategory } from '../api/categories/[categoryId]'
import cn from 'classnames'
import { TrashIcon } from '@heroicons/react/outline'

const filterProductsBySubCategory = (subCategory, products) => {
  return subCategory
    ? products.filter((product) => product.subCategory.slug == subCategory)
    : products
}

const Topup = ({ category }) => {
  const [currentSubCategory, setCurrentSubCategory] = useState(
    category.subCategories[0]?.slug
  )

  const [selectedProducts, setSelectedProducts] = useState([])

  console.log(category)

  const products = filterProductsBySubCategory(
    currentSubCategory,
    category.products
  )

  return (
    <Container noTopMargin>
      <br className="hidden md:block" />
      <img
        className="w-full md:hidden"
        src={category.bannerImg}
        alt={category.slug}
      />
      <Wrapper className="md:flex">
        {/* TOPUP INFO */}
        <div className="md:w-[40%] w-full md:sticky md:top-[80px] md:self-start">
          <img
            className="hidden md:block w-full rounded-2xl"
            src={category.bannerImg}
            alt={category.slug}
          />
          <div className="flex items-center mt-5">
            <img
              className="w-[80px] rounded-xl"
              src={category.logoImg}
              alt="ML"
            />
            <div className="ml-5">
              <p className="font-semibold text-xl">{category.name}</p>
              {/* <p className="font-semibold text-gray-500">Developer</p> */}
            </div>
          </div>
          <p className="mt-5 text-gray-500">{category.description}</p>
        </div>

        {/* CHOOSE ITEMS */}
        <div className="md:w-[60%] md:mt-0 mt-10 w-full md:ml-5 space-y-8 mb-8">
          {/* REQUIREMENT */}
          {category.requirement && (
            <div className="border rounded-2xl px-5 pb-5 w-full">
              <div className="w-[40px] h-[40px] text-center -mt-5 leading-[32px] border-4 border-green-100 rounded-full bg-green-500 text-white font-bold">
                1
              </div>
              <h1 className="text-2xl font-bold mt-2">
                {category.requirement.title}
              </h1>

              <form className="mt-5 lg:flex-row flex-col flex space-x-0 lg:space-x-3 space-y-3 lg:space-y-0">
                {category.requirement.fields.map((field) => (
                  <div className="w-full">
                    <input
                      className="block w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-green-400"
                      placeholder={field.placeholder}
                      type={field.type}
                    />
                    {/* <p
                  className={`${
                    haveUserID ? 'opacity-100 mt-0' : 'opacity-0 -mt-[20px]'
                  } text-red-600 transition-all`}
                >
                  Harus Diisi!!!
                </p> */}
                  </div>
                ))}
              </form>
              <div className="mt-4">
                {/* TODO: bikin modal di mobile buat liat full img */}
                <img
                  className="rounded-xl"
                  src={category.requirement.img}
                  alt={category.requirement.title}
                />
                <p className="mt-3 pb-2 text-gray-500">
                  {category.requirement.description}
                </p>
              </div>
            </div>
          )}

          {/* CHOOSE */}
          <div className="border rounded-2xl px-5 pb-5 w-full">
            <div className="w-[40px] h-[40px] text-center -mt-5 leading-[32px] border-4 border-green-100 rounded-full bg-green-500 text-white font-bold">
              {category.requirement ? 2 : 1}
            </div>
            <h1 className="text-2xl font-bold mt-2">Pilih Nominal Topup</h1>

            {/* SUB CATEGORY */}
            {category.subCategories.length > 0 && (
              <div className="mt-5">
                <p className="font-semibold text-lg">Pilih Kategori</p>
                <div className="flex flex-col md:flex-row space-y-4 mt-4 md:space-y-0 md:space-x-4">
                  {category.subCategories.map((subCategory) => (
                    <button
                      key={subCategory.id}
                      onClick={() => setCurrentSubCategory(subCategory.slug)}
                      className={cn(
                        'w-full flex items-center px-2 py-3 border rounded-xl hover:border-green-400',
                        currentSubCategory == subCategory.slug &&
                          'border-green-400 bg-green-100'
                      )}
                    >
                      <img
                        className="w-6 h-6"
                        src={subCategory.logoImg}
                        alt={subCategory.slug}
                      />
                      <span className="font-semibold ml-2">
                        {subCategory.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ITEMS */}
            <div className="mt-5">
              <p className="font-semibold text-lg">Pilih Item</p>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div
                    role={
                      selectedProducts.includes(product) ? undefined : 'button'
                    }
                    key={product.id}
                    onClick={() => {
                      if (selectedProducts.includes(product)) return
                      setSelectedProducts((current) => [...current, product])
                    }}
                    className={cn(
                      'px-4 py-3 border rounded-xl hover:border-green-400',
                      selectedProducts.includes(product) && 'border-green-400'
                    )}
                  >
                    <div className="flex items-center">
                      {product.img && (
                        <img src={product.img} className="w-10 h-10" />
                      )}
                      {selectedProducts.includes(product) && (
                        <button className="block md:hidden p-1.5 bg-gray-200 hover:bg-red-500 text-gray-500 hover:text-gray-100 rounded-xl ml-auto">
                          <TrashIcon className="w-5 h-5 text-current" />
                        </button>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{product.title}</p>
                      <p className="text-gray-500">
                        Rp {product.price.toLocaleString()}
                      </p>
                      {selectedProducts.includes(product) && (
                        <div className="flex items-center mt-3">
                          <div className="flex items-center flex-grow md:flex-grow-0 justify-between text-gray-500">
                            <button className="w-8 h-8 rounded-xl font-medium border hover:bg-gray-800 hover:text-gray-100">
                              {' '}
                              -{' '}
                            </button>
                            <div className="px-5">1</div>
                            <button className="w-8 h-8 rounded-xl font-medium border hover:bg-gray-800 hover:text-gray-100">
                              {' '}
                              +{' '}
                            </button>
                          </div>
                          <button className="hidden md:block p-1.5 bg-gray-200 hover:bg-red-500 text-gray-500 hover:text-gray-100 rounded-xl ml-auto">
                            <TrashIcon className="w-5 h-5 text-current" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/cart"
            className="block w-full py-4 text-center bg-green-500 hover:bg-green-400 transition-all font-semibold text-white rounded-2xl shadow-xl shadow-green-300"
          >
            Continue to payment
          </Link>
        </div>
      </Wrapper>
    </Container>
  )
}

export default Topup

export const getServerSideProps = async ({ params }) => {
  const category = await getSpecificCategory({ categorySlug: params.category })

  if (!category) {
    return {
      notFound: true,
    }
  }

  return {
    props: parseData({ category }),
  }
}
