import { useMemo, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'
import { useUsers } from './hooks/useUsers'
import { Results } from './components/Results'

// 💛 WITH REACT QUERY

function App() {
  // 👀 hasNextPage: booleano que indica si hay más páginas para cargar
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } =
    useUsers()

  const [isColoringTable, setIsColoringTable] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [countryFilter, setCountryFilter] = useState<string | null>(null)

  const toggleColoringTable = () => {
    setIsColoringTable(!isColoringTable)
  }

  const toggleSortingByCountry = () => {
    const newSortingValue =
      sorting !== SortBy.COUNTRY ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDeleteUser = (uuid: string) => {
    // const newUsers = users.filter((user) => user.login.uuid !== uuid)
    // setUsers(newUsers)
  }

  const handleResetUsers = async () => {
    await refetch()
  }

  const handleChangeSorting = (sort: SortBy) => {
    setSorting(sort)
  }

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
          <Results />
        </div>
        <div>
          <button onClick={toggleColoringTable}>
            {isColoringTable ? 'Not coloring table' : 'Coloring table'}
          </button>
          <button onClick={toggleSortingByCountry}>
            {sorting === SortBy.COUNTRY
              ? 'Not sort by country'
              : 'Sort by country'}
          </button>
          <button
            onClick={() => {
              void handleResetUsers()
            }}
          >
            Reset original users
          </button>
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
        {users.length > 0 && (
          <UsersList
            users={filteredUsers}
            isColoringTable={isColoringTable}
            deleteUser={handleDeleteUser}
            handleChangeSorting={handleChangeSorting}
          />
        )}
        {isLoading && <p>Loading...</p>}
        {isError && <p>There was an error</p>}
        {!isLoading && !isError && users.length === 0 && <p>No users found</p>}
        {!isLoading && !isError && hasNextPage === true && (
          <button
            type="button"
            onClick={() => {
              void fetchNextPage()
            }}
          >
            Load more results
          </button>
        )}
      </main>
    </>
  )
}

export default App
