const Joi = require('joi')

export const productSchema = Joi.object({
  country: Joi.string().required().min(2),
  region: Joi.string().required().min(2),
  lage: Joi.string().required().min(2),
  sweetness: Joi.string().required().min(2),
  sugarLevel: Joi.string().required().min(2).max(4),
  wineType: Joi.string().required().min(2),
  wineColor: Joi.string().required().min(2),
  title: Joi.string().required().min(2),
  description: Joi.string().required().min(2),
  alcoholLevel: Joi.string().required().min(2).max(4),
  vintage: Joi.number().required().min(1900).max(new Date().getFullYear()),
  validEAN: Joi.boolean().required(),
  acidity: Joi.string().required().min(2).max(4),
  winery: Joi.string().required().min(2),
  grape: Joi.string().required().min(2),
  appellation: Joi.string().required().min(2)
})

export const productUpdateSchema = Joi.object({
  _id: Joi.string().required().min(5),
  country: Joi.string().optional().min(2),
  region: Joi.string().optional().min(2),
  lage: Joi.string().optional().min(2),
  sweetness: Joi.string().optional().min(2),
  sugarLevel: Joi.number().optional().min(0).max(100),
  wineType: Joi.string().optional().min(2),
  wineColor: Joi.string().optional().min(2),
  title: Joi.string().optional().min(2),
  description: Joi.string().optional().min(2),
  alcoholLevel: Joi.number().optional().min(0).max(100),
  vintage: Joi.number().optional().min(1900).max(new Date().getFullYear()),
  validEAN: Joi.boolean().optional(),
  acidity: Joi.number().optional().min(0).max(100),
  winery: Joi.string().optional().min(2),
  grape: Joi.string().optional().min(2),
  appellation: Joi.string().optional().min(2)
})

export function validateFieldNames(fieldNames: Record<string, any>): boolean {
  const formFields = [
    'country',
    'region',
    'lage',
    'sweetness',
    'sugarLevel',
    'wineType',
    'wineColor',
    'title',
    'description',
    'alcoholLevel',
    'vintage',
    'validEAN',
    'acidity',
    'winery',
    'grape',
    'appellation'
  ]

  if (!fieldNames || Object.keys(fieldNames).length < 2) return false
  Object.keys(fieldNames).forEach((field: string) => {
    if (formFields.indexOf(field) < 0) return false
  })
  return true
}
