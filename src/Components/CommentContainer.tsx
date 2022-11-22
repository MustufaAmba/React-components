import { Button, TextField } from '@mui/material';
import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { CommentType, ThreadedCommentContext } from '../Context/CommentContext';

type CommentContainerType = {
	commentData: CommentType;
};
const CommentContainer: FC<CommentContainerType> = ({ commentData }) => {
	const [toggleReplies, setToggleReplies] = useState<boolean>(false);
	const [toggleAddComment, setToggleAddComment] = useState<boolean>(false);
	const [childComment, setChildComment] = useState<string>('');
	const commentActions = useContext(ThreadedCommentContext);
	const addChildComment = (parentId: number) => {
		let newComment = {
			content: childComment,
			parentId,
			reply: null,
			id: Math.floor(Math.random() * 1000),
			userName: 'guest',
			imageUrl:
				'https://cdn.pixabay.com/photo/2014/04/03/11/47/avatar-312160__340.png',
		};
		commentActions?.allComments.forEach((obj) => {
			recursiveFunction(obj, parentId, newComment);
		});
		setChildComment('');
		setToggleAddComment(false);
	};
	let recursiveFunction = (
		currentComment: CommentType,
		parentId: number,
		insertData: CommentType
	) => {
		if (currentComment['id'] === parentId) {
			currentComment['reply'] = currentComment['reply']
				? [...currentComment['reply'], insertData]
				: [insertData];

			return currentComment;
		} else {
			let temp;
			currentComment['reply'] &&
				currentComment['reply'].forEach((obj) => {
					temp = recursiveFunction(obj, parentId, insertData);
				});
			return temp;
		}
	};
	return (
		<div>
			<div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '5px',
					}}
				>
					<img
						src={commentData.imageUrl}
						height="30"
						width="30"
						alt="avatar"
						style={{ borderRadius: '50%' }}
					/>
					<div>
						<h5 style={{ margin: 0 }}>{commentData.userName}</h5>
						<p style={{ margin: 0, fontSize: '13px' }}>{commentData.content}</p>
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'start',
						marginBottom: '1rem',
					}}
				>
					{!toggleAddComment ? (
						<Button
							size="small"
							onClick={() => setToggleAddComment((state) => !state)}
						>
							Add a reply
						</Button>
					) : (
						<div>
							<div
								style={{
									display: 'flex',
									gap: '5px',
									alignItems: 'center',
									marginTop: '10px',
								}}
							>
								<TextField
									id="filled-basic"
									label="Enter a comment"
									variant="filled"
									color="warning"
									value={childComment}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setChildComment(e.target.value)
									}
									InputProps={{
										endAdornment: (
											<Button
												onClick={() => addChildComment(commentData.id)}
												variant="text"
												color="warning"
												sx={{ height: 'fit-content' }}
												disabled={!childComment.length}
											>
												Post
											</Button>
										),
									}}
								/>
							</div>
						</div>
					)}
					{commentData.reply && commentData.reply.length && (
						<div>
							<Button
								size="small"
								onClick={() => {
									setToggleReplies((state) => !state);
									setToggleAddComment(false);
								}}
							>
								{`${toggleReplies ? 'Hide' : 'Show'}`} replies
							</Button>
							{toggleReplies &&
								commentData.reply.map((comment, index) => (
									<CommentContainer key={index} commentData={comment} />
								))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CommentContainer;
