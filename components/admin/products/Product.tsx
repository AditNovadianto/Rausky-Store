import { TrashIcon } from '@heroicons/react/outline'

interface Props {
  product: any
  category: any
  index: number
  errors?: any
  dropdown?: React.ReactNode
  onTitleChange: React.ChangeEventHandler<HTMLInputElement>
  onPriceChange: React.ChangeEventHandler<HTMLInputElement>
  onStockChange: React.ChangeEventHandler<HTMLInputElement>
  onSubCategoryChange?: React.ChangeEventHandler<HTMLSelectElement>
}

const Product = ({
  category,
  product,
  index,
  dropdown,
  onTitleChange,
  onPriceChange,
  onStockChange,
  errors,
  onSubCategoryChange,
}: Props) => {
  return (
    <div>
      <header className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center space-x-4">
          <span className="bg-green-500 text-white w-8 h-8 shadow-lg shadow-green-300/50 flex items-center justify-center rounded-full">
            {index + 1}
          </span>
          <span>{product.title || 'Untitled Product'}</span>
        </h3>
        {dropdown}
      </header>

      <div className="flex justify-between space-x-4 mt-5">
        {/* FORM */}
        <div className="w-full rounded-2xl space-y-4">
          {/* TITLE */}
          <label className="block">
            <span className="block text-sm text-gray-500 mb-1">Title</span>
            <input
              type="text"
              className="input"
              value={product.title}
              autoFocus
              onChange={onTitleChange}
            />
            {errors[index]?.title && (
              <span className="text-sm text-red-500 font-medium">
                {errors[index].title}
              </span>
            )}
          </label>
          {/* PRICE */}
          <label className="block">
            <span className="block text-sm text-gray-500 mb-1">Price</span>
            <input
              type="number"
              min={0}
              className="input"
              value={product.price}
              onWheel={() => {}}
              onChange={onPriceChange}
            />
            {errors[index]?.price && (
              <span className="text-sm text-red-500 font-medium">
                {errors[index].price}
              </span>
            )}
          </label>
          <div className="flex space-x-2">
            {/* STOCK */}
            <label className="block w-full">
              <span className="block text-sm text-gray-500 mb-1">Stock</span>
              <input
                type="number"
                min={0}
                className="input"
                value={product.stock}
                onChange={onStockChange}
              />
            </label>

            {/* SUBCATEGORY */}
            {category.subCategories.length ? (
              <label className="block w-full">
                <span className="block text-sm text-gray-500 mb-1">
                  Sub Category
                </span>
                <select
                  className="select w-full p-3 rounded-xl"
                  value={product.subCategory}
                  onChange={onSubCategoryChange}
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
        </div>

        {/* PREVIEW */}
        <div className="w-full">
          <span className="block text-sm text-gray-500 mb-1">Preview</span>

          {/* TODO: refactor, bikin komponen topup sendiri */}
          <div className={'px-4 py-3 border rounded-xl hover:border-green-400'}>
            <div className="flex items-center">
              {category.logoImg && (
                <img
                  src={
                    (product.subCategory
                      ? category.subCategories.find(
                          (c) => c.slug == product.subCategory
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
                {product.title || 'Untitled Product'}
              </p>
              <p className="text-gray-500">
                Rp {Number(product.price).toLocaleString()}
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

      {/* DESCRIPTION */}
      {product.description !== undefined && (
        <label className="block w-full mt-4">
          <span className="block text-sm text-gray-500 mb-1">Description</span>
          <textarea className="w-full border focus:outline-none rounded-xl px-5 py-3 text-gray-600 focus:border-green-400"></textarea>
        </label>
      )}
    </div>
  )
}

export default Product
