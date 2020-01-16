import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend
} from "recharts";

export default function Chart(props) {

	const {data} = props;
	const name = Object.keys(data[0]).filter(i => i !== 'name')[0]

	return (
			<BarChart
				width={600}
				height={300}
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				className='correct-bottom-revenue'
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey={name} fill="#E9C294" />
			</BarChart>
		);
}
