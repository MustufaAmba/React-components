import { TodosType } from '../Context/TodoContext';

export const fakeTodo: TodosType = {
	inProgress: [
		{
			id: '1',
			title: 'Next setup',
			body: 'Setup next 13',
			status: 'inProgress',
		},
	],
	completed: [
		{
			id: '3',
			title: 'File upload',
			body: 'Add file upload form control',
			status: 'completed',
		},
	],
	review: [
		{
			id: '2',
			title: 'Disable submit button',
			body: 'disable submit button on current date',
			status: 'review',
		},
	],
	testing: [
		{
			id: '4',
			title: 'Dynamic form builder',
			body: 'Dynamic form builder',
			status: 'testing',
		},
	],
};
