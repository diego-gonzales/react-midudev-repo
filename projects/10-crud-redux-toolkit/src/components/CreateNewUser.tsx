import { Title, TextInput, Button, Card } from '@tremor/react';
import { useUsers } from '../hooks/useUsers';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { UserWithId } from '../types';

interface CreateNewUserProps {
	userToEdit?: UserWithId;
	setUserToEdit: React.Dispatch<React.SetStateAction<UserWithId | undefined>>;
}

const initialForm = { name: '', email: '', github: '' };

export default function CreateNewUser({
	userToEdit,
	setUserToEdit,
}: CreateNewUserProps) {
	const { addUser } = useUsers();
	const [myForm, setMyForm] = useState(initialForm);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { name, email, github } = myForm;

		if (name === '' || email === '' || github === '') {
			toast.error('Please fill all the fields');
			return;
		}

		if (!userToEdit) {
			addUser(myForm);
			toast.success('User created successfully');
		} else {
			toast.success('User updated successfully');
			setUserToEdit(undefined);
		}

		setMyForm(initialForm);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMyForm({ ...myForm, [event.target.name]: event.target.value });
	};

	const handleCancel = () => {
		setUserToEdit(undefined);
		setMyForm(initialForm);
	};

	useEffect(() => {
		if (userToEdit) setMyForm(userToEdit);
	}, [userToEdit]);

	return (
		<Card className="mt-5">
			<Title>{!userToEdit ? 'Create New User' : 'Edit User'}</Title>
			<form onSubmit={handleSubmit} autoComplete="off">
				<TextInput
					name="name"
					placeholder="Enter the name here"
					className="my-2"
					value={myForm.name}
					onChange={handleChange}
				/>
				<TextInput
					name="email"
					placeholder="Enter the email here"
					className="my-2"
					value={myForm.email}
					onChange={handleChange}
				/>
				<TextInput
					name="github"
					placeholder="Enter the Github here"
					className="my-2"
					value={myForm.github}
					onChange={handleChange}
				/>

				<Button type="submit">{!userToEdit ? 'Create' : 'Edit'}</Button>
				{userToEdit && (
					<Button type="button" onClick={() => handleCancel()}>
						Cancel
					</Button>
				)}
			</form>
		</Card>
	);
}
