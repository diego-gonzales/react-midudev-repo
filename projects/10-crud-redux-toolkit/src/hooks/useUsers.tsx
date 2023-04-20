import { addNewUser, deleteUserById } from '../store/users/slice';
import { User, UserId } from '../types';
import { useAppDispatch, useAppSelector } from './store';

export function useUsers() {
	const users = useAppSelector((state) => state.users);
	const dispatch = useAppDispatch();

	const addUser = (user: User) => dispatch(addNewUser(user));
	const removeUser = (id: UserId) => dispatch(deleteUserById(id));

	return { users, addUser, removeUser };
}
