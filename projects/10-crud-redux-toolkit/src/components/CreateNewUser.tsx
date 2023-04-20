import { Title, TextInput, Button, Card, Callout } from '@tremor/react';
import { useUsers } from '../hooks/useUsers';
import { useState } from 'react';

export default function CreateNewUser() {
	const { addUser } = useUsers();
	const [result, setResult] = useState<'ok' | 'ko' | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setResult(null);

		const form = event.currentTarget;
		const formData = new FormData(form);

		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const github = formData.get('github') as string;

		if (!name || !email || !github) {
			setResult('ko');
			return;
		}

		addUser({ name, email, github });
		setResult('ok');
		form.reset();
	};

	return (
		<Card className="mt-5">
			<Title>Create New User</Title>
			<form onSubmit={handleSubmit} autoComplete="off">
				<TextInput
					name="name"
					placeholder="Enter the name here"
					className="my-2"
				/>
				<TextInput
					name="email"
					placeholder="Enter the email here"
					className="my-2"
				/>
				<TextInput
					name="github"
					placeholder="Enter the Github here"
					className="my-2"
				/>

				<Button type="submit">Create</Button>
			</form>

			{result === 'ok' && (
				<Callout className='mt-5' title="Message" color="teal">
					User created successfully
				</Callout>
			)}
			{result === 'ko' && (
				<Callout className='mt-5' title="Error" color="rose">
					Please fill all the fields
				</Callout>
			)}
		</Card>
	);
}
