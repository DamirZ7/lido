import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
    description: string
  }>()
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

  if (!pizza) {
    return <>Загрузка...</>
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='' />
      <h2>{pizza.title}</h2>
      <p>{pizza.description}</p>
      <h4>{pizza.price}〒</h4>
    </div>
  )
}

export default FullPizza
