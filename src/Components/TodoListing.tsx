import { Badge } from '@mui/material';
import { FC } from 'react';
import {
	Draggable,
	DraggableProvided,
	DraggableStateSnapshot,
	Droppable,
	DroppableProvided,
	DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { TodoType } from '../Context/TodoContext';
import Styles from '../ComponentStyles/todoListing.module.css';
type TodoListingProps = {
	label: string;
	data: TodoType[];
};
const TodoListing: FC<TodoListingProps> = ({ label, data }) => {
	const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
		background: isDragging ? '#ed6c02' : 'lightgray',
		color: isDragging ? 'white' : 'black',
		...draggableStyle,
		borderLeft: `3px solid 		${
			label === 'inProgress'
				? '#f44336'
				: label === 'completed'
				? '#4caf50'
				: label === 'review'
				? '#ff9800'
				: '#00bcd4'
		}`,
	});
	const getListStyle = (isDraggingOver: boolean) => ({
		background: isDraggingOver ? '#baa9a9' : '#f0f0f0',
	});
	const getBadgeColor = (status: TodoType['status']) => {
		return status === 'inProgress'
			? 'error'
			: status === 'completed'
			? 'success'
			: status === 'review'
			? 'warning'
			: 'info';
	};
	return (
		<div>
			<h2 style={{ marginLeft: '20px' }}>{label}:</h2>
			<Droppable droppableId={label}>
				{(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className={Styles.getListStyles}
						style={getListStyle(snapshot.isDraggingOver)}
					>
						{data.length
							? data.map((todo, index) => (
									<Draggable
										key={todo.id}
										draggableId={`${todo.id}`}
										index={index}
									>
										{(
											provided: DraggableProvided,
											snapshot: DraggableStateSnapshot
										) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												className={Styles.getItemStyles}
												style={getItemStyle(
													snapshot.isDragging,
													provided.draggableProps.style
												)}
											>
												<div
													style={{ position: 'relative', paddingTop: '10px' }}
												>
													<h2>{todo.title}</h2>
													<p>{todo.body}</p>
													<Badge
														className={Styles.badgeStyles}
														badgeContent={todo.status}
														color={getBadgeColor(todo.status)}
													></Badge>
												</div>
											</div>
										)}
									</Draggable>
							  ))
							: ''}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default TodoListing;
