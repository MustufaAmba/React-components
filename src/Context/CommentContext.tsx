import { createContext, FC, useEffect, useState } from 'react';
import { fakeComments } from '../mockData/commentData';
import { ChildrenType } from './TodoContext';
export type CommentType = {
	id: number;
	content: string;
	parentId: number | null;
	reply: CommentType[] | null;
	userName: string;
	imageUrl: string;
};
type ContextType = {
	allComments: CommentType[];
	addComment: (comment: CommentType) => void;
};
export const ThreadedCommentContext = createContext<ContextType | null>(null);
const CommentContext: FC<ChildrenType> = ({ children }) => {
	const [allComments, setAllComments] = useState<CommentType[]>(fakeComments);
	useEffect(() => {
		let storageComments = localStorage.getItem('threadedComments');
		if (!storageComments) {
			localStorage.setItem('threadedComments', JSON.stringify(allComments));
		} else {
			setAllComments(JSON.parse(storageComments));
		}
	}, []);
	useEffect(() => {
		localStorage.setItem('threadedComments', JSON.stringify(allComments));
	}, [allComments]);
	const addComment = (comment: CommentType) => {
		setAllComments((state) => [...state, comment]);
	};
	return (
		<ThreadedCommentContext.Provider value={{ allComments, addComment }}>
			{children}
		</ThreadedCommentContext.Provider>
	);
};

export default CommentContext;
