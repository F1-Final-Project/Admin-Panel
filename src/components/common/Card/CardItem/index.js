import React, { useContext } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField'
import { Context } from '../../../../context/tableContext'
import PropTypes from 'prop-types'

export default function MediaCard(props) {

	const {
		itemList,
		classes,
		secondary,
	} = props

	const { dispatch, state } = useContext(Context)

	/** Функция для контролирования изменений в input
	 * @desc useReducer - dispatch обновления состояния products
	 * @param {Event} e.target
	 */

	const handleChangeItem = e => {
		let updatedIngredient = { ...itemList, ...{ [e.target.name]: e.target.value } }

		dispatch({
			...{
				type: 'onChangeInput',
				payload: updatedIngredient,
			},
		})
	}

	/** Функция для удаления карточки
	 * @desc useReducer - dispatch обновления состояния products
	 */

	const handleRemoveItem = () => {
		dispatch({
			...{
				type: 'deleteItem',
				payload: itemList,
			},
		})
	}

	return (
		<ListItem>
			<ListItemText
				primary={itemList.title}
				secondary={!state.pendingOrder && secondary ?														//при состоянии (В заказе) блокируются действия с карточкой
					<TextField
						id={itemList._id}
						label="restInStock"
						type="number"
						className={classes.textField}
						onChange={handleChangeItem}
						InputLabelProps={{
							shrink: true,
						}}
						margin="normal"
						name='restInStock'
						value={itemList.restInStock}
						secondary={secondary ? 'Secondary text' : null}
					/>
					: null}
			/>
			<ListItemSecondaryAction>
				<IconButton edge="end" aria-label="delete" onClick={handleRemoveItem} disabled={!!state.pendingOrder}>
					<DeleteIcon/>
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>


	)
}

MediaCard.propTypes = {
	itemList: PropTypes.object,
	classes: PropTypes.object,
	secondary: PropTypes.bool,
}