import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import data from '../../utils/data'
import Link from 'next/link'
import Image from 'next/image'
import { Store } from '../../utils/store'

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store)
  const { query } = useRouter()
  const { slug } = query
  const product = data.products.find((x) => x.slug === slug)

  const addToCartHander = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === slug)
    const updatedQuantity = existItem ? existItem.quantity + 1 : 1
    if (product.countInStock < updatedQuantity) {
      alert('Sorry, Product is out of stock')
      return
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: updatedQuantity } })
  }

  if (!product) {
    return <div>Product Not Found</div>
  }
  return (
    <Layout title={product.name}>
      <div className='py-2'>
        <Link href='/'>
          <a> &lt; back to products</a>
        </Link>
      </div>
      <div className='grid md:grid-cols-4 md:gap-2'>
        <div className='md:col-span-2'>
          <Image src={product.image} alt={product.name} width={640} height={640} layout='responsive' />
        </div>
        <div>
          <ul>
            <li>
              <h1 className='text-lg'>{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className='card p-5'>
            <div className='mb-2 flex justify-between'>
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className='mb-2 flex justify-between'>
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</div>
            </div>
            <button className='primary-button w-full' onClick={addToCartHander}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
