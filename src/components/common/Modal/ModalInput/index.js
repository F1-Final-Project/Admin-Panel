import React, { useContext } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'
import { Context } from '../../../../context/tableContext'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}))

export default (props) => {
	const classes = useStyles()
	const { name, open } = props

	const { dispatch, state } = useContext(Context)


	const test = e => {
		dispatch({
			...{
				type: 'onChangeInput',
				payload: { [e.target.name]: e.target.value },
			},
			...open
		})
	}

	const handleInputItems = () => {
		return Object.keys(state.product).map(key => {
			let itemValue = state.product[key]
			if (key !== '_id' && key !== '__v' && key !== undefined) {
				return <>
					<TextField
						id="standard-basic"
						className={classes.textField}
						label={key}
						name={key}
						margin="normal"
						value={itemValue}
						onChange={test}
					/>
				</>
			}
		})
	}

	return (
		<>
			<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
				{name}
			</DialogTitle>
			<DialogContent>
				<form className={classes.container} noValidate autoComplete="off">
					<div>
						{handleInputItems()}
					</div>
				</form>
			</DialogContent>
		</>
	)
}