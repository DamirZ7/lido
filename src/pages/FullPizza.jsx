import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza = () => {
  const [pizza, setPizza] = useState()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const { data } = await axios.get(`https://628f0d9a0e69410599d480ad.mockapi.io/items/${id}`)
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пиццы')
        navigate('/')
      }
    }

    fetchPizzas()
  }, [])
  console.log(pizza)

  if (!pizza) {
    return 'Загрузка...'
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='' />
      <h2>{pizza.title}</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam dolor tempora rem porro
        sed. Vero ipsa blanditiis, minus sed tenetur vel autem fuga impedit voluptas accusantium.
        Facere exercitationem quidem fugit?
      </p>
      <h4>{pizza.price}〒</h4>
    </div>
  )
}

export default FullPizza
