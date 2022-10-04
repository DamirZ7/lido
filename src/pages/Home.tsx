import React, { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import { category } from '../components/Categories'

import { useAppDispatch } from '../redux/store'
import { selectFilter } from '../redux/filter/selectors'
import { setCategoryId, setFilters } from '../redux/filter/slice'
import { selectPizzaData } from '../redux/pizza/selectors'
import { fetchPizzas } from '../redux/pizza/asyncActions'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { categoryId, sort, searchValue } = useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaData)

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [])

  const getPizzas = async () => {
    const category = categoryId > 0 ? String(categoryId) : ''
    const search = searchValue
    const sortBy = sort.sortProperty

    dispatch(
      fetchPizzas({
        category,
        search,
        sortBy,
      }),
    )
    window.scrollTo(0, 0)
  }
  useEffect(() => {
    getPizzas()
  }, [categoryId, sort.sortProperty, searchValue])

  const pizzas = items.map((item: any) => <PizzaBlock key={item.id} {...item} />)
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        {/* <Sort value={sort} /> */}
      </div>
      <h2 className='content__title'>{category[categoryId]}</h2>
      {status === 'failed' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😢</h2>
          <p>
            К сожалению, не удалось получить пиццы и бургеры. Попробуйте повторить попытку позднее.
          </p>
        </div>
      ) : (
        <section className='content__items'>{status === 'loading' ? skeleton : pizzas}</section>
      )}
    </div>
  )
}

export default Home
