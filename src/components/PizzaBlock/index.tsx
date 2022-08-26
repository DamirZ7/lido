import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addItem, CartItem, minusItem, selectCartItemById } from '../../redux/slices/cartSlice'
import { Link } from 'react-router-dom'

type PizzaBlockProps = {
  id: string
  title: string
  price: number
  count: number
  imageUrl: string
  sizes: number[]
  types: string[]
  description: string
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
  description,
}) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))
  const typeNames = ['тонкое', 'традиционное']
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)

  const addedCount = cartItem ? cartItem.count : 0

  // const onClickAddCounter = () => {
  //   setCounter(counter + 1)
  // }

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      description,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    }
    dispatch(addItem(item))
  }
  const onClickMinus = () => {
    dispatch(minusItem(id))
  }

  return (
    <article className='pizza-block-wrapper'>
      <div className='pizza-block'>
        <Link key={id} to={`/pizza/${id}`}>
          <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
        </Link>
        <h4 className='pizza-block__title'>{title}</h4>
        <div className='pizza-block__selector'>
          {/* <ul>
            {types.map((type, i) => (
              <li
                key={i}
                onClick={() => setActiveType(type)}
                className={activeType === i ? 'active' : ''}>
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={'size_' + i}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? 'active' : ''}>
                {size} см.
              </li>
            ))}
          </ul> */}

          <span className='pizza-block__text'>{description === '' ? title : description}</span>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>{price} ₸</div>
          {addedCount === 0 ? (
            <button onClick={onClickAdd} className='button button--outline button--add'>
              {/* <svg
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                  fill='white'
                />
              </svg> */}
              <span>Добавить</span>
              {/* <i>{addedCount}</i> */}
            </button>
          ) : (
            <div className='pizza-block__quantityButtons'>
              <button
                onClick={onClickMinus}
                className='button button--outline button--circle cart__item-count-minus'>
                <svg
                  width='10'
                  height='10'
                  viewBox='0 0 10 10'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                    fill='#EB5A1E'></path>
                  <path
                    d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                    fill='#EB5A1E'></path>
                </svg>
              </button>
              <b>{addedCount}</b>
              <button
                onClick={onClickAdd}
                className='button button--outline button--circle cart__item-count-plus'>
                <svg
                  width='10'
                  height='10'
                  viewBox='0 0 10 10'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                    fill='#EB5A1E'></path>
                  <path
                    d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                    fill='#EB5A1E'></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default PizzaBlock
