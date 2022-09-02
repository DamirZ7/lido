export enum sortPropertyEnum {
  RATING = 'rating',
  TITLE = 'title',
  PRICE = 'price',
}

export type Sort = {
  name: string
  sortProperty: sortPropertyEnum
}

export interface FilterSliceState {
  searchValue: string
  categoryId: number
  sort: Sort
}
