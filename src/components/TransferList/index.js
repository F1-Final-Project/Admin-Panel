import React, { useContext, useState, useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { Context } from '../../context/tableContext'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import { useStyles, TableIconButton } from './TransferListCSS'
import PropTypes from 'prop-types'


/**
 * @desc Функция для сортировки элементов с индексом = -1
 * @param {Array} a
 * @param{Array} b
 */
function not(a, b) {
	return a.filter(value => b.indexOf(value) === -1)
}

/**
 * @desc Функция для сортировки элементов с индексом != -1
 * @param {Array} a
 * @param{Array} b
 */

function intersection(a, b) {
	return a.filter(value => b.indexOf(value) !== -1)
}

export default function TransferList(props) {

	const { dispatch, state } = useContext(Context)
	const classes = useStyles()

	const {
		itemValue,
		nameProperty,
	} = props

	const [checked, setChecked] = useState([])
	const [left, setLeft] = useState(itemValue)
	const [right, setRight] = useState(state.transferListItemSearch)


	const rightChecked = intersection(checked, right)

	/**
	 * @desc Функция для переключения состояния чекбоксов
	 * @param {Object} value
	 */

	const handleToggle = value => () => {

		const currentIndex = checked.indexOf(value)
		const newChecked = [...checked]

		if (currentIndex === -1) {
			newChecked.push(value)
		} else {
			newChecked.splice(currentIndex, 1)
		}

		setChecked(newChecked)
	}

	/**
	 * @desc Функция для перемещения элементов с правого трансфер листа в левый
	 */
	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked))
		setRight(not(right, rightChecked))
		setChecked(not(checked, rightChecked))

		handleSaveIng(left.concat(rightChecked))
	}

	/**
	 * @desc Функция useCallback обновления состояния product при изменении left левого трансфер листа
	 *  @desc useReducer - dispatch обновления состояния product
	 * @param {Array} item
	 */

	const handleSaveIng = useCallback(
		(item) => {

			let newGroupItem = {}
			newGroupItem[nameProperty] = item

			dispatch({
				type: 'onChangeInput',
				payload: newGroupItem,
				openEditModal: state.openEditModal,
				openCreateModal: state.openCreateModal,
			})
		},
		[left],
	)

	/**
	 * @desc Функция поиска элементов в масиве для правого трансфер листа
	 * @desc useReducer - dispatch обновления состояния transferListItemSearch
	 * @param {Event} e.target
	 */

	const handelSearchChange = e => {
		const testFilter = state.transferListItem.filter(i => {
			return i.title.includes(e.target.value)
		})

		setRight(testFilter)

		dispatch({
			type: 'searchChange',
			payload: testFilter,
			searchItem: { [e.target.name]: e.target.value },
		})
	}

	/**
	 * @desc Функция поиска элементов в масиве для удаления в левой части трансфер листа
	 * @param {Object} items
	 */

	const handleDeleteItemList = items => {
		const newDelete = left.filter(i => i._id !== items._id)

		setLeft(newDelete)

		handleSaveIng(newDelete)
	}

	/**
	 * @desc Функция для отображения массива элементов для левой части трансфер листа
	 * @param {Array} items
	 */

	const customListLeft = items => {
		return <Paper className={classes.tablePaperEffect}>
			<List dense component="div" role="list">
				{items.map(value => {
					const labelId = `transfer-list-item-${value}-label`
					return (
						<ListItem key={value._id} role="listitem" button>
							<Tooltip title="Delete" aria-label="delete">
								<TableIconButton aria-label="delete" className={classes.listDeleteBtn}
														onClick={() => handleDeleteItemList(value)}>
									<DeleteIcon fontSize="small"/>
								</TableIconButton>
							</Tooltip>
							<ListItemText id={labelId} primary={value.title}/>
						</ListItem>
					)
				})}
				<ListItem/>
			</List>
		</Paper>
	}

	/**
	 * @desc Функция для отображения массива элементов для правой части трансфер листа
	 * @param {Array} items
	 */

	const customListRight = items => {

		return <Paper className={classes.tablePaperEffect} component="div">
			<Paper component="form" className={classes.listSearch} component="div">
				<InputBase
					className={classes.listInputBase}
					placeholder="Search"
					inputProps={{ 'aria-label': 'search' }}
					value={state.search[nameProperty]}
					name={nameProperty}
					onChange={e => handelSearchChange(e)}
				/>
				<TableIconButton type="text" className={classes.listIconButton} aria-label="search" onClick={e => e.preventDefault()}>
					<SearchIcon className={classes.listSearchIcon} />
				</TableIconButton>
			</Paper>
			<List dense component="div" role="list">
				{items.map(value => {
					const labelId = `transfer-list-item-${value}-label`
					return (
						<ListItem key={value._id} role="listitem" button onClick={handleToggle(value)}>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									color="primary"
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
									className={classes.listCheckbox}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value.title}/>
						</ListItem>
					)
				})}
				<ListItem/>
			</List>
		</Paper>
	}

	return (
		<Grid container spacing={2} justify="center" alignItems="center" className={classes.listContainer}>
			<Grid item>{customListLeft(left)}</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						variant="outlined"
						size="small"
						className={rightChecked.length > 0 ? classes.listButton : classes.listButtonNone}
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label="move selected left"
					>
						&lt;
					</Button>
				</Grid>
			</Grid>
			<Grid item>{customListRight(right)}</Grid>
		</Grid>
	)
}

TransferList.propTypes = {
	itemValue: PropTypes.array,
	nameProperty: PropTypes.string,
}
