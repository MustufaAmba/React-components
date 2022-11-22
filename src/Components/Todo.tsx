import { useContext } from 'react';
import { NextPage, NextPageContext } from 'next';
import { TodoListContext, TodoType } from '../Context/TodoContext';
import AddTodo from './AddTodo';
import {
	DragDropContext,
	resetServerContext,
	DropResult,
} from 'react-beautiful-dnd';
import TodoListing from './TodoListing';
import TopLoader from './TopLoader';
import styles from '../../styles/Home.module.css';
import Header from './Header';
const Todo: NextPage = () => {
	const todoActions = useContext(TodoListContext);
	const reorder = (list: TodoType[], startIndex: number, endIndex: number) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};
	const getList = (id: TodoType['status']): TodoType[] | [] => {
		if (todoActions?.todos) {
			return todoActions.todos[id];
		}
		return [];
	};
	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}

		if (source.droppableId === destination.droppableId) {
			const todos = getList(source.droppableId as TodoType['status']);
			const items = reorder(todos, source.index, destination.index);

			todoActions &&
				todoActions.setTodos({
					...todoActions.todos,
					[source.droppableId]: [...new Set(items)],
				});
		} else {
			const result = move(
				getList(source.droppableId as TodoType['status']),
				getList(destination.droppableId as TodoType['status']),
				source,
				destination
			);
			todoActions &&
				todoActions.setTodos({
					...todoActions.todos,
					[source.droppableId]: [...new Set(result[source.droppableId])],
					[destination.droppableId]: [
						...new Set(result[destination.droppableId]),
					],
				});
		}
	};

	const move = (
		source: TodoType[],
		destination: TodoType[],
		droppableSource: any,
		droppableDestination: any
	) => {
		const sourceClone = Array.from(source);
		const destClone = Array.from(destination);
		const [removed] = sourceClone.splice(droppableSource.index, 1);
		destClone.splice(droppableDestination.index, 0, {
			...removed,
			status: droppableDestination.droppableId,
		});
		const result: any = {};
		result[droppableSource.droppableId] = sourceClone;
		result[droppableDestination.droppableId] = destClone;

		return result;
	};
	return (
		<div>
			{todoActions?.showLoader && <TopLoader />}
			<Header />
			<div className={styles.container}>
				<h1>Add Todo</h1>
				<AddTodo />
				<DragDropContext onDragEnd={onDragEnd}>
					<div style={{ display: 'flex', marginRight: '100px' }}>
						{todoActions?.todos &&
							Object.keys(todoActions.todos).map(
								(states: string, index: number) => (
									<TodoListing
										key={index}
										label={states}
										data={
											todoActions.todos[states as TodoType['status']]
												? todoActions.todos[states as TodoType['status']]
												: []
										}
									/>
								)
							)}
					</div>
				</DragDropContext>
			</div>
		</div>
	);
};

export default Todo;
Todo.getInitialProps = async (ctx: NextPageContext) => {
	resetServerContext();
	return {};
};
