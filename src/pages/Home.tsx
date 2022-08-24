import React, { useEffect, useRef } from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Categories from '../components/Categories'
import Sort, { sortArr } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import { category } from '../components/Categories'

import { selectFilter, setCategoryId, setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { categoryId, sort, searchValue } = useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaData)

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id))
  }

  const getPizzas = async () => {
    // setIsLoading(true)

    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(
      //@ts-ignore
      fetchPizzas({
        category,
        search,
        sort,
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
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortArr.find((obj) => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      )
      isSearch.current = true
    }
  }, [])

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth',
    // })

    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue])

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  const pizzas = items.map((item: any, i: string) => <PizzaBlock key={i} {...item} />)
  // const pizza_set = items.map((item, i) =>
  //   item.category === 2 ? <PizzaBlock key={i} {...item} /> : '',
  // )
  // const burgers = items.map((item, i) =>
  //   item.category === 3 ? <PizzaBlock key={i} {...item} /> : '',
  // )
  // const combo_burgers = items.map((item, i) =>
  //   item.category === 4 ? <PizzaBlock key={i} {...item} /> : '',
  // )
  // const doners = items.map((item, i) =>
  //   item.category === 5 ? <PizzaBlock key={i} {...item} /> : '',
  // )
  // const snacks = items.map((item, i) =>
  //   item.category === 6 ? <PizzaBlock key={i} {...item} /> : '',
  // )
  // const sauces = items.map((item, i) =>
  //   item.category === 7 ? <PizzaBlock key={i} {...item} /> : '',
  // )
  // const drinks = items.map((item, i) =>
  //   item.category === 8 ? <PizzaBlock key={i} {...item} /> : '',
  // )

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        {/* <Sort /> */}
      </div>
      <h2 className='content__title'>{category[1]}</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😢</h2>
          <p>
            К сожалению, не удалось получить пиццы и бургеры. Попробуйте повторить попытку позднее.
          </p>
        </div>
      ) : (
        <section className='content__items'>{status === 'loading' ? skeleton : pizzas}</section>
      )}
      {/* <h2 className='content__title'>{category[2]}</h2>
      <section className='content__items'>{status === 'loading' ? skeleton : pizza_set}</section>
      <h2 className='content__title'>{category[3]}</h2>
      <section className='content__items'>{status === 'loading' ? skeleton : burgers}</section>
      <h2 className='content__title'>{category[4]}</h2>
      <section className='content__items'>
        {status === 'loading' ? skeleton : combo_burgers}
      </section>
      <h2 className='content__title'>{category[5]}</h2>
      <section className='content__items'>{status === 'loading' ? skeleton : doners}</section>
      <h2 className='content__title'>{category[6]}</h2>
      <section className='content__items'>{status === 'loading' ? skeleton : snacks}</section>
      <h2 className='content__title'>{category[7]}</h2>
      <section className='content__items'>{status === 'loading' ? skeleton : sauces}</section>
      <h2 className='content__title'>{category[8]}</h2>
      <section className='content__items'>{status === 'loading' ? skeleton : drinks}</section> */}
    </div>
  )
}

export default Home
