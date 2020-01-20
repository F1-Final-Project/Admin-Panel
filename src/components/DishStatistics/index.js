import React from 'react'
import DishRevenue from './DishRevenue'

export default function DishStatistics(props) {
	const { data, loaded } = props

	return (
		<React.Fragment>
			{loaded ?
				<DishRevenue data={data}/>
				: null}
		</React.Fragment>
	)
}
