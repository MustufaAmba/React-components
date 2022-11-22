import { CommentType } from '../Context/CommentContext';

export const fakeComments: CommentType[] = [
	{
		id: 1,
		content: 'hello world',
		parentId: null,
		userName: 'gUiLcONt',
		imageUrl: 'https://www.w3schools.com/howto/img_avatar2.png',
		reply: [
			{
				id: 4,
				content: 'react',
				parentId: 1,
				reply: null,
				userName: 'ITAtArBA',
				imageUrl: 'https://www.w3schools.com/w3images/avatar6.png',
			},
			{
				id: 5,
				content: 'angular',
				parentId: 1,
				userName: 'ATiouShA',
				imageUrl:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRzlwJRwL4CKyumP9g_ZjZUpsoV5DoVu_ptA&usqp=CAU',
				reply: [
					{
						content: 'world',
						id: 6,
						reply: null,
						userName: 'StEspiNd',
						parentId: 5,
						imageUrl:
							'https://playeateasy.com/wp-content/uploads/2018/10/dummy-snapcode-avatar@2x.png',
					},
				],
			},
		],
	},
	{
		id: 2,
		content: 'vue',
		parentId: null,
		userName: 'eRbUzuRs',
		reply: null,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvPf9Jx5TYuqAtJ7ES47R9jV33QyRPM3n6TgcNHxzEUuPySRn_XrKvMhKQ0Bf0XQCIHLk&usqp=CAU',
	},
	{
		id: 3,
		content: 'node js',
		parentId: null,
		reply: null,
		userName: 'HELYHydr',
		imageUrl:
			'https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105561/126045782-vector-illustration-of-avatar-and-dummy-sign-collection-of-avatar-and-image-stock-symbol-for-web-.jpg',
	},
];
