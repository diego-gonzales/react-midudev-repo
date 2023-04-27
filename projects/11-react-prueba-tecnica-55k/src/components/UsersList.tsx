import { type User, SortBy } from '../types.d'

interface UsersListProps {
  users: User[]
  isColoringTable: boolean
  deleteUser: (uuid: string) => void
  handleChangeSorting: (sort: SortBy) => void
}

export const UsersList = ({
  users,
  isColoringTable,
  deleteUser,
  handleChangeSorting,
}: UsersListProps) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Photo</th>
          <th
            className="pointer"
            onClick={() => {
              handleChangeSorting(SortBy.NAME)
            }}
          >
            Name
          </th>
          <th
            className="pointer"
            onClick={() => {
              handleChangeSorting(SortBy.LASTNAME)
            }}
          >
            Lastname
          </th>
          <th
            className="pointer"
            onClick={() => {
              handleChangeSorting(SortBy.COUNTRY)
            }}
          >
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      {/* className={isColoringTable ? 'table-class' : ''} */}
      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555'
          const color = isColoringTable ? backgroundColor : 'transparent'

          return (
            <tr key={user.login.uuid} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} alt={user.name.first} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    deleteUser(user.login.uuid)
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
