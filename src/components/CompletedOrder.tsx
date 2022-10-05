import { Link } from 'react-router-dom'
import ordered from '../assets/img/ordered.jpeg'

const CompletedOrder = () => {
  return (
    <>
      <div className='cart cart--empty'>
        <h2>
          Спасибо за ваш заказ! <span>😊</span>
        </h2>
        <p>
          Наш оператор свяжется с вами в течении нескольких минут для подтверждения заказа <br />
          Для того, чтобы совершить новый заказ, перейдите на главную страницу.
        </p>
        <img src={ordered} alt='Empty cart' />
        <Link to='/' className='button button--black'>
          <span>Вернуться на главную</span>
        </Link>
      </div>
    </>
  )
}

export default CompletedOrder
