import React, { useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import CartItemBlock from '../components/CartItem'
import { selectCart } from '../redux/cart/selectors'
import CompletedOrder from '../components/CompletedOrder'
import axios from 'axios'
import styles from './ContactForm.module.scss'

enum PaymentEnum {
  kaspi = 'Kaspi перевод',
  cash = 'Наличный расчёт',
}
interface IFormInput {
  name: string
  tel: number
  email: string
  street: string
  house: number | string
  appartment: number
  entrance: number
  floor: number
  payment: PaymentEnum
}

const ContactForm = () => {
  const dispatch = useDispatch()
  const { totalPrice, items } = useSelector(selectCart)

  const totalCount = items.reduce((acc: number, rec: any) => acc + rec.count, 0)

  const TOKEN = '5657175590:AAGfqA-G_2e1CCE-Kyhv1Rh-6irc0pjKqNM'
  const CHAT_ID = '-1001154252186'
  const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    console.log(data)
    const dataNames = [
      'Имя',
      'Номер',
      'Почта',
      'Улица',
      'Дом',
      'Квартира',
      'Подъезд',
      'Этаж',
      'Оплата',
    ]

    // const order = dataNames.reduce((acc, rec, index) => ({ ...acc, [rec]: data[index] }), {})
    // console.log(order)

    console.log(items.map((it) => it))

    // tgMessage += `<b>Заказ: </b> ${items.map((it) => [it.title, it.count])}\n`
    // tgMessage += `<b>Имя: </b>${data.name}\n`
    // tgMessage += `<b>Телефон: </b>${data.tel}\n`
    // tgMessage += `<b>Почта: </b>${data.email}\n`
    // tgMessage += `<b>Улица: </b>${data.street}\n`
    // tgMessage += `<b>Дом: </b>${data.house}\n`
    // tgMessage += `<b>Квартира: </b>${data.appartment}\n`
    // tgMessage += `<b>Подъезд: </b>${data.entrance}\n`
    // tgMessage += `<b>Этаж: </b>${data.floor}\n`
    // tgMessage += `<b>Оплата: </b>${data.payment}\n`

    let tgMessage = `<b>Заявка с сайта!</b>\n`
    tgMessage += `<b>Заказ: </b>${items.map((it) => `${it.title} - ${it.count}шт.`)}\n`
    for (let i = 0; i < dataNames.length; i++) {
      tgMessage += `<b>${dataNames[i]}: </b>${Object.values(data)[i]}\n`
    }

    axios
      .post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: tgMessage,
      })
      .then((res) => {
        reset()
      })
      .catch((err) => {
        console.warn(err)
      })
      .finally(() => {
        console.log('Отправлено')
      })
  }

  // if (register.name !== undefined) {
  //   return <CompletedOrder />
  // }

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
            <form
              id='submitForm'
              onSubmit={handleSubmit(onSubmit)}
              className={styles.checkout__form}
              method='POST'>
              <label htmlFor='name'>Укажите имя</label>
              <input
                type='text'
                id='name'
                placeholder='Имя'
                {...register('name', { required: 'Поле обязательно к заполнению' })}
              />
              <div style={{ margin: '5px', color: '#f20202' }}>
                {errors?.name && <p>{errors?.name?.message || 'Ошибка!'}</p>}
              </div>
              <label htmlFor='tel'>Укажите телефон</label>
              <input
                type='text'
                id='phone'
                placeholder='Телефон'
                {...register('tel', {
                  required: {
                    value: true,
                    message: 'Поле обязательно к заполнению',
                  },
                  pattern: {
                    value: /^[0-9+-]+$/,
                    message: 'Допускаются только цифры',
                  },
                  minLength: {
                    value: 10,
                    message: 'Номер телефона слишком короткий',
                  },
                })}
              />
              <div style={{ margin: '5px', color: '#f20202' }}>
                {errors?.tel && <p>{errors?.tel?.message}</p>}
              </div>
              <label htmlFor='email'>Укажите email</label>
              <input type='email' id='email' placeholder='Укажите email' {...register('email')} />
              <label htmlFor='street'>Укажите улицу</label>
              <input type='text' id='street' placeholder='Улица' {...register('street')} />
              <div className={styles.checkout__formStreet}>
                {/* <label htmlFor='house'>Укажите дом</label> */}
                <input
                  type='text'
                  pattern='[0-9]*'
                  id='house'
                  placeholder='Дом'
                  {...register('house')}
                />
                {/* <label htmlFor='appartment'>Укажите квартиру</label> */}
                <input
                  type='text'
                  id='appartment'
                  placeholder='Квартира'
                  {...register('appartment')}
                />
                {/* <label htmlFor='entrance'>Укажите подъезд</label> */}
                <input type='text' id='entrance' placeholder='Подъезд' {...register('entrance')} />
                {/* <label htmlFor='floor'>Укажите этаж</label> */}
                <input type='text' id='floor' placeholder='Этаж' {...register('floor')} />
              </div>
              <label htmlFor='payment'>Способ оплаты</label>
              <select {...register('payment')}>
                <option value='kaspi'>Kaspi перевод</option>
                <option value='cash'>Наличный расчёт</option>
              </select>
              {/* <div style={{ margin: '10px', color: '#f20202' }}>
                {errors?.payment && <p>{errors?.payment?.message || 'Ошибка!'}</p>}
              </div> */}
              <input type='submit' value='Заказать' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
