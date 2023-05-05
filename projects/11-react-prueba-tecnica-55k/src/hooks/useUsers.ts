import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/users'

// 💛 Here we use REACT QUERY
export function useUsers() {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery(['users'], fetchUsers, {
      getNextPageParam: (lastResponse) => lastResponse.nextCursor, // <- 👀 al encontrar 'undefined' (ver función fetchUser()), 'hasNextPage' se pone a false
      refetchOnWindowFocus: false, // <- 👀 no queremos que se refresque la página al volver a la pestaña
      staleTime: 1000 * 5, // <- 👀 5 segundos hasta que los datos se consideran 'stale'
    }) // <- 👀 Primer parámetro: nombre de la query. Segundo parámetro: función que se va a ejecutar para obtener los datos, y que recibe como parámetro el valor de la página anterior. Tercer parámetro: objeto con la función que se va a ejecutar para obtener el valor de la siguiente página. En este caso, la función recibe como parámetro el valor de la llamada anterior, y devuelve el valor de la siguiente página.

  // console.log(data)

  return {
    isLoading,
    isError,
    users: data?.pages.flatMap((page) => page.users) ?? [], // 👀 Caso claro para usar flatMap()
    refetch,
    fetchNextPage,
    hasNextPage,
  }
}
