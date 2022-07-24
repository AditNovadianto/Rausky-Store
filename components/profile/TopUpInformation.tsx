import { CheckIcon, CloudUploadIcon } from '@heroicons/react/outline'
import { useStateMachine } from 'little-state-machine'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import useGetRequest from '../../hooks/useGetRequest'
import RequirementField from '../RequirementField'
import TopupRequirements from '../topup/TopupRequirements'

const TopUpInformation = ({ user }) => {
  const { data: data1, loading: loading1 } = useGetRequest(
    '/categories?select=name,slug&topupOnly=true&hasRequirementOnly=true'
  )

  const [selectedCategory, setselectedCategory] = useState('')
  const { data: data2, loading: loading2 } = useGetRequest(
    `/categories/${selectedCategory}`
  )

  const { state } = useStateMachine()
  const { updatedDB, updatingDB } = state

  useEffect(() => {
    if (data1) {
      const { categories } = data1
      setselectedCategory(categories[0].slug)
    }
  }, [data1])

  if (loading1 || loading2) {
    return (
      <div>
        <div className="flex space-x-5">
          <Skeleton containerClassName="w-full" height={50} borderRadius={12} />
          <Skeleton containerClassName="w-full" height={50} borderRadius={12} />
        </div>
        <div className="mt-4">
          <Skeleton height={80} borderRadius={12} />
        </div>
        <div className="mt-5">
          <Skeleton height={120} borderRadius={12} />
        </div>
      </div>
    )
  }

  const { categories } = data1
  const { category } = data2

  console.log(category)

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col justify-between items-start md:flex-row md:items-center">
        <div className="flex items-center">
          <img
            src={category?.logoImg}
            alt={category?.slug}
            className="w-[35px] h-[35px] rounded-xl object-cover mr-3"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setselectedCategory(e.target.value)}
            className="select w-full md:w-auto"
          >
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="font-bold">
          {updatingDB && (
            <div className="flex text-xs items-center font-normal text-green-500">
              <CloudUploadIcon className="w-4 h-4 mr-1" /> saving
            </div>
          )}
          {updatedDB && (
            <div className="flex text-xs items-center font-normal text-green-500">
              <CheckIcon className="w-4 h-4 mr-1" /> saved
            </div>
          )}
        </div>
      </div>

      {/* FORM */}
      <div>
        <form className="mt-5 lg:flex-row flex-col flex space-x-0 lg:space-x-3 space-y-3 lg:space-y-0">
          {category?.requirement.fields.map((field) => (
            <RequirementField
              key={field.id}
              field={field}
              categorySlug={category.slug}
              user={user}
            />
          ))}
        </form>
        <TopupRequirements category={category} isOpen={true} />
      </div>
    </div>
  )
}

export default TopUpInformation
