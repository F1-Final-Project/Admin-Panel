import Button from '@material-ui/core/Button/index'
import React from 'react'

export default function ShowAllTablesButton(props) {

	const showTables = () => {
		props.setView('tables')
	};

	return(
			<Button onClick={showTables} >tables</Button>
	)
}
