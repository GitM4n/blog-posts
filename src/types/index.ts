export type Post = {
  id: string
  createdAt: string
  name: string
  avatar: string
  text: string
  title: string
}

export type PostParameters = {
  searchQuery?: string
  page?: number
  limit?: number
  sortBy?: string,
  order?:'asc' | 'desc',
}
