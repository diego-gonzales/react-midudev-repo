import './App.css';
import UserList from './components/UserList';
import CreateNewUser from './components/CreateNewUser';
import { Toaster } from 'sonner';

function App() {
	return (
		<>
			<UserList />
			<CreateNewUser />
			<Toaster />
		</>
	);
}

export default App;
