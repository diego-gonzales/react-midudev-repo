import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [isColoringTable, setIsColoringTable] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [countryFilter, setCountryFilter] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])
  /* NOTA SUPER IMPORTANTE ✅: useRef() sirve para guardar un valor que queremos que se comparta entre renderizados (por más que cambien estados siempre se va a preservar lo que guardamos en su momento). Es muy parecido a un useState pero con 2 diferencias claves: 
    1️⃣ Cada vez que un ref cambia, no se vuelve a renderizar el componente
    2️⃣ Para acceder al valor de un ref, tenemos que usar la propiedad .current (ej: originalUsers.current)

    (Ver https://www.twitch.tv/videos/1792623213 por el min 1:12:00 en adelante)
  */
  /* Es por eso que lo usamos en lugar de crear un nuevo estado */

  const toggleColoringTable = () => {
    setIsColoringTable(!isColoringTable)
  }

  const toggleSortingByCountry = () => {
    const newSortingValue =
      sorting !== SortBy.COUNTRY ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDeleteUser = (uuid: string) => {
    const newUsers = users.filter((user) => user.login.uuid !== uuid)
    setUsers(newUsers)
  }

  const handleResetUsers = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSorting = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    const url = 'https://randomuser.me/api?results=100'
    fetch(url)
      .then(async (response) => await response.json())
      .then((data) => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // 🔆 Forma hecha en el vídeo de Midudev
  // const filteredUsers = useMemo(() => {
  //   console.log('calling filteredUsers')
  //   return countryFilter !== null && countryFilter.length > 0
  //     ? users.filter((user) =>
  //         user.location.country
  //           .toLowerCase()
  //           .includes(countryFilter.toLowerCase())
  //       )
  //     : users
  // }, [users, countryFilter])

  // const sortedUsers = useMemo(() => {
  //   console.log('calling sortedUsers')

  //   if (sorting === SortBy.NONE) return filteredUsers

  //   /* Lo siguiente también lo pudimos haber hecho con un 'switch', con 'if/else',
  //   con un 'let sortedFn = (a: User, b: User) => a.location.country.localCompare(b.location.country) y un if', etc. */

  //   // Esto es simplemente un objeto tipado: { [key: string]: (user: User) => any }
  //   const compareProperties: Record<string, (user: User) => any> = {
  //     [SortBy.COUNTRY]: (user) => user.location.country,
  //     [SortBy.NAME]: (user) => user.name.first,
  //     [SortBy.LASTNAME]: (user) => user.name.last,
  //   }

  //   return filteredUsers.toSorted((a, b) => {
  //     const extractProperty = compareProperties[sorting]
  //     return extractProperty(a).localeCompare(extractProperty(b))
  //   })
  // }, [filteredUsers, sorting])

  // 🔆 Hice esta pequeña refactorización para que se cumpla con el criterio 9 de la prueba (Ver README.md)
  const sortedUsers = useMemo(() => {
    console.log('calling sortedUsers')

    if (sorting === SortBy.NONE) return users

    const compareProperties = {
      [SortBy.COUNTRY]: (user: User) => user.location.country,
      [SortBy.NAME]: (user: User) => user.name.first,
      [SortBy.LASTNAME]: (user: User) => user.name.last,
    }

    return users.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [users, sorting])

  const filteredUsers = useMemo(() => {
    console.log('calling filteredUsers')
    return countryFilter !== null && countryFilter.length > 0
      ? sortedUsers.filter((user) =>
          user.location.country
            .toLowerCase()
            .includes(countryFilter.toLowerCase())
        )
      : sortedUsers
  }, [sortedUsers, countryFilter])

  return (
    <>
      <header>
        <h1>Prueba técnica 55k</h1>
        <div>
          <button onClick={toggleColoringTable}>
            {isColoringTable ? 'Not coloring table' : 'Coloring table'}
          </button>
          <button onClick={toggleSortingByCountry}>
            {sorting === SortBy.COUNTRY
              ? 'Not sort by country'
              : 'Sort by country'}
          </button>
          <button onClick={handleResetUsers}>Reset original users</button>
          <input
            type="text"
            placeholder="Filter by country"
            onChange={(event) => {
              setCountryFilter(event.target.value)
            }}
          />
        </div>
      </header>
      <main>
        <UsersList
          users={filteredUsers}
          isColoringTable={isColoringTable}
          deleteUser={handleDeleteUser}
          handleChangeSorting={handleChangeSorting}
        />
      </main>
    </>
  )
}

export default App
