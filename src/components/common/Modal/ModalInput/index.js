import React, { useContext } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { Context } from '../../../../context/tableContext'
import Paper from '@material-ui/core/Paper'
import TransferList from '../../../TransferList'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useStyles, CssTextField } from './ModalItemCss'
import PropTypes from 'prop-types'

export default function ModalItem(props) {
	const classes = useStyles()

	const { nameOFModal, open } = props
	const { dispatch, state } = useContext(Context)


	const [categories, setCategories] = React.useState({
		value: state.product.category && state.product.category.title,
		id: state.product.category && state.product.category._id,
		name: 'category',
	})
	/**
	 * @desc Функция для обновления состояния введенных данных в input
	 * @desc useReducer - dispatch обновления состояния product
	 * @param {Event} e.target
	 */

	const handleChangeItem = e => {
		dispatch({
			...{
				type: 'onChangeInput',
				payload: { [e.target.name]: e.target.value },
			},
			...open,
		})
	}

	/**
	 * @desc Функция для выбора в Select конкретного элемента
	 * @desc useReducer - dispatch обновления состояния product
	 * @desc setCategories - обновления состояния для отображения в Select выбранного элемента
	 * @param event
	 */

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

	/**
	 * @desc Функция для отображения вывода зависящих от типа данных разных элементов
	 * (String n Number - input)
	 * (Array - TransferList для выбора элементов и добавление в основной список)
	 * (Object - select для выбора одного элемента)
	 */

	const handleInputItems = () => {
		return Object.keys(state.product).map((key, index) => {

			let itemValue = state.product[key]

			if (key !== '_id'
				&& key !== '__v'
				&& key !== undefined
				&& typeof itemValue !== 'object'
				&& key !== 'additionalIngredients'
				|| itemValue === null) {
				return <>
					<CssTextField
						id="standard-basic"
						className={classes.textField}
						label={key}
						name={key}
						margin="normal"
						value={itemValue === null ? 0 : itemValue}
						onChange={handleChangeItem}
						// key={key}
					/>
				</>
			} else if (key !== '_id'
				&& key !== '__v'
				&& key !== undefined
				&& typeof itemValue === 'object'
				&& key !== 'additionalIngredients'
				&& itemValue !== null) {
				return Array.isArray(itemValue) ? (
						<Paper className={classes.modalPaper} key={key}>
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
										return <MenuItem value={i.title}
																		 key={i._id}
																		 id={i._id}
																		 name={key}>{i.title}</MenuItem>
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
				<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" className={classes.dialogTitle}>
					{nameOFModal}
				</DialogTitle>
				<DialogContent className={classes.dialogContent}>
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

ModalItem.propTypes = {
	nameOFModal: PropTypes.string,
	open: PropTypes.bool,
}