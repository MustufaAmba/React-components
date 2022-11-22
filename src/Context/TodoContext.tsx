import { FC, createContext, useState, ReactNode, useEffect } from 'react';
import { fakeTodo } from '../mockData/todoData';

export type TodoType = {
	id: string;
	title: string;
	body: string;
	status: 'completed' | 'inProgress' | 'review' | 'testing';
};
export type TodosType = {
	inProgress: TodoType[];
	completed: TodoType[];
	review: TodoType[];
	testing: TodoType[];
};
type ContextType = {
	todos: TodosType;
	addTodoInTodoList: (todo: TodoType, type: TodoType['status']) => void;
	setTodos: (todos: TodosType) => void;
	showLoader: boolean;
	setShowLoader: (calue: boolean) => void;
};
export type ChildrenType = {
	children: ReactNode;
};
export const TodoListContext = createContext<ContextType | null>(null);

const TodoContext: FC<ChildrenType> = ({ children }) => {
	const [todos, setTodos] = useState<TodosType>(fakeTodo);
	const [showLoader, setShowLoader] = useState<boolean>(false);
	const addTodoInTodoList = (todo: TodoType, type: TodoType[`status`]) => {
		setTodos((state) => (state = { ...state, [type]: [...state[type], todo] }));
	};
	useEffect(() => {
		let storageTodo = localStorage.getItem('todoList');
		if (!storageTodo) {
			localStorage.setItem('todoList', JSON.stringify(todos));
		} else {
			setTodos(JSON.parse(storageTodo));
		}
	}, []);
	useEffect(() => {
		localStorage.setItem('todoList', JSON.stringify(todos));
	}, [todos]);
	return (
		<TodoListContext.Provider
			value={{ todos, addTodoInTodoList, setTodos, showLoader, setShowLoader }}
		>
			{children}
		</TodoListContext.Provider>
	);
};

export default TodoContext;
