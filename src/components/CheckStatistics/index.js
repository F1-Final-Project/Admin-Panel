import React from 'react'
import Checks from './Checks'

export default function CheckStatistics(props) {
	const { data, loaded } = props

	return (
		<React.Fragment>
			{loaded ?
				<Checks data={data}/>
				: null}
		</React.Fragment>
	)
}
