import React from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import CartItemBlock from '../components/CartItem'
import { selectCart } from '../redux/cart/selectors'

import styles from './ContactForm.module.scss'

interface IFormInput {
  name: string
  tel: number
  email: string
  street: string
  house: number | string
  appartment: number
  entrance: number
  floor: number
}

const ContactForm = () => {
  const dispatch = useDispatch()
  const { totalPrice, items } = useSelector(selectCart)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  // firstName and lastName will have correct type

  return (
    <div className={styles.checkout}>
      <div className={styles.checkout__orderMain}>
        <h4>Ваш заказ</h4>
        <div className={styles.checkout__order}>
          {items.map((item) => (
            <CartItemBlock key={item.id} {...item} />
          ))}
        </div>
        <div className={styles.cartBottom}>
          <div className={styles.cartBottom__details}>
            <span>
              Итого к оплате: <b>{totalPrice} ₸</b>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.checkout__contentInput}>
        <div className={styles.checkout__header}>
          <h4>Оформление заказа</h4>
        </div>
        <div className={styles.checkout__body}>
          <h4>Укажите адрес доставки</h4>
          <div className='form-row'>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.checkout__form}>
              <div className={styles.checkout__form__input}>
                <label htmlFor='name'>Укажите имя</label>
                <input type='text' id='name' placeholder='Укажите имя' {...register('name')} />
              </div>
              <div className={styles.checkout__form__input}>
                <label htmlFor='tel'>Укажите телефон</label>
                <input
                  type='text'
                  pattern='[0-9]*'
                  id='phone'
                  placeholder='Укажите телефон'
                  {...register('tel')}
                />
              </div>
              <div className={styles.checkout__form__input}>
                <label htmlFor='email'>Укажите email</label>
                <input type='email' id='email' placeholder='Укажите email' {...register('email')} />
              </div>
              <div className={styles.checkout__form__input}>
                <label htmlFor='street'>Укажите улицу</label>
                <input
                  type='text'
                  id='street'
                  placeholder='Укажите улицу'
                  {...register('street')}
                />
              </div>
              <div className={styles.checkout__form__input}>
                <label htmlFor='house'>Укажите дом</label>
                <input
                  type='text'
                  pattern='[0-9]*'
                  id='house'
                  placeholder='Укажите дом'
                  {...register('house')}
                />
              </div>
              <div className={styles.checkout__form__input}>
                <label htmlFor='appartment'>Укажите квартиру</label>
                <input
                  type='text'
                  id='appartment'
                  placeholder='Укажите квартиру'
                  {...register('appartment')}
                />
              </div>
              <div className={styles.checkout__form__input}>
                <label htmlFor='entrance'>Укажите подъезд</label>
                <input
                  type='text'
                  id='entrance'
                  placeholder='Укажите подъезд'
                  {...register('entrance')}
                />
              </div>
              <div className={styles.checkout__form__input}>
                <label htmlFor='floor'>Укажите этаж</label>
                <input type='text' id='floor' placeholder='Укажите этаж' {...register('floor')} />
              </div>
              <input type='submit' value='Заказать' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
