import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserId } from '../../types';

const DEFAULT_STATE = [
	{
		id: '1',
		name: 'Peter Doe',
		email: 'peterdoe@test.com',
		github: 'peterdoe',
	},
	{
		id: '2',
		name: 'John Doe',
		email: 'johndoe@test.com',
		github: 'johndoe',
	},
	{
		id: '3',
		name: 'Jane Doe',
		email: 'janedoe@test.com',
		github: 'janedoe',
	},
];

const initialState: User[] = (() => {
	const persistedState = localStorage.getItem('__redux__state__');
	return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			const user = { ...action.payload, id };
			// Se puede modificar el state directamente ya que Redux Toolkit usa Immer
			state.push(user);
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackDeleteUser: (state, action: PayloadAction<User>) => {
			const userIsAlreadyInState = state.some(
				(user) => user.id === action.payload.id,
			);
			if (userIsAlreadyInState) return state;
			return [...state, action.payload];
		},
	},
});

export default usersSlice.reducer;
export const { addNewUser, deleteUserById, rollbackDeleteUser } =
	usersSlice.actions;
