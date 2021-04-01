import { MouseEvent, TouchEvent, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch } from '../../store'
import { deleteProduct } from '../../features/product/product-slice'
import Form from '../Form'
import {
  faChevronRight,
  faChevronDown,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
interface ProductItemProps {
  title: string
  id: string
}

function ProductItem({ title, id }: ProductItemProps) {
  const [isOpen, setOpen] = useState(false)
  const dispatch = useAppDispatch()

  const handleDropDownClick = () => {
    setOpen((prevState) => !prevState)
  }

  const handleDeleteClick = async (e: MouseEvent | TouchEvent) => {
    const result = await dispatch(deleteProduct({ id }))
  }
  return (
    <>
      <div
        className='card p-4 mt-4 mb-4 is-flex is-justify-content-space-between'
        data-name='item'
      >
        <div className='is-flex'>
          <div className='is-clickable' style={{ width: '20px' }}>
            <FontAwesomeIcon
              color='blue'
              icon={isOpen ? faChevronDown : faChevronRight}
              onClick={handleDropDownClick}
            />
          </div>

          <span className='pl-4 is-unselectable'>{title}</span>
        </div>
        <div className='is-clickable' onClick={handleDeleteClick}>
          <FontAwesomeIcon color='red' icon={faTrashAlt} />
        </div>
      </div>
      {isOpen && <Form id={id} close={handleDropDownClick} />}
    </>
  )
}

export default ProductItem
