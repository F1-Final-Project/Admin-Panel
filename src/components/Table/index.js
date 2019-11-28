import React, { useReducer, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Checkbox from '@material-ui/core/Checkbox'

import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Modal from '../common/Modal'
import { Context } from '../../context/tableContext'
import reducer from './localTableReducer'

import Button from '@material-ui/core/Button'

import * as sorted from '../../lib/sorted'
import * as columnName from '../../lib/columnTableName'
import ModalInput from '../common/Modal/ModalInput'
import THead from './TableHead'
import Toolbar from './ToolBar'
import { useStyles } from './TableCSS'


export default props => {
	const classes = useStyles()

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const { products, handleDeleteItem, handlerUpdateItem, handlerCreateItem, handlerCreateOrderItem, orderCategories } = props

	const initState = {
		openEditModal: false,
		openDeleteModal: false,
		openCreateModal: false,
		openCreateListModal: false,
		openCheckBox: false,
		selectItem: false,
		product: sorted.inputItems(products),
		checkedProduct: [],
		checkBoxActive: [],
	}

	const [state, dispatch] = useReducer(reducer, initState)
	const { _id = '' } = state.product


	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	const handleDeleteItemNRequest = id => {
		handleDeleteItem(id)

		dispatch({
			type: 'closeModal',
			payload: initState.product,
			openEditModal: false,
		})
	}
	const handlerUpdateNRequest = (id, date) => {
		handlerUpdateItem(id, date)

		dispatch({
			type: 'saveNewItem',
			payload: state.product,
			openEditModal: false,
		})
	}

	const handleCreatItemNRequest = (data) => {
		handlerCreateItem(data)

		dispatch({
			type: 'onChangeInput',
			products: state.product,
			openCreateModal: false,
		})
	}

	const handleSelectItem = (e, name) => {
		const productsItems = state.checkedProduct

		if (e.target.checked && Array.isArray(productsItems)) {
			productsItems.push(name)
		} else if (Array.isArray(productsItems)) {
			const index = productsItems.findIndex(i => i.id === name.id)
			productsItems.splice(index, 1)
		}

		dispatch({
			type: 'selectItems',
			payload: productsItems,
		})
	}


	const handleClickCheckedItem = (event, name) => {

		const selectedIndex = state.checkBoxActive.indexOf(name)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(state.checkBoxActive, name)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(state.checkBoxActive.slice(1))
		} else if (selectedIndex === state.checkBoxActive.length - 1) {
			newSelected = newSelected.concat(state.checkBoxActive.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				state.checkBoxActive.slice(0, selectedIndex),
				state.checkBoxActive.slice(selectedIndex + 1),
			)
		}

		dispatch({
			type: 'checkBoxActive',
			payload: newSelected,
		})
	}

	const isSelected = name => state.checkBoxActive.indexOf(name) !== -1

	const itemEndsDanger = item => {
		if (item) {
			return item < 30 ? classes.priceDanger : ''
		}
	}

	const handleCreatOrderItemNRequest = data => {
		const newData = orderCategories.filter(item => item.title === 'inProgress')

		handlerCreateOrderItem(
			{
				order: data,
				orderCategories: newData[0]._id,
				editingOrder: true,
				pendingOrder: false,
				orderHasArrived: false,
			})

		dispatch({
			type: 'checkedProduct',
			payload: [],
			checkBoxActive: [],
		})
	}

	return (
		<Context.Provider value={{
			dispatch, state,
		}}>
			<Paper className={classes.paper}>
				<Toolbar numSelected={state.checkBoxActive.length}
								 products={products}
								 creatOrderItem={handleCreatOrderItemNRequest}
				/>
				<div className={classes.root}>
					<Table className={classes.table} size="small" aria-label="a dense table">
						<THead products={products} classes={classes}/>
						<TableBody>
							{products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
									const isItemSelected = isSelected(row.title)
									const labelId = `enhanced-table-checkbox-${index}`

									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={row.code}

										>
											{state.openCheckBox && <TableCell padding="checkbox">
												<Checkbox
													id={row._id}
													inputProps={{ 'aria-labelledby': labelId }}
													onChange={e => handleSelectItem(e, row)}
													checked={isItemSelected}
													onClick={event => handleClickCheckedItem(event, row.title)}
												/>
											</TableCell>}
											{columnName.clmns(products).sort(sorted.compare).map(column => {
												const value = row[column.id]
												if (column.id === 'button') {
													return <TableCell key={column.id} align={column.align}>
														<Tooltip title="Edit" aria-label="edit">
															<IconButton aria-label="edit" className={classes.margin}
																					onClick={() => dispatch({
																						type: 'editItem',
																						payload: row,
																						openEditModal: true,
																					})}>
																<EditIcon fontSize="small"/>

															</IconButton>
														</Tooltip>
														<Tooltip title="Delete" aria-label="delete">
															<IconButton aria-label="delete" className={classes.margin} className={classes.margin}
																					onClick={() => dispatch({
																						type: 'deleteItem',
																						payload: row,
																						openDeleteModal: true,
																					})}>
																<DeleteIcon fontSize="small"/>
															</IconButton>
														</Tooltip>
													</TableCell>
												} else if (column.id === 'restInStock') {
													return <TableCell key={column.id} align={column.align}
																						className={itemEndsDanger(row.restInStock)}>
														{value}
													</TableCell>
												} else {
													if (column.format && typeof value === 'number') {
														return <TableCell key={column.id} align={column.align}>
															{column.format(value)}
														</TableCell>
													} else if (Array.isArray(value)) {
														return <TableCell key={column.id} align={column.align}>
															{value.map(i => i.title)}
														</TableCell>
													} else {
														return <TableCell key={column.id} align={column.align}>
															{typeof value === 'object' ? '' : value}
														</TableCell>
													}

												}
											})}
										</TableRow>
									)
								},
							)}
						</TableBody>
					</Table>
				</div>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={products.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'previous page',
					}}
					nextIconButtonProps={{
						'aria-label': 'next page',
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>

				<>{state.openEditModal ? (
						<Modal data={state}>
							<ModalInput data={state} name={'Correct ingredient'} open={{ openEditModal: true }}/>
							<DialogActions>
								<Button autoFocus color="primary" onClick={() => dispatch({
									type: 'closeModal',
									payload: initState.product,
									openEditModal: false,
								})}>
									Закрыть
								</Button>
								<Button color="primary" onClick={() => handlerUpdateNRequest(_id, state.product)}>
									Сохранить изменения
								</Button>
							</DialogActions>
						</Modal>)
					: null
				}

					{state.openDeleteModal ? (
							<Modal data={state}>
								<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
									Удаление
								</DialogTitle>
								<DialogContentText>
									Вы уверены?
								</DialogContentText>
								<DialogActions>
									<Button autoFocus color="primary" onClick={() => dispatch({
										type: 'closeModal',
										payload: initState.product,
										openEditModal: false,
									})}>
										Закрыть
									</Button>
									<Button color="primary" onClick={() => handleDeleteItemNRequest(_id)}>
										Удалить
									</Button>
								</DialogActions>
							</Modal>)
						: null}

					{state.openCreateModal ? (
							<Modal data={state}>
								<ModalInput name={'Create ingredient'} open={{ openCreateModal: true }}/>
								<DialogActions>
									<Button autoFocus color="primary" onClick={() => dispatch({
										type: 'closeModal',
										payload: initState.product,
										openCreateModal: false,
									})}>
										Закрыть
									</Button>
									<Button color="primary" onClick={() => handleCreatItemNRequest(state.product)}>
										Сохранить изменения
									</Button>
								</DialogActions>
							</Modal>)
						: null}
				</>
				{state.openCreateListModal ? <Modal data={state}>

					</Modal>
					: null}
			</Paper>
		</Context.Provider>
	)
}