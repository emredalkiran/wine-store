import { ReactNode } from 'react'

function Content({ children }: { children: ReactNode }) {
  const isProductsLoading = false
  return (
    <div className='p-6'>
      <h2 className='has-text-centered is-size-2 has-text-weight-bold p-4'>
        Wine List
      </h2>
      <div className='columns'>
        <div className='column is-half is-offset-one-quarter'>
          <div className='full-width'>
            {isProductsLoading ? (
              <h3 className='has-text-centered is-size-4 has-text-weight-bold p-4'>
                Loading...
              </h3>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Content
