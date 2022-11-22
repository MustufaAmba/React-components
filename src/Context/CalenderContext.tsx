import { createContext, FC, useEffect, useState } from 'react';
import {
	dateData,
	DateDataType,
	monthData,
	weekData,
} from '../mockData/CalenderData';
import { ChildrenType } from './TodoContext';
export type CurrentDateType = {
	date: number;
	day: number;
	month: number;
	year: number;
	dayName: string;
	monthName: string;
	endDate: number;
	startDateDay: number;
};
type ContextType = {
	currentDate: CurrentDateType | null;
	setCurrentDate: (comment: CurrentDateType) => void;
	selectedDate: string;
	setSelectedDate: (date: string) => void;
	dateArray: DateDataType[];
	calculateDate: (date: Date, type?: string) => void;
};
export const CustomCalenderContext = createContext<ContextType>(
	{} as ContextType
);
const CalenderContext: FC<ChildrenType> = ({ children }) => {
	const [currentDate, setCurrentDate] = useState<CurrentDateType | null>(null);
	const [selectedDate, setSelectedDate] = useState<string>(
		new Date().toLocaleDateString('en-US')
	);
	const [dateArray, setDateArray] = useState<DateDataType[]>(dateData);

	useEffect(() => {
		calculateDate(new Date(selectedDate), 'userClick');
	}, []);
	const calculateDate = (currDate: Date, type?: string) => {
		setCurrentDate({
			date: currDate.getDate(),
			day: currDate.getDay(),
			month: currDate.getMonth(),
			year: currDate.getFullYear(),
			dayName: weekData.filter((data) => data.id === currDate.getDay())[0]
				.value,
			monthName: monthData.filter((data) => data.id === currDate.getMonth())[0]
				.value,
			endDate: new Date(
				currDate.getFullYear(),
				currDate.getMonth() + 1,
				0
			).getDate(),
			startDateDay: new Date(
				currDate.getFullYear(),
				currDate.getMonth(),
				1
			).getDay(),
		});
		let data: DateDataType[] = dateData.map((date) => {
			let flag = false;
			if (type === 'userClick') {
				if (currDate.getDate() === date.id) {
					flag = true;
				} else {
					flag = false;
				}
			} else {
				let tempDate = new Date(selectedDate);
				if (
					tempDate.getFullYear() === currDate.getFullYear() &&
					tempDate.getMonth() === currDate.getMonth() &&
					tempDate.getDate() === date.id
				) {
					flag = true;
				} else {
					flag = false;
				}
			}
			return {
				id: date.id,
				date: new Date(currDate.getFullYear(), currDate.getMonth(), date.id),
				isSelected: flag,
			};
		});
		for (
			let i = 0;
			i < new Date(currDate.getFullYear(), currDate.getMonth(), 1).getDay();
			i++
		) {
			data.unshift({ id: 0, isSelected: false });
		}
		setDateArray(data);
	};
	return (
		<CustomCalenderContext.Provider
			value={{
				currentDate,
				selectedDate,
				dateArray,
				calculateDate,
				setCurrentDate,
				setSelectedDate,
			}}
		>
			{children}
		</CustomCalenderContext.Provider>
	);
};

export default CalenderContext;
