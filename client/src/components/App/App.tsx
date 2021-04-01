import React, { useEffect, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store'
import Navbar from '../Navbar'
import Content from '../Content'
import ProductItem from '../ProductItem'
import Form from '../Form'
import {
  selectProducts,
  getProducts
} from '../../features/product/product-slice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './main.css'

function App() {
  const dispatch = useAppDispatch()
  const items = useSelector(selectProducts)
  const [showNewAdd, setShowNewAdd] = useState(false)
  const handleNewAddClick = () => {
    setShowNewAdd((prevState) => !prevState)
  }
  const getProductsData = useCallback(async () => {
    await dispatch(getProducts())
  }, [dispatch])

  useEffect(() => {
    getProductsData()
  }, [getProductsData])

  return (
    <div>
      <Navbar />
      <Content>
        {Object.keys(items)?.map((item) => {
          return <ProductItem key={item} id={item} title={items[item].title} />
        })}
        {showNewAdd && <Form id={'newadd'} handleAdd={handleNewAddClick} />}
        <div className='is-flex is-justify-content-center'>
          <button
            onClick={handleNewAddClick}
            className={`button ${
              showNewAdd ? 'is-danger' : 'is-success'
            } circle-button`}
          >
            <FontAwesomeIcon
              color='wite'
              icon={showNewAdd ? faMinus : faPlus}
            />
          </button>
        </div>
      </Content>
    </div>
  )
}

export default App
