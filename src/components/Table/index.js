import React, { useReducer, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
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

import * as sorted from '../../lib/sortColums'
import * as columnName from '../../lib/columnTableName'
import ModalInput from '../common/Modal/ModalInput'
import THead from './TableHead'
import Toolbar from './ToolBar'


const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100%',
	},
	paper: {
		marginTop: theme.spacing(3),
		width: '95%',
		height: '100%',
		overflowX: 'auto',
		marginBottom: theme.spacing(2),
		margin: '0 auto',
	},
	table: {
		minWidth: 320,

	},
	fab: {
		margin: theme.spacing(1),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	margin: {
		color: 'black',
	},
	tHeader: {
		backgroundColor: '#bdbdbd',
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
}))

export default (props) => {
	const classes = useStyles()

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [checkBoxSelect, setCheckBoxSelect] = useState(true)

	const { products, handleDeleteItem, handlerUpdateItem, handlerCreateItem } = props

	const [state, dispatch] = useReducer(reducer, {
		openEditModal: false,
		product: [sorted.inputItems(products)],
		openDeleteModal: false,
		openCreateModal: false,
		selectItem: false,
	})
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
		const productsItems = state.product

		console.log('eeeee', productsItems)

		if (e.target.checked) {
			productsItems.push(name)
		} else {
			const index = productsItems.findIndex(i => i.id === name.id);
			productsItems.splice(index, 1);
		}

		dispatch({
			type: 'selectItems',
			payload: productsItems,
		})
	}


	//
	// const handleCreateNewIngredient = e => {
	// 	dispatch({
	// 		type: 'onChangeInput',
	// 		payload: { [e.target.name]: e.target.value },
	// 		openCreateModal: true,
	// 	})
	// }

	const checked = rowID => {
		if (Array.isArray(state.product)) {
			state.product.find(i => {
				if (!_id) {
					return false
				} else {
					return i._id === rowID._id
				}
			})
		}
	}

	return (
		<Context.Provider value={{
			dispatch, state,
		}}>
			<Paper className={classes.paper}>
				<Toolbar/>
				<div className={classes.root}>
					<Table className={classes.table} size="small" aria-label="a dense table">
						<THead products={products} classes={classes} checkBoxSelect={checkBoxSelect}/>
						<TableBody>
							{products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
										{checkBoxSelect && <TableCell padding="checkbox">
											<Checkbox
												id={row._id}
												onChange={e => handleSelectItem(e, row)}
												checked={checked(row._id)}
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
							})}
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

				<>{state.openEditModal ? <Modal data={state}>
					<ModalInput data={state} name={'Correct ingredient'} open={{ openEditModal: true }}/>
					<DialogActions>
						<Button autoFocus color="primary" onClick={() => dispatch({
							type: 'closeModal',
							openEditModal: false,
						})}>
							Закрыть
						</Button>
						<Button color="primary" onClick={() => handlerUpdateNRequest(_id, state.product)}>
							Сохранить изменения
						</Button>
					</DialogActions>
				</Modal> : null}

					{state.openDeleteModal
						? <Modal data={state}>
							<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
								Удаление
							</DialogTitle>
							<DialogContentText>
								Вы уверены?
							</DialogContentText>
							<DialogActions>
								<Button autoFocus color="primary" onClick={() => dispatch({
									type: 'closeModal',
									openEditModal: false,
								})}>
									Закрыть
								</Button>
								<Button color="primary" onClick={() => handleDeleteItemNRequest(_id)}>
									Удалить
								</Button>
							</DialogActions>
						</Modal>
						: null}

					{state.openCreateModal ? <Modal data={state}>
						<ModalInput name={'Create ingredient'} open={{ openCreateModal: true }}/>

						<DialogActions>
							<Button autoFocus color="primary" onClick={() => dispatch({
								type: 'closeModal',
								openCreateModal: false,
							})}>
								Закрыть
							</Button>
							<Button color="primary" onClick={() => handleCreatItemNRequest(state.product)}>
								Сохранить изменения
							</Button>
						</DialogActions>
					</Modal> : null}
				</>
				<Button variant="contained" color="primary" className={classes.button} onClick={() => dispatch({
					type: 'openCreateModal',
					payload: state.product,
					openCreateModal: true,
				})}>
					Create
				</Button>
				<Button variant="contained" color="primary" className={classes.button}
								onClick={() => setCheckBoxSelect(checkBoxSelect)}>
					Select
				</Button>
			</Paper>
		</Context.Provider>
	)
}