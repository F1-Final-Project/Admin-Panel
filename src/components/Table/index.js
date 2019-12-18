import React, { useReducer, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import Checkbox from '@material-ui/core/Checkbox'

import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Modal from '../common/Modal'
import { Context } from '../../context/tableContext'
import reducer from './localTableReducer'

import * as sorted from '../../lib/sorted'
import * as columnName from '../../lib/columnTableName'
import ModalInput from '../common/Modal/ModalInput'
import THead from './TableHead'
import Toolbar from './ToolBar'
import { useStyles, ColorButton, TableIconButton } from './TableCSS'
import PropTypes from 'prop-types'

export default function TableCreated(props) {
	const classes = useStyles()

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const {
		products,
		handleDeleteItem,
		handlerUpdateItem,
		handlerCreateItem,
		handlerCreateOrderItem,
		orderCategories,
		productsIngredient,
		dataCategories,
		openCheckBoxList,
	} = props

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
		transferListItem: productsIngredient,
		transferListItemSearch: productsIngredient,
		search: { ingredients: '', additionalIngredients: '' },
		dataCategoriesItem: dataCategories,
	}


	const [state, dispatch] = useReducer(reducer, initState)
	const { _id = '' } = state.product


	/**
	 * @desc Функция для переключения станичек по нажатию на кнопку
	 * @param {Event} event
	 * @param {Number} newPage номер страницы
	 */

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	/**
	 * @desc Функция для изменения количества строк в таблице
	 * @param {Event} event.target
	 */

	const handleChangeRowsPerPage = event => {

		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	/**
	 * @desc Функция для удаления элемента c таблицы и REST API(Delete: /your-link/:ItemId) запрос в базу данных удаление
	 * @desc useReducer - dispatch обнуления состояния product и закрытия модального окна
	 * @param {string} id
	 */

	const handleDeleteItemNRequest = id => {

		handleDeleteItem(id)

		dispatch({
			type: 'closeModal',
			payload: initState.product,
			openEditModal: false,
		})
	}

	/**
	 * @desc Функция для обновление элемента c таблицы и REST API(UPDATE: /your-link/:itemId) запрос в базу данных обновление
	 * @desc useReducer - dispatch обновления состояния product и закрытия модального окна
	 * @param {string} id
	 * @param {Object} data обьект с полями для обновление
	 */

	const handlerUpdateNRequest = (id, data) => {

		handlerUpdateItem(id, data)

		dispatch({
			type: 'saveNewItem',
			payload: state.product,
			openEditModal: false,
		})
	}

	/**
	 * @desc Функция для создания элемента в таблице и REST API(POST: /your-link) запрос в базу данных создания
	 * @desc useReducer - dispatch обновления состояния product и создания полей для новой записи
	 * @param {Object} data обьект с полями для создания
	 */

	const handleCreatItemNRequest = (data) => {

		handlerCreateItem(data)

		dispatch({
			type: 'onChangeInput',
			products: state.product,
			openCreateModal: false,
		})
	}

	/**
	 * @desc Функция для выбора групп чекбоксов
	 * @desc useReducer - dispatch обновления состояния checkedProduct и создания массива выбраных элементов
	 * @param e - event
	 * @param {Object} currentElementInTable выбраный элемент
	 */

	let handleSelectItem = (e, currentElementInTable) => {

		const productsItems = state.checkedProduct

		if (e.target.checked && Array.isArray(productsItems)) {
			productsItems.push(currentElementInTable)
		} else if (Array.isArray(productsItems)) {
			const index = productsItems.findIndex(i => i.id === currentElementInTable.id)
			productsItems.splice(index, 1)
		}

		dispatch({
			type: 'selectItems',
			payload: productsItems,
		})
	}

	/**
	 * @desc Функция для состояния чекбоксов включен/выключен
	 * @desc useReducer - dispatch обновления состояния чекбоксов
	 * @param event
	 * @param {Object} currentElementInTable выбраный элемент
	 */

	const handleClickCheckedItem = (event, currentElementInTable) => {

		const selectedIndex = state.checkBoxActive.indexOf(currentElementInTable)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(state.checkBoxActive, currentElementInTable)
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

	/**
	 * @desc Функция для checked чекбоксо
	 * @param {Object} currentElementInTable выбраный элемент
	 */
	const isSelected = currentElementInTable => state.checkBoxActive.indexOf(currentElementInTable) !== -1

	/**
	 * @desc Функция для checked чекбоксо
	 * @param {Number} item количество в поле
	 */
	const itemEndsDanger = item => {

		if (item) {
			return item < 30 ? classes.TableCellDanger : classes.tableCell
		}
	}

	/**
	 * @desc Функция для создания заказа из выбранных элементов чекбоксов и REST API(POST: /your-link) запрос в базу данных создания
	 * @desc useReducer - dispatch обнуления состояния checkBoxActive, checkedProduct
	 * @param {Array} data обьект с полями для создания
	 */

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
			<Paper className={classes.tablePaperEffect}>
				<Toolbar numSelected={state.checkBoxActive.length}
								 products={products}
								 creatOrderItem={handleCreatOrderItemNRequest}
								 openCheckBoxList={openCheckBoxList}
				/>
				<div className={classes.tableContainer}>
					<Table className={classes.table}
								 size="small"
								 aria-label="a dense table">
						<THead products={products} classes={classes}/>
						<TableBody>
							{products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {   						// Разделение на страницы таблицы
									const isItemSelected = isSelected(row.title)
									const labelId = `enhanced-table-checkbox-${index}`
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={index} className={classes.tableCellHover}>
											{state.openCheckBox && <TableCell padding="checkbox" key={index} className={classes.tableCell}>
												<Checkbox
													id={row._id}
													inputProps={{ 'aria-labelledby': labelId, }}
													color="#fafafa"
													onChange={e => handleSelectItem(e, row)}
													checked={isItemSelected}
													onClick={event => handleClickCheckedItem(event, row.title)}
													className={classes.tableCheckbox}
												/>
											</TableCell>}
											{columnName.clmns(products).sort(sorted.compare).map(column => {   											// columnName.clmns(products)-сортировка полей для оглавления в таблице
												const value = row[column.id]                                              										  //sort(sorted.compare) - сортировка полей по алфавиту
												if (column.id === 'button') {                                                             			//проверка полей для добавление кнопок в таблицу
													return <TableCell key={column.id}
																						align={column.align}
																						className={classes.tableCell}>
														<Tooltip title="Edit" aria-label="edit">
															<TableIconButton aria-label="edit"
																					className={classes.tableBtnColor}
																					onClick={() => dispatch({
																						type: 'editItem',
																						payload: row,
																						openEditModal: true,
																					})}>
																<EditIcon fontSize="small"/>
															</TableIconButton>
														</Tooltip>
														<Tooltip title="Delete" aria-label="delete">
															<TableIconButton aria-label="delete"
																					className={classes.tableBtnColor}
																					onClick={() => dispatch({
																						type: 'deleteItem',
																						payload: row,
																						openDeleteModal: true,
																					})}>
																<DeleteIcon fontSize="small"/>
															</TableIconButton>
														</Tooltip>
													</TableCell>
												} else if (column.id === 'restInStock') {																												//проверка поля на количество на складе ингредиентов
													return <TableCell key={column.id}
																						align={column.align}                                                        //добовление класса если елемента не достаточно на складе
																						className={itemEndsDanger(row.restInStock)}>
														{value}
													</TableCell>
												} else {
													if (column.format && typeof value === 'number') {																							//проверка если входящие данные числа
														return <TableCell key={column.id}
																							align={column.align}
																							className={classes.tableCell}>
															{column.format(value)}
														</TableCell>
													} else if (Array.isArray(value)) {																														//проверка если входящие данные массив
														return <TableCell key={column.id}
																							align={column.align}
																							className={classes.tableCell}>
															<ul>
																{value.map((i, index) => {
																	return <li key={index}>{i.title}</li>

																})}
															</ul>
														</TableCell>
													} else {
														return <TableCell key={column.id}
																							align={column.align}
																							className={classes.tableCell}>
															{
																typeof value === 'object'
																	? value && value.title ? value.title : ''
																	: value
															}
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
					className={classes.tablePagination}
				/>

				<>{state.openEditModal ? (																																											//модальное окно для редактирования
						<Modal data={state}>
							<ModalInput data={state} nameOFModal={'Correct ingredient'} open={{ openEditModal: true }}/>
							<DialogActions>
								<ColorButton type='button' autoFocus onClick={() => dispatch({
									type: 'closeModal',
									payload: initState.product,
									openEditModal: false,
								})}>
									Закрыть
								</ColorButton>
								<ColorButton  type='button' onClick={() => handlerUpdateNRequest(_id, state.product)}>
									Сохранить изменения
								</ColorButton>
							</DialogActions>
						</Modal>)
					: null
				}

					{state.openDeleteModal ? (                   																																	//модальное окно для удаления
							<Modal data={state}>
								<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
									Удаление
								</DialogTitle>
								<DialogContentText>
									Вы уверены?
								</DialogContentText>
								<DialogActions>
									<ColorButton type='button' autoFocus onClick={() => dispatch({
										type: 'closeModal',
										payload: initState.product,
										openEditModal: false,
									})}>
										Закрыть
									</ColorButton>
									<ColorButton type='button' onClick={() => handleDeleteItemNRequest(_id)}>
										Удалить
									</ColorButton>
								</DialogActions>
							</Modal>)
						: null}

					{state.openCreateModal ? (																																										//модальное окно для создания
							<Modal data={state}>
								<ModalInput nameOFModal={'Create ingredient'} open={{ openCreateModal: true }}/>
								<DialogActions>
									<ColorButton type='button'  autoFocus onClick={() => dispatch({
										type: 'closeModal',
										payload: initState.product,
										openCreateModal: false,
									})}>
										Закрыть
									</ColorButton>
									<ColorButton type='button' onClick={() => handleCreatItemNRequest(state.product)}>
										Сохранить изменения
									</ColorButton>
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

TableCreated.propTypes = {
	products: PropTypes.array,
	handleDeleteItem: PropTypes.func,
	handlerUpdateItem: PropTypes.func,
	handlerCreateItem: PropTypes.func,
	handlerCreateOrderItem: PropTypes.func,
	orderCategories: PropTypes.array,
	productsIngredient: PropTypes.array,
	dataCategories: PropTypes.array,
	openCheckBoxList: PropTypes.bool,
}
