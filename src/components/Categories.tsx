import React from 'react'
import { motion } from 'framer-motion'

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
          <motion.li
            key={'cat_' + i}
            onClick={() => onChangeCategory(i)}
            whileTap={{ scale: 0.8 }}
            className={value === i ? 'active' : ''}>
            {catName}
          </motion.li>
        ))}
      </ul>
    </div>
  )
})

export default Categories
