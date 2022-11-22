import { FC, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
const TopLoader: FC = () => {
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				let diff;
				if (oldProgress >= 95) {
					diff = Math.random() * 0.1;
				} else if (oldProgress >= 70) {
					diff = Math.random();
				} else {
					diff = Math.random() * 5;
				}

				return Math.min(oldProgress + diff);
			});
		}, 200);

		return () => {
			clearInterval(timer);
		};
	}, []);
	return (
		<div>
			{' '}
			<Box sx={{ width: '100%' }}>
				<LinearProgress
					variant="determinate"
					color={'primary'}
					value={progress}
				/>
			</Box>
		</div>
	);
};

export default TopLoader;
