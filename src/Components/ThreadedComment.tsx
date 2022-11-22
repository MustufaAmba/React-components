import { Button, TextField } from '@mui/material';
import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import CommentContainer from './CommentContainer';
import Header from './Header';
import { ThreadedCommentContext } from '../Context/CommentContext';
const ThreadedComment: FC = () => {
	const [comment, setComment] = useState<string>('');
	const commentActions = useContext(ThreadedCommentContext);
	const addComment = () => {
		let obj = {
			content: comment,
			id: Math.floor(Math.random() * 1000),
			parentId: null,
			reply: null,
			userName: 'guest',
			imageUrl:
				'https://cdn.pixabay.com/photo/2014/04/03/11/47/avatar-312160__340.png',
		};

		commentActions?.addComment(obj);
	};

	return (
		<div>
			<Header />

			<div style={{ margin: '50px' }}>
				<h3>Add Comments</h3>
				<div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
					<TextField
						id="filled-basic"
						label="Enter a comment"
						variant="filled"
						color="warning"
						value={comment}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setComment(e.target.value)
						}
						InputProps={{
							endAdornment: (
								<Button
									onClick={addComment}
									color="warning"
									variant="text"
									sx={{ height: 'fit-content' }}
									disabled={!comment.length}
								>
									Post
								</Button>
							),
						}}
					/>
				</div>
			</div>
			<div style={{ margin: '50px' }}>
				<h3>Comment lists</h3>
				{commentActions?.allComments.map((comment, index) => (
					<CommentContainer
						key={index}
						commentData={comment}
					></CommentContainer>
				))}
			</div>
		</div>
	);
};

export default ThreadedComment;
