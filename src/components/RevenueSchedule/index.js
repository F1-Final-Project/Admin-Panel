import React from 'react'
import Schedule from './Schedule'


export default function RevenueSchedule(props) {
	const { data, loaded } = props


	return (
		<React.Fragment>
			{loaded ?
				<Schedule data={data}/>
				: null}
		</React.Fragment>
	)
}
