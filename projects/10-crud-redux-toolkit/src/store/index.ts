import { Middleware, configureStore } from '@reduxjs/toolkit';
import usersReducer, { rollbackDeleteUser } from './users/slice';
import { toast } from 'sonner';

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		// fase 1: Antes que se ejecute la acción. Ver en imagen del README
		next(action);
		// fase 2: Después que se ejecutó la acción y se actualizó el state. Ver en imagen del README
		localStorage.setItem('__redux__state__', JSON.stringify(store.getState()));
	};

const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;

		const previusState = store.getState();

		next(action);

		if (type === 'users/addNewUser') {
			fetch('https://jsonplaceholder.typicode.com/users', {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then((response) => {
					if (response.ok) toast.success('User added successfully');
				})
				.catch((error) => {
					toast.error('Error adding user');
				});
		}

		if (type === 'users/deleteUserById') {
			const userIdToDelete = payload;
			const userToDelete = previusState.users.find(
				(user) => user.id === userIdToDelete,
			);

			fetch(`https://jsonplaceholder.typicode.com/users/${userIdToDelete}`, {
				method: 'DELETE',
			})
				.then((response) => {
					if (response.ok) toast.success('User deleted successfully');
					// throw new Error('Error deleting user'); // <-- Para probar el rollback
				})
				.catch((error) => {
					toast.error(`Error deleting user '${userIdToDelete}'`);
					if (userToDelete) store.dispatch(rollbackDeleteUser(userToDelete));
				});
		}
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
