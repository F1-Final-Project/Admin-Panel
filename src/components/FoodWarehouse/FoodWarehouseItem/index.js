import React, { useEffect, useReducer, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Modal from '../../common/Modal'
import { Context } from '../../../context/tableContext'
import reducer from './localTableReducer'

import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'

const columns = [
	{ id: 'title', label: 'Название', minWidth: 170 },
	{ id: 'price', label: 'Цена', minWidth: 100 },
	{ id: 'restInStock', label: 'Количество на складе', minWidth: 170, align: 'center' },
	{ id: 'description', label: 'Описание', minWidth: 170, align: 'right' },
	{ id: 'button', label: 'Редактирование', minWidth: 170 },
]

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
}))

export default (props) => {
	const classes = useStyles()

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const [state, dispatch] = useReducer(reducer, {
		open: false,
		product: [],
		openDeleteModal: false,
		openCreateItem: false,
	})

	const { products, handleDeleteItem, handlerUpdateItem, handlerCreateItem } = props

	const { title = '', description = '', restInStock = null, price = null, _id = '' } = state.product

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	const handlerDeleteNClose = id => {
		handleDeleteItem(id)

		dispatch({
			type: 'close',
			open: false,
		})
	}
	const handlerUpdateNClose = (id, date) => {
		handlerUpdateItem(id, date)

		dispatch({
			type: 'save',
			payload: state.product,
			open: false,
		})
	}


	const handleChangeIngredient = e => {
		dispatch({
			type: 'onChangeInput',
			payload: { [e.target.name]: e.target.value },
			open: true,
		})
	}

	const handleCreatNCloseIngredient = (data) => {
		handlerCreateItem(data)
		dispatch({
			type: 'onChangeInput',
			payload: state.product,
			openCreateItem: false,
		})
	}

	const handleCreateNewIngredient = e => {
		dispatch({
			type: 'onChangeInput',
			payload: { [e.target.name]: e.target.value },
			openCreateItem: true,
		})
	}

	console.log('RELAD---->', products)

	return (
		<Context.Provider value={{}}>
			<Paper className={classes.paper}>
				<div className={classes.root}>
					<Table className={classes.table} size="small" aria-label="a dense table">
						<TableHead className={classes.tHeader}>
							<TableRow>
								{columns.map(column => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
										{columns.map(column => {
											const value = row[column.id]
											return (
												column.id === 'button'
													? <TableCell key={column.id} align={column.align}>
														<Tooltip title="Edit" aria-label="edit">
															<IconButton aria-label="edit" className={classes.margin}
																					onClick={() => dispatch({
																						type: 'edit',
																						payload: row,
																						open: true,
																					})}>
																<EditIcon fontSize="small"/>

															</IconButton>
														</Tooltip>
														<Tooltip title="Delete" aria-label="delete">
															<IconButton aria-label="delete" className={classes.margin} className={classes.margin}
																					onClick={() => dispatch({
																						type: 'deleteModal',
																						payload: row,
																						openDeleteModal: true,
																					})}>
																<DeleteIcon fontSize="small"/>
															</IconButton>
														</Tooltip>
													</TableCell>
													: <TableCell key={column.id} align={column.align}>
														{column.format && typeof value === 'number' ? column.format(value) : value}
													</TableCell>
											)
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
				<>{state.open ? <Modal data={state}>
					<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
						Изменения ингредиента
					</DialogTitle>
					<DialogContent>
						<form className={classes.container} noValidate autoComplete="off">
							<div>
								<TextField
									id="standard-basic"
									className={classes.textField}
									label="Название"
									name='title'
									margin="normal"
									value={title}
									onChange={handleChangeIngredient}
								/>
								<TextField
									id="standard-number"
									className={classes.textField}
									label="Цена"
									type="number"
									margin="normal"
									name='price'
									value={price}
									onChange={handleChangeIngredient}
									InputLabelProps={{
										shrink: true,
									}}
								/>
								<TextField
									id="standard-number"
									className={classes.textField}
									label="Количество на складе"
									type="number"
									margin="normal"
									name="restInStock"
									value={restInStock}
									onChange={handleChangeIngredient}
									InputLabelProps={{
										shrink: true,
									}}
								/>

								<TextField
									id="standard-basic"
									className={classes.textField}
									label="Описание"
									margin="normal"
									name="description"
									value={description}
									onChange={handleChangeIngredient}
								/>
							</div>
						</form>
					</DialogContent>
					<DialogActions>
						<Button autoFocus color="primary" onClick={() => dispatch({
							type: 'close',
							open: false,
						})}>
							Закрыть
						</Button>
						<Button color="primary" onClick={() => handlerUpdateNClose(_id, state.product)}>
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
									type: 'close',
									open: false,
								})}>
									Закрыть
								</Button>
								<Button color="primary" onClick={() => handlerDeleteNClose(_id)}>
									Удалить
								</Button>
							</DialogActions>
						</Modal>
						: null}
					{state.openCreateItem ? <Modal data={state}>
						<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
							Изменения ингредиента
						</DialogTitle>
						<DialogContent>
							<form className={classes.container} noValidate autoComplete="off">
								<div>
									<TextField
										id="standard-basic"
										className={classes.textField}
										label="Название"
										name='title'
										margin="normal"
										value={title}
										onChange={handleCreateNewIngredient}
									/>
									<TextField
										id="standard-number"
										className={classes.textField}
										label="Цена"
										type="number"
										margin="normal"
										name='price'
										value={price}
										onChange={handleCreateNewIngredient}
										InputLabelProps={{
											shrink: true,
										}}
									/>
									<TextField
										id="standard-number"
										className={classes.textField}
										label="Количество на складе"
										type="number"
										margin="normal"
										name="restInStock"
										value={restInStock}
										onChange={handleCreateNewIngredient}
										InputLabelProps={{
											shrink: true,
										}}
									/>

									<TextField
										id="standard-basic"
										className={classes.textField}
										label="Описание"
										margin="normal"
										name="description"
										value={description}
										onChange={handleCreateNewIngredient}
									/>
								</div>
							</form>
						</DialogContent>
						<DialogActions>
							<Button autoFocus color="primary" onClick={() => dispatch({
								type: 'close',
								openCreateItem: false,
							})}>
								Закрыть
							</Button>
							<Button color="primary" onClick={() => handleCreatNCloseIngredient( state.product)}>
								Сохранить изменения
							</Button>
						</DialogActions>
					</Modal> : null}
				</>
				<Button variant="contained" color="primary" className={classes.button} onClick={() => dispatch({
					type: 'openCreateItem',
					payload: [],
					openCreateItem: true,
				})}>
					Primary
				</Button>
			</Paper>
		</Context.Provider>
	)
}