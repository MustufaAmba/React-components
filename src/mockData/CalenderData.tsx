export const weekData = [
	{
		id: 0,
		value: 'Sunday',
		shortValue: 'Sun',
	},
	{
		id: 1,
		value: 'Monday',
		shortValue: 'Mon',
	},
	{
		id: 2,
		value: 'Tuesday',
		shortValue: 'Tue',
	},
	{
		id: 3,
		value: 'Wednesday',
		shortValue: 'Wed',
	},
	{
		id: 4,
		value: 'Thursday',
		shortValue: 'Thu',
	},
	{
		id: 5,
		value: 'Friday',
		shortValue: 'Fri',
	},
	{
		id: 6,
		value: 'Saturday',
		shortValue: 'Sat',
	},
];

export const monthData = [
	{
		id: 0,
		value: 'January',
		shortValue: 'Jan',
	},
	{
		id: 1,
		value: 'February',
		shortValue: 'Feb',
	},
	{
		id: 2,
		value: 'March',
		shortValue: 'Mar',
	},
	{
		id: 3,
		value: 'April',
		shortValue: 'Apr',
	},
	{
		id: 4,
		value: 'May',
		shortValue: 'May',
	},
	{
		id: 5,
		value: 'June',
		shortValue: 'Jun',
	},
	{
		id: 6,
		value: 'July',
		shortValue: 'Jul',
	},
	{
		id: 7,
		value: 'August',
		shortValue: 'Aug',
	},
	{
		id: 8,
		value: 'September',
		shortValue: 'Sep',
	},
	{
		id: 9,
		value: 'October',
		shortValue: 'Oct',
	},
	{
		id: 10,
		value: 'November',
		shortValue: 'Nov',
	},
	{
		id: 11,
		value: 'December',
		shortValue: 'Dec',
	},
];
export type DateDataType = {
	id: number;
	date?: Date;
	isSelected: boolean;
};
export let dateData: DateDataType[] = [];
for (let i = 1; i <= 31; i++) {
	dateData.push({ id: i, date: new Date(), isSelected: false });
}
