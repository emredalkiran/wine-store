import { useState } from 'react'
import {
  validateSingleField,
  wineFormValidationSchema
} from '../utils/validation'
import { selectProducts } from '../features/product/product-slice'
import { useSelector } from 'react-redux'
interface FormData {
  formFields: Array<Record<string, any>>
  id: string
}

export function useFormInput({ formFields, id }: FormData) {
  const inputData: Record<string, any> = {}
  const touchedData: Record<string, boolean> = {}
  const errorMessageData: Record<string, string> = {}
  const validationSchema = wineFormValidationSchema
  const initialValues = useSelector(selectProducts)

  formFields.forEach((el: Record<string, any>) => {
    inputData[el.name] = initialValues[id] ? initialValues[id][el.name] : ''
    touchedData[el.name] = false
    errorMessageData[el.name] = ''
  })

  const [inputs, setInputs] = useState<Record<string, any>>(inputData)
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    errorMessageData
  )
  const [touched, setTouched] = useState<Record<string, boolean>>(touchedData)

  const handleInputChange = (fieldName: string, value: string) => {
    if (!touched[fieldName]) {
      setTouched({ ...touched, [fieldName]: true })
    }
    if (fieldName === 'validEAN') {
      const boolVal = value === 'true'
      setInputs({ ...inputs, [fieldName]: boolVal })
    } else {
      setInputs({ ...inputs, [fieldName]: value })
    }
    const fieldErrorStatus = validateSingleField({
      fieldName,
      value: value
    })
    if (!fieldErrorStatus[0]) {
      setErrorMessages({ ...errorMessages, [fieldName]: '' })
    } else if (fieldErrorStatus[0]) {
      setErrorMessages({
        ...errorMessages,
        [fieldName]: fieldErrorStatus[1].message
      })
    }
  }
  const handleInputBlur = (fieldName: string, value: string) => {
    setTouched({ ...touched, [fieldName]: true })

    const fieldErrorStatus = validateSingleField({
      fieldName,
      value: value
    })
    if (!fieldErrorStatus[0]) {
      setErrorMessages({ ...errorMessages, [fieldName]: '' })
    } else if (fieldErrorStatus[0]) {
      setErrorMessages({
        ...errorMessages,
        [fieldName]: fieldErrorStatus[1].message
      })
    }
  }
  const validateForm = async () => {
    const touchAllFields: Record<string, boolean> = {}
    formFields.forEach((el: Record<string, any>) => {
      touchAllFields[el.name] = true
    })
    setTouched(touchAllFields)
    try {
      await validationSchema.validate(inputs, {
        abortEarly: false
      })
      const data: Record<string, string> = {}
      formFields.forEach((el: Record<string, any>) => {
        data[el.name] = inputs[el.name]
      })
      return data
    } catch (err) {
      console.log(err)
      const errorFields: Array<string> = []
      const errors: Record<string, string> = {}
      console.log(err.inner)
      err.inner.forEach((error: { path: string; message: string }) => {
        if (!errorFields.includes(error.path)) {
          errorFields.push(error.path)
          errors[error.path] = error.message
        }
      })
      setErrorMessages({ ...errors })
    }
  }

  return {
    inputs,
    errorMessages,
    touched,
    handleInputChange,
    handleInputBlur,
    validateForm
  }
}
