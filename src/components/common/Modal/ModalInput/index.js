import React, { useContext } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'
import { Context } from '../../../../context/tableContext'
import Paper from '@material-ui/core/Paper'
import TransferList from '../../../TransferList'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

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
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	paperMargin: {
		marginBottom: 10,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},

}))

export default (props) => {
	const classes = useStyles()
	const { name, open } = props

	const { dispatch, state } = useContext(Context)

	const [categories, setCategories] = React.useState({
		value: state.product.category && state.product.category.title,
		id: state.product.category && state.product.category._id,
		name: 'category',
	})


	const handleChangeItem = e => {
		dispatch({
			...{
				type: 'onChangeInput',
				payload: { [e.target.name]: e.target.value },
			},
			...open,
		})
	}

	const handleChangeSelect = event => {

		setCategories({
			value: event.target.value,
			id: event.target.id,
			name: event.target.name,
		})
		const newCategories = state.dataCategoriesItem.filter(i => i._id === event.currentTarget.id)

		dispatch({
			type: 'onChangeInput',
			payload: { [event.target.name]: newCategories[0] },
			openEditModal: state.openEditModal,
			openCreateModal: state.openCreateModal,
		})

	}


	const handleInputItems = () => {
		return Object.keys(state.product).map((key, index) => {
			let itemValue = state.product[key]
			if (key !== '_id' && key !== '__v' && key !== undefined && typeof itemValue !== 'object') {
				return <>
					<TextField
						id="standard-basic"
						className={classes.textField}
						label={key}
						name={key}
						margin="normal"
						value={itemValue}
						onChange={handleChangeItem}
						key={key}
					/>
				</>
			} else if (key !== '_id' && key !== '__v' && key !== undefined && typeof itemValue === 'object') {

				return Array.isArray(itemValue) ? (
						<Paper className={classes.paperMargin} key={key}>
							<div key={index}>{key.toUpperCase()}</div>
							<TransferList itemValue={itemValue} nameProperty={key}/>
						</Paper>
					)
					: (
						<>
							<FormControl className={classes.textField} key={key}>
								<InputLabel id="demo-simple-select-label">Age</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									name={categories.name}
									value={categories.value}
									id={categories.id}
									onChange={handleChangeSelect}
								>{
									state.dataCategoriesItem.map(i => {
										return <MenuItem value={i.title} key={i._id} id={i._id} name={key}>{i.title}</MenuItem>
									})
								}
								</Select>
							</FormControl>
						</>)
			}
		})
	}

	return (
		<Context.Provider value={{
			dispatch, state,
		}}>
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
		</Context.Provider>
	)
}