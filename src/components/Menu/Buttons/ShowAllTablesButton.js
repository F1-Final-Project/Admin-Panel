import React from 'react'
import {useStyles, ColorButton} from './style'

export default function ShowAllTablesButton(props) {

	const showTables = () => {
		props.setView('tables')
	};

	return(
			<ColorButton onClick={showTables} >tables</ColorButton>
	)
}
