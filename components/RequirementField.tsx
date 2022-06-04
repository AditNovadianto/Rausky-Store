import cn from 'classnames'
import { useStateMachine } from 'little-state-machine'
import { useEffect, useRef } from 'react'
import { editRequirement } from '../lib/cartHandler'
import request from '../lib/request'

interface Props {
  field: CustomObject
  categorySlug: string
  user?: CustomObject
  error?: string
}
const RequirementField = ({ field, categorySlug, user, error }: Props) => {
  const { state, actions } = useStateMachine({
    editRequirement,
    setUpdatingDB: (state, value) => {
      return { ...state, updatingDB: value }
    },
    setUpdatedDB: (state, value) => {
      return { ...state, updatedDB: value }
    },
  })
  const { order } = state
  const requirement = order.requirements[categorySlug]
  const fieldValue = requirement?.[field.value]

  const handleRequirement = (e, field) => {
    const { value: fieldName } = field
    actions.editRequirement({
      fieldName,
      fieldValue: e.target.value,
      categorySlug,
    })
    updateUserRequirement(e.target.value)
  }

  const debounce = useRef<NodeJS.Timeout>()
  const updateUserRequirement = async (fieldValue) => {
    if (!user) return
    actions.setUpdatingDB(true)
    actions.setUpdatedDB(false)
    clearTimeout(debounce.current)
    debounce.current = setTimeout(async () => {
      try {
        await request.put(`/requirements/${field.value}`, { fieldValue })
      } catch (err) {
        console.log(err)
      } finally {
        actions.setUpdatingDB(false)
        actions.setUpdatedDB(true)
      }
    }, 500)
  }

  useEffect(() => {
    actions.setUpdatedDB(false)
    actions.setUpdatingDB(false)
  }, [])

  return (
    <div className="w-full">
      <input
        className={cn(
          'block w-full px-5 py-3 rounded-xl border focus:outline-none',
          error
            ? 'border-red-300 focus:border-red-400'
            : 'border-gray-300 focus:border-green-400'
        )}
        placeholder={field.placeholder}
        type={field.type}
        value={fieldValue ?? ''}
        onWheel={(e) => (e.target as HTMLInputElement).blur()}
        onChange={(e) => handleRequirement(e, field)}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 font-medium">{error}</p>
      )}
    </div>
  )
}

export default RequirementField
