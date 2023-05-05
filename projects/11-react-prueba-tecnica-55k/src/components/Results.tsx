import { useUsers } from '../hooks/useUsers'

export const Results = () => {
  // 💥 Sin darnos cuenta React Query nos da un estado global.
  const { users } = useUsers()
  return <h2>{users.length} results</h2>
}
