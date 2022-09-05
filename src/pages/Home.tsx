import React, { useCallback, useEffect, useRef } from 'react'
import qs from 'qs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Categories from '../components/Categories'
import Sort, { sortArr } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import { category } from '../components/Categories'

import { useAppDispatch } from '../redux/store'
import { selectFilter } from '../redux/filter/selectors'
import { setCategoryId, setFilters } from '../redux/filter/slice'
import { selectPizzaData } from '../redux/pizza/selectors'
import { fetchPizzas } from '../redux/pizza/asyncActions'
import { SearchPizzaParams } from '../redux/pizza/types'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  // import('../utils/math').then((math) => {
  //   console.log(math.add(777, 888))
  // })

  const { categoryId, sort, searchValue } = useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaData)

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [])

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''
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

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, searchValue])

  //  Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
      const sort = sortArr.find((obj) => obj.sortProperty === params.sortBy)

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          sort: sort || sortArr[0],
        }),
      )
      isSearch.current = true
    }
  }, [])

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false
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
