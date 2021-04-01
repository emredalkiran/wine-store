import * as Yup from 'yup'

interface SingleFieldValidation {
  fieldName: string
  value: string
}

export const wineFormValidationSchema = Yup.object().shape({
  country: Yup.string()
    .required('Please enter the country name')
    .min(2, 'The country name should contain at least 2 characters'),
  region: Yup.string()
    .required('Please enter the region name')
    .min(2, 'The region name should contain at least 2 characters'),
  lage: Yup.string()
    .required('Please enter lage')
    .min(2, 'The lage should contain at least 2 characters'),
  sweetness: Yup.string()
    .required('Please enter sweetness')
    .min(2, 'The sweetness should contain at least 2 characters'),
  sugarLevel: Yup.number()
    .required('Please enter sugar level')
    .min(0, 'Please enter a value between 0 and 100')
    .max(100, 'Please enter a value between 0 and 100'),
  wineType: Yup.string()
    .required('Please enter the wine type')
    .min(2, 'The wine type should contain at least 2 characters'),
  wineColor: Yup.string()
    .required('Please enter the wine color')
    .min(2, 'The wine color should contain at least 2 characters'),
  title: Yup.string()
    .required('Please enter the title')
    .min(2, 'The title should contain at least 2 characters'),
  description: Yup.string()
    .required('Please enter the description')
    .min(2, 'The title should contain at least 2 characters'),
  alcoholLevel: Yup.number()
    .required('Please enter alcohol level')
    .min(0, 'Please enter a value between 0 and 100')
    .max(100, 'Please enter a value between 0 and 100'),
  vintage: Yup.number()
    .required('Please enter the year')
    .min(1900, 'Please enter a year after 1900')
    .max(new Date().getFullYear(), 'Please enter a valid year'),
  validEAN: Yup.bool().required('Please select valid EAN'),
  acidity: Yup.number()
    .required('Please enter acidity level')
    .min(0, 'Please enter a value between 0 and 100')
    .max(100, 'Please enter a value between 0 and 100'),
  winery: Yup.string()
    .required('Please enter the winery name')
    .min(2, 'The winery name should contain at least 2 characters'),
  grape: Yup.string()
    .required('Please enter the grape name')
    .min(2, 'The grape name should contain at least 2 characters'),
  appellation: Yup.string()
    .required('Please enter the appellation')
    .min(2, 'The appellation should contain at least 2 characters')
})

export const wineFormUpdateValidationSchema = Yup.object().shape({
  _id: Yup.string().required().min(5),
  country: Yup.string()
    .optional()
    .min(2, 'The country name should contain at least 2 characters'),
  region: Yup.string()
    .optional()
    .min(2, 'The region name should contain at least 2 characters'),
  lage: Yup.string()
    .optional()
    .min(2, 'The lage should contain at least 2 characters'),
  sweetness: Yup.string()
    .optional()
    .min(2, 'The sweetness should contain at least 2 characters'),
  sugarLevel: Yup.number()
    .optional()
    .min(0, 'Please enter a value between 0 and 100')
    .max(100, 'Please enter a value between 0 and 100'),
  wineType: Yup.string()
    .optional()
    .min(2, 'The wine type should contain at least 2 characters'),
  wineColor: Yup.string()
    .optional()
    .min(2, 'The wine color should contain at least 2 characters'),
  title: Yup.string()
    .optional()
    .min(2, 'The title should contain at least 2 characters'),
  description: Yup.string()
    .optional()
    .min(2, 'The title should contain at least 2 characters'),
  alcoholLevel: Yup.number()
    .optional()
    .min(0, 'Please enter a value between 0 and 100')
    .max(100, 'Please enter a value between 0 and 100'),
  vintage: Yup.number()
    .optional()
    .min(1900, 'Please enter a year after 1900')
    .max(new Date().getFullYear(), 'Please enter a valid year'),
  validEAN: Yup.bool().optional(),
  acidity: Yup.number()
    .optional()
    .min(0, 'Please enter a value between 0 and 100')
    .max(100, 'Please enter a value between 0 and 100'),
  winery: Yup.string()
    .optional()
    .min(2, 'The winery name should contain at least 2 characters'),
  grape: Yup.string()
    .optional()
    .min(2, 'The grape name should contain at least 2 characters'),
  appellation: Yup.string()
    .optional()
    .min(2, 'The appellation should contain at least 2 characters')
})

export const validateSingleField = ({
  fieldName,
  value
}: SingleFieldValidation) => {
  const schema = wineFormValidationSchema
  try {
    return [false, Yup.reach(schema, fieldName).validateSync(value)]
  } catch (err) {
    return [true, err]
  }
}
