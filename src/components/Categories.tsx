import React from 'react'

export const category = [
  'Все',
  'Пиццы',
  'Пицца сеты',
  'Бургеры',
  'Комбо бургеры',
  'Донеры',
  'Снеки',
  'Соусы',
  'Напитки',
]

type CategoriesProps = {
  value: number
  onChangeCategory: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
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
})

export default Categories
