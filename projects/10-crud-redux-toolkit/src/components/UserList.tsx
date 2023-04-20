import {
	Card,
	Table,
	TableRow,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableBody,
	Title,
	Badge,
} from '@tremor/react';
import { EditIcon, DeleteIcon } from './Icons';
import { useUsers } from '../hooks/useUsers';

export default function UserList() {
	// const users = useAppSelector((state) => state.users);
	const { users, removeUser } = useUsers();

	return (
		<Card>
			<Title>
				Users <Badge>{users.length}</Badge>
			</Title>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell className="center"> ID </TableHeaderCell>
						<TableHeaderCell className="text-center"> Name </TableHeaderCell>
						<TableHeaderCell className="text-center"> Email </TableHeaderCell>
						<TableHeaderCell className="text-center"> Actions </TableHeaderCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{users.map((item) => (
						<TableRow key={item.id}>
							<TableCell>{item.id}</TableCell>
							<TableCell className="flex justify-center items-center gap-2">
								<img
									src={`https://unavatar.io/github/${item.github}}`}
									alt={item.github}
									className='h-10 w-10 rounded-full'
								/>
								{item.name}
							</TableCell>
							<TableCell className="text-center">{item.email}</TableCell>
							<TableCell className="text-center">
								<button type="button">
									<EditIcon />
								</button>
								<button type="button" onClick={() => removeUser(item.id)}>
									<DeleteIcon />
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}
