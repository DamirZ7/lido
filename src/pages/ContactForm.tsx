import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import CartItemBlock from '../components/CartItem'
import { selectCart } from '../redux/cart/selectors'
import CompletedOrder from '../components/CompletedOrder'
import axios from 'axios'
import styles from './ContactForm.module.scss'
import { useState } from 'react'

enum PaymentEnum {
  Kaspi = 'Безналичная оплата',
  Cash = 'Наличный расчёт',
}
enum DeliveryEnum {
  Lomova = 'ул. Ломова, 183/1',
  Zhusupova = 'ул. М. Жусупа, 272/1',
}
interface IFormInput {
  name: string
  tel: number
  street: string
  house: number | string
  appartment: number
  entrance: number
  floor: number
  payment: PaymentEnum
  comment: string
  delivery: DeliveryEnum
}

// type InOrOutProps = {
//   value: number
//   onChangeCategory: (i: number) => void
// }

const inOrOutOrder = ['Доставка', 'Самовывоз']

const ContactForm = () => {
  const { totalPrice, items } = useSelector(selectCart)
  const [activeIndex, setActiveIndex] = useState(0)

  const onClickInOrOut = (i: number) => {
    setActiveIndex(i)
  }

  // const totalCount = items.reduce((acc: number, rec: any) => acc + rec.count, 0)

  const TOKEN = process.env.REACT_APP_TOKEN
  const CHAT_ID = process.env.REACT_APP_CHAT_ID
  const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    console.log(data)
    const dataNames = [
      'Имя',
      'Номер',
      'Улица',
      'Дом',
      'Квартира',
      'Подъезд',
      'Этаж',
      'Оплата',
      'Примечание',
      'Способ доставки',
    ]

    let tgMessage = `<b>Заявка с сайта!</b>\n`
    tgMessage += `<b>Заказ: </b>${items.map((it) => `<i>${it.title} - ${it.count}шт.\n</i>`)}`
    tgMessage += `<b>Итого к оплате: </b>${totalPrice} тг.\n\n`
    tgMessage += `<b>Контактные данные:</b>\n`
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
        // console.log(res.status)
        // reset()
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  if (isSubmitSuccessful === true) {
    // localStorage.removeItem('cart')
    return <CompletedOrder />
  }

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
        <div className='categories'>
          <ul>
            {inOrOutOrder.map((item, i) => (
              <li
                key={i}
                onClick={() => onClickInOrOut(i)}
                className={activeIndex === i ? 'active' : ''}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {activeIndex === 0 ? (
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
                <label htmlFor='street'>Укажите адрес</label>
                <input type='text' id='street' placeholder='Улица' {...register('street')} />
                <div className={styles.checkout__formStreet}>
                  <input
                    type='text'
                    pattern='[0-9]*'
                    id='house'
                    placeholder='Дом'
                    {...register('house')}
                  />
                  <input
                    type='text'
                    id='appartment'
                    placeholder='Квартира'
                    {...register('appartment')}
                  />
                  <input
                    type='text'
                    id='entrance'
                    placeholder='Подъезд'
                    {...register('entrance')}
                  />
                  <input type='text' id='floor' placeholder='Этаж' {...register('floor')} />
                </div>
                <label htmlFor='payment'>Способ оплаты</label>
                <select {...register('payment')}>
                  <option value={PaymentEnum.Kaspi}>{PaymentEnum.Kaspi}</option>
                  <option value={PaymentEnum.Cash}>{PaymentEnum.Cash}</option>
                </select>
                <label htmlFor='details'>Примечание</label>
                <textarea rows={7} placeholder='Комментарий к заказу' {...register('comment')} />
                <input type='submit' value='Заказать' />
              </form>
            </div>
          </div>
        ) : (
          <div className={styles.checkout__body}>
            <h4>Откуда предпочитаете забрать заказ:</h4>
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

              <div className={styles.radioButtons}>
                <input
                  type='radio'
                  id='delivery'
                  value={DeliveryEnum.Lomova}
                  {...register('delivery', { required: true })}
                />
                <label htmlFor='delivery'>{DeliveryEnum.Lomova}</label>

                <input
                  type='radio'
                  id='delivery'
                  value={DeliveryEnum.Zhusupova}
                  {...register('delivery', { required: true })}
                />
                <label htmlFor='delivery'>
                  {DeliveryEnum.Zhusupova} <br /> (недоступны пиццы и пицца-сеты)
                </label>
              </div>
              <input type='submit' value='Заказать' />
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactForm
