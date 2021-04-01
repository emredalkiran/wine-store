export function getDiff({
  data,
  originalData
}: {
  data: Record<string, any>
  originalData: Record<string, any>
}) {
  const result: Record<string, any> = {}
  result._id = originalData._id
  Object.keys(data).forEach((key) => {
    if (data[key] !== originalData[key]) result[key] = data[key]
  })
  return result
}
