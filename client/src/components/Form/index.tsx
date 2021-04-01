import { ChangeEvent, MouseEvent, TouchEvent } from 'react'
import FormInput from './form-input'
import { useAppDispatch } from '../../store'
import { useFormInput } from '../../hooks'
import {
  addProduct,
  selectIsSaving,
  selectProducts,
  updateProduct
} from '../../features/product/product-slice'
import { useSelector } from 'react-redux'
import { getDiff } from '../../utils'
import { wineFormUpdateValidationSchema } from '../../utils/validation'

interface FormProps {
  id: string
  handleAdd?: () => void
  close?: () => void
}

function Form({ id, handleAdd, close }: FormProps) {
  const formFields = [
    { name: 'country', type: 'text' },
    { name: 'region', type: 'text' },
    { name: 'lage', type: 'text' },
    { name: 'sweetness', type: 'text' },
    { name: 'sugarLevel', type: 'text' },
    { name: 'wineType', type: 'text' },
    { name: 'wineColor', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'alcoholLevel', type: 'text' },
    { name: 'vintage', type: 'text' },
    { name: 'validEAN', type: 'select' },
    { name: 'acidity', type: 'text' },
    { name: 'winery', type: 'text' },
    { name: 'grape', type: 'text' },
    { name: 'appellation', type: 'text' }
  ]

  const dispatch = useAppDispatch()
  const {
    inputs,
    touched,
    errorMessages,
    handleInputChange,
    handleInputBlur,
    validateForm
  } = useFormInput({ formFields, id })
  const originalData = useSelector(selectProducts)[id]
  const isSaving = useSelector(selectIsSaving)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    handleInputChange(e.currentTarget.name, e.currentTarget.value)
  }

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    handleInputBlur(e.currentTarget.name, e.currentTarget.value)
  }

  const handleSave = async (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    const data = await validateForm()
    if (data) {
      if (id === 'newadd') {
        const result = await dispatch(addProduct({ data }))

        if (result.payload.success) {
          if (typeof handleAdd === 'function') handleAdd()
        }
      } else {
        const diff = getDiff({ data, originalData })
        if (Object.keys(diff).length < 2) {
          if (typeof close === 'function') close()
          return
        }
        const updateData = await wineFormUpdateValidationSchema.validate(diff)
        const result = await dispatch(updateProduct({ updateData }))

        if (result.payload.success) {
          if (typeof close === 'function') close()
        }
      }
    }
  }

  return (
    <form>
      <div className='columns is-multiline'>
        {formFields.map((el) => {
          return (
            <FormInput
              key={el.name}
              type={el.type}
              fieldName={el.name}
              errorMessage={errorMessages[el.name]}
              touched={touched[el.name]}
              handleBlur={(
                e: ChangeEvent<
                  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                >
              ) => handleBlur(e)}
              handleChange={(
                e: ChangeEvent<
                  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                >
              ) => handleChange(e)}
              inputValue={inputs[el.name]}
            />
          )
        })}
      </div>
      <div className='is-flex is-justify-content-flex-end'>
        <button className='button is-danger mr-2'>Discard Changes</button>
        <button
          onClick={handleSave}
          className='button is-primary ml-2'
          disabled={isSaving}
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default Form
