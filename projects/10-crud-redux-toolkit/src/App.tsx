import './App.css';
import UserList from './components/UserList';
import CreateNewUser from './components/CreateNewUser';
import { Toaster } from 'sonner';
import { UserWithId } from './types';
import { useState } from 'react';

function App() {
	const [userToEdit, setUserToEdit] = useState<UserWithId>();

	return (
		<>
			<UserList setUserToEdit={setUserToEdit} />
			<CreateNewUser userToEdit={userToEdit} setUserToEdit={setUserToEdit} />
			<Toaster position="top-right" richColors />
		</>
	);
}

export default App;
