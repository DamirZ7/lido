import React from 'react'

const Categories = ({ value, onChangeCategory }) => {
  const category = ['Все', 'Пиццы', 'Бургеры', 'Донеры', 'Снеки', 'Соусы', 'Напитки']

  return (
    <div className='categories'>
      <ul>
        {category.map((catName, i) => (
          <li
            key={'cat_' + i}
            onClick={() => onChangeCategory(i)}
            className={value === i ? 'active' : ''}>
            {catName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
