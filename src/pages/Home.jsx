import React, { useState, useEffect, useContext, useRef } from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Categories from '../components/Categories'
import Sort, { sortArr } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import { SearchContext } from '../App'
import { setCategoryId, setFilters } from '../redux/slices/filterSlice'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { categoryId, sort } = useSelector((state) => state.filter)

  const { searchValue } = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const fetchPizzas = () => {
    setIsLoading(true)

    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    axios
      .get(
        `https://628f0d9a0e69410599d480ad.mockapi.io/items?${category}&sortBy=${sort.sortProperty}&order=desc${search}`,
      )
      .then((response) => {
        setItems(response.data)
        setIsLoading(false)
      })
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    if (!isSearch.current) {
      fetchPizzas()
    }

    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue])

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  const pizzas = items.map((item, i) => <PizzaBlock key={item.id} {...item} />)

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Пиццы</h2>
      <div className='content__items'>{isLoading ? skeleton : pizzas}</div>
    </div>
  )
}

export default Home
