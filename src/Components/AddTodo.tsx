import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { ChangeEvent, FC, useContext, useState } from 'react';
import { TodoListContext, TodoType } from '../Context/TodoContext';

const AddTodo: FC = () => {
	const todoActions = useContext(TodoListContext);
	const [todo, setTodo] = useState<TodoType>({
		id: '',
		title: '',
		body: '',
		status: 'inProgress',
	});
	const handleCreateTodo = async () => {
		// todoActions?.setShowLoader(true);
		// await new Promise<void>((resolve) => {
		// 	setTimeout(() => {
		// 		resolve();
		// 	}, 3000);
		// });
		// todoActions?.setShowLoader(false);
		todoActions?.addTodoInTodoList(
			{
				...todo,
				id: `${Math.floor(Math.random() * 10000)}`,
			},
			todo.status
		);

		setTodo({
			id: '',
			title: '',
			body: '',
			status: 'inProgress',
		});
	};

	return (
		<div>
			<Box
				component="form"
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
			>
				<TextField
					id="filled-basic"
					label="Title"
					variant="filled"
					color="warning"
					value={todo.title}
					onChange={(e) =>
						setTodo((state: TodoType) => {
							return { ...state, title: e.target.value };
						})
					}
				/>
				<TextField
					id="filled-basic"
					label="Body"
					variant="filled"
					value={todo.body}
					color="warning"
					onChange={(e) =>
						setTodo((state: TodoType) => {
							return { ...state, body: e.target.value };
						})
					}
				/>
				<FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
					<InputLabel id="select-label" color="warning">
						Status
					</InputLabel>
					<Select
						labelId="select-label"
						id="select"
						color="warning"
						value={todo.status}
						onChange={(e: ChangeEvent<HTMLSelectElement> | any) =>
							setTodo((state: TodoType) => {
								return { ...state, status: e.target.value };
							})
						}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={'inProgress'}>Inprogress</MenuItem>
						<MenuItem value={'review'}>Review</MenuItem>
						<MenuItem value={'testing'}>Testing</MenuItem>
						<MenuItem value={'completed'}>Completed</MenuItem>
					</Select>
				</FormControl>

				<Button
					variant="contained"
					color="warning"
					onClick={handleCreateTodo}
					disabled={todo.title.length && todo.body.length ? false : true}
				>
					Create
				</Button>
			</Box>
		</div>
	);
};

export default AddTodo;
