import { ChangeEvent } from 'react'

interface FormInput {
  type: string
  fieldName: string
  errorMessage: string
  touched: boolean
  handleBlur: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void
  inputValue: string
}

export default function formInput({
  type,
  fieldName,
  errorMessage,
  touched,
  handleBlur,
  handleChange,
  inputValue
}: FormInput) {
  return (
    <div className='column is-half'>
      <label id={fieldName} className='label' htmlFor={fieldName}>
        {fieldName}
      </label>
      {type === 'text' && (
        <input
          aria-labelledby={fieldName}
          type={type}
          name={fieldName}
          className={`input ${
            errorMessage !== '' && errorMessage !== undefined && touched
              ? 'is-danger'
              : ''
          }`}
          onBlur={handleBlur}
          onChange={handleChange}
          value={inputValue}
        />
      )}
      {type === 'textarea' && (
        <div className='control'>
          <textarea
            name={fieldName}
            className={`textarea ${
              errorMessage !== '' && errorMessage !== undefined && touched
                ? 'is-danger'
                : ''
            }`}
            placeholder={fieldName}
            onChange={handleChange}
            onBlur={handleBlur}
            value={inputValue}
          ></textarea>
        </div>
      )}
      {type === 'select' && (
        <div className='control'>
          <div
            className={`select ${
              errorMessage !== '' && errorMessage !== undefined && touched
                ? 'is-danger'
                : ''
            }`}
          >
            <select
              name={fieldName}
              onBlur={handleBlur}
              onChange={handleChange}
              value={inputValue === '' ? 1 : inputValue}
            >
              <option key={0} value='1' disabled>
                Select
              </option>
              <option key={1} value='true'>
                true
              </option>
              <option key={2} value='false'>
                false
              </option>
            </select>
          </div>
        </div>
      )}

      {errorMessage !== '' && touched ? (
        <div className='has-text-danger'>{errorMessage}</div>
      ) : (
        ''
      )}
    </div>
  )
}
