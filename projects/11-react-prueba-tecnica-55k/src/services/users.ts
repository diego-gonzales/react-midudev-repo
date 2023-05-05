import { type APIResponse } from '../types.d'

export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const url = `https://randomuser.me/api?results=10&seed=55k&page=${pageParam}`

  return await fetch(url)
    .then(async (response) => {
      if (!response.ok) throw new Error('Error fetching users')
      return await response.json()
    })
    .then((data: APIResponse) => {
      const currentPage = data.info.page
      const nextCursor = currentPage > 3 ? undefined : currentPage + 1

      return {
        users: data.results,
        nextCursor,
      }
    })
}
