import React, { useCallback, useEffect, useReducer, useState } from 'react'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CardItem from './CardItem'
import { Context } from '../../../context/tableContext'
import reducer from './cardLocalReduser'
import DeleteIcon from '@material-ui/core/SvgIcon/SvgIcon'

import {
	useStyles,
	useStylesTheme,
	CssCard,
	ColorButton,
	CssDivider,
} from './CardCss'
import PropTypes from 'prop-types'

export default function MediaCard(props) {

	const [secondary, setSecondary] = React.useState(false)
	const classes = useStyles()
	const classesTheme = useStylesTheme()

	const {
		products,
		handleDeleteItem,
		handlerUpdateItem,
		orderCategories,
		handlerUpdateItemStoke,
		cardRef,
		setHardHeight,
		handleMoveToArchive,
		handleChangeState,
		orderCategoriesArchive,
		orderCategoriesProgress
	} = props

	const initState = {
		products: products.order,
		editingOrder: products.editingOrder,
		pendingOrder: products.pendingOrder,
		orderHasArrived: products.orderHasArrived,
	}


	const [state, dispatch] = useReducer(reducer, initState)

	/**
	 * @desc Функция useEffect для удаления карточки если в ней количество элементов становится равным 0
	 */

	useEffect(() => {
		if (state.products.length <= 0) {
			handleDeleteItem(products._id)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.products.length])

	/**
	 * @desc Функция для обновление количество элементов для заказа и присвоение состояния( находится в Заказе) REST API(UPDATE: /your-link/:itemId) запрос в базу данных обновление
	 * @desc useReducer - dispatch обновления состояния product и изменения состояния
	 * @param {string} id
	 * @param {Object} data обьект с полями для обновление
	 */

	const handleUpdateDataItem = (id, data) => {

		const newOrderCategories = orderCategories.filter(item => item.title === 'inProgress')

		dispatch({
			type: 'saveNewItem',
			editingOrder: false,
			pendingOrder: true,
			orderHasArrived: false,
			payload: state.products,
		})

		const newData = {
			order: data,
			orderCategory: newOrderCategories[0],
			editingOrder: false,
			pendingOrder: true,
			orderHasArrived: false,
		}
		handlerUpdateItem(id, newData)

		handleChangeState(id, newData)
	}

	/**
	 * @desc Функция для обновление состояния( С находится в Заказе на Заказ принят) REST API(UPDATE: /your-link/:itemId) запрос в базу данных обновление
	 * @desc useReducer - dispatch обновления состояния на Заказ принят
	 * @param {string} id
	 * @param {Object} data обьект с полями для обновление
	 */

	const handleEnterOrderItem = (id, data) => {
		const newOrderCategories = orderCategories.filter(item => item.title === 'inProgress')

		dispatch({
			type: 'saveNewItem',
			editingOrder: false,
			pendingOrder: false,
			orderHasArrived: true,
			payload: state.products,
		})

		const newData = {
			order: data,
			orderCategory: newOrderCategories[0],
			editingOrder: false,
			pendingOrder: false,
			orderHasArrived: true,
		}

		handlerUpdateItem(id, newData)

		handleChangeState(id, newData)
	}

	/**
	 * @desc Функция для обновление количество элементов на склада и присвоение состояния( Архив ) REST API(UPDATE: /your-link/:itemId) запрос в базу данных обновление
	 * @desc useReducer - dispatch обновления состояния на Архив
	 * @param e
	 * @param {string} id
	 * @param {Object} data обьект с полями для обновление
	 */

	const handleArchiveOrderItem = (e, id, data) => {

		const newOrderCategories = orderCategories.filter(item => item.title === 'archive')

		const newData = {
			order: data,
			orderCategory: newOrderCategories[0],
			editingOrder: state.editingOrder,
			pendingOrder: state.pendingOrder,
			orderHasArrived: state.orderHasArrived,
		}

		handlerUpdateItem(id, newData)

		handlerUpdateItemStoke(newData.order)

		handleMoveToArchive(id, newData)

	}

	/**
	 * @desc Функция для удаления элемента с карточки
	 * @param {string} id
	 */

	const handleRemoveItem = id => {
		handleDeleteItem(id)
	}

	/**
	 * @desc Функция для получения Dom-node Card-content , динамическое изменения сетки от размеров Card
	 */
	const cardRefHeight = useCallback(node => {
		async function changeHeight() {
			if (node !== null) {
				const nodeHeight = await parseInt(window.getComputedStyle(node).getPropertyValue('height'))
				setHardHeight(nodeHeight)
			}
		}

		changeHeight()

	}, [secondary])

	const handleHiddenItem = () => (typeof products.orderCategory === 'object' ? products.orderCategory._id : products.orderCategory) !== orderCategoriesArchive && state.orderHasArrived
	const handleHiddenText = () => (typeof products.orderCategory === 'object' ? products.orderCategory._id : products.orderCategory) !== orderCategoriesArchive


	return (
		<Context.Provider value={{
			dispatch, state,
		}}>
			<CssCard className={classes.cardContainer} className={'item'} ref={cardRef}>
				<div className={'content'}>
					<FormGroup row className={classes.cardHeader}>
						<FormControlLabel
							control={
								<Checkbox
									checked={secondary}
									onChange={e => setSecondary(e.target.checked)}
									value="secondary"
									disabled={!!state.pendingOrder}
									color='primary'
									className={classes.CardCheckbox}
								/>
							}
							label={handleHiddenText() ? "Editing amount": "Looking amount"}
						/>
						{
							state.editingOrder && (<svg className={classes.CardSvgEdit}
																					viewBox="0 0 240.162 240.162"
								>
									<g>
										<path
											d="m39.818,72.494h97.652c3.866,0 7-3.134 7-7s-3.134-7-7-7h-97.652c-3.866,0-7,3.134-7,7s3.134,7 7,7z"/>
										<path
											d="m39.818,96.543h97.652c3.866,0 7-3.134 7-7s-3.134-7-7-7h-97.652c-3.866,0-7,3.134-7,7s3.134,7 7,7z"/>
										<path
											d="m91.477,178.738h-51.659c-3.866,0-7,3.134-7,7s3.134,7 7,7h51.658c3.866,0 7-3.134 7-7s-3.133-7-6.999-7z"/>
										<path
											d="m236.763,20.911l-20.58-12.348c-1.592-0.955-3.498-1.24-5.299-0.789-1.801,0.45-3.35,1.598-4.305,3.189l-35.829,59.714v-42.32c0-3.866-3.134-7-7-7h-156.75c-3.866,0-7,3.134-7,7v197.24c0,3.866 3.134,7 7,7h156.75c3.866,0 7-3.134 7-7v-81.062l68.414-114.02c1.989-3.315 0.914-7.614-2.401-9.604zm-90.402,137.061l-11.617,9.643 3.042-14.788 67.152-111.917 8.575,5.145-67.152,111.917zm74.355-123.922l-8.575-5.145 2.842-4.736 8.575,5.145-2.842,4.736zm-206.716,184.547v-183.24h142.75v58.653l-12.363,20.604c0.049-0.335 0.083-0.674 0.083-1.022 0-3.866-3.134-7-7-7h-97.652c-3.866,0-7,3.134-7,7s3.134,7 7,7h97.652c1.559,0 2.993-0.516 4.156-1.377l-6.856,11.426h-94.952c-3.866,0-7,3.134-7,7s3.134,7 7,7h86.552l-1.204,2.006c-0.406,0.677-0.695,1.418-0.854,2.191l-1.203,5.851h-83.291c-3.866,0-7,3.134-7,7s3.134,7 7,7h80.411l-3.217,15.639c-0.599,2.911 0.706,5.883 3.255,7.413 1.114,0.668 2.36,0.998 3.601,0.998 1.597,0 3.185-0.545 4.472-1.614l27.88-23.142c0.191-0.159 0.357-0.344 0.53-0.521v51.135h-142.75z"/>
									</g>
								</svg>
							)																												//состояние - редактирование предзаказом
						}
						{
							state.pendingOrder && (<svg className={classes.CardSvgInProgress}
																					viewBox="0 0 345.834 345.834">
								<g>
									<path d="M339.798,260.429c0.13-0.026,0.257-0.061,0.385-0.094c0.109-0.028,0.219-0.051,0.326-0.084
		c0.125-0.038,0.247-0.085,0.369-0.129c0.108-0.039,0.217-0.074,0.324-0.119c0.115-0.048,0.226-0.104,0.338-0.157
		c0.109-0.052,0.22-0.1,0.327-0.158c0.107-0.057,0.208-0.122,0.312-0.184c0.107-0.064,0.215-0.124,0.319-0.194
		c0.111-0.074,0.214-0.156,0.321-0.236c0.09-0.067,0.182-0.13,0.27-0.202c0.162-0.133,0.316-0.275,0.466-0.421
		c0.027-0.026,0.056-0.048,0.083-0.075c0.028-0.028,0.052-0.059,0.079-0.088c0.144-0.148,0.284-0.3,0.416-0.46
		c0.077-0.094,0.144-0.192,0.216-0.289c0.074-0.1,0.152-0.197,0.221-0.301c0.074-0.111,0.139-0.226,0.207-0.34
		c0.057-0.096,0.118-0.19,0.171-0.289c0.062-0.115,0.114-0.234,0.169-0.351c0.049-0.104,0.101-0.207,0.146-0.314
		c0.048-0.115,0.086-0.232,0.128-0.349c0.041-0.114,0.085-0.227,0.12-0.343c0.036-0.118,0.062-0.238,0.092-0.358
		c0.029-0.118,0.063-0.234,0.086-0.353c0.028-0.141,0.045-0.283,0.065-0.425c0.014-0.1,0.033-0.199,0.043-0.3
		c0.025-0.249,0.038-0.498,0.038-0.748V92.76c0-4.143-3.357-7.5-7.5-7.5h-236.25c-0.066,0-0.13,0.008-0.196,0.01
		c-0.143,0.004-0.285,0.01-0.427,0.022c-0.113,0.009-0.225,0.022-0.337,0.037c-0.128,0.016-0.255,0.035-0.382,0.058
		c-0.119,0.021-0.237,0.046-0.354,0.073c-0.119,0.028-0.238,0.058-0.356,0.092c-0.117,0.033-0.232,0.069-0.346,0.107
		c-0.117,0.04-0.234,0.082-0.349,0.128c-0.109,0.043-0.216,0.087-0.322,0.135c-0.118,0.053-0.235,0.11-0.351,0.169
		c-0.099,0.051-0.196,0.103-0.292,0.158c-0.116,0.066-0.23,0.136-0.343,0.208c-0.093,0.06-0.184,0.122-0.274,0.185
		c-0.106,0.075-0.211,0.153-0.314,0.235c-0.094,0.075-0.186,0.152-0.277,0.231c-0.09,0.079-0.179,0.158-0.266,0.242
		c-0.099,0.095-0.194,0.194-0.288,0.294c-0.047,0.05-0.097,0.094-0.142,0.145c-0.027,0.03-0.048,0.063-0.074,0.093
		c-0.094,0.109-0.182,0.223-0.27,0.338c-0.064,0.084-0.13,0.168-0.19,0.254c-0.078,0.112-0.15,0.227-0.222,0.343
		c-0.059,0.095-0.12,0.189-0.174,0.286c-0.063,0.112-0.118,0.227-0.175,0.342c-0.052,0.105-0.106,0.21-0.153,0.317
		c-0.049,0.113-0.092,0.23-0.135,0.345c-0.043,0.113-0.087,0.225-0.124,0.339c-0.037,0.115-0.067,0.232-0.099,0.349
		c-0.032,0.12-0.066,0.239-0.093,0.36c-0.025,0.113-0.042,0.228-0.062,0.342c-0.022,0.13-0.044,0.26-0.06,0.39
		c-0.013,0.108-0.019,0.218-0.027,0.328c-0.01,0.14-0.019,0.28-0.021,0.421c-0.001,0.041-0.006,0.081-0.006,0.122v46.252
		c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-29.595l66.681,59.037c-0.348,0.245-0.683,0.516-0.995,0.827l-65.687,65.687v-49.288
		c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v9.164h-38.75c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h38.75v43.231
		c0,4.143,3.357,7.5,7.5,7.5h236.25c0.247,0,0.494-0.013,0.74-0.037c0.115-0.011,0.226-0.033,0.339-0.049
		C339.542,260.469,339.67,260.454,339.798,260.429z M330.834,234.967l-65.688-65.687c-0.042-0.042-0.087-0.077-0.13-0.117
		l49.383-41.897c3.158-2.68,3.546-7.412,0.866-10.571c-2.678-3.157-7.41-3.547-10.571-0.866l-84.381,71.59l-98.444-87.158h208.965
		V234.967z M185.878,179.888c0.535-0.535,0.969-1.131,1.308-1.765l28.051,24.835c1.418,1.255,3.194,1.885,4.972,1.885
		c1.726,0,3.451-0.593,4.853-1.781l28.587-24.254c0.26,0.38,0.553,0.743,0.89,1.08l65.687,65.687H120.191L185.878,179.888z"/>
									<path d="M7.5,170.676h126.667c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H7.5c-4.143,0-7.5,3.357-7.5,7.5
		S3.357,170.676,7.5,170.676z"/>
									<path d="M20.625,129.345H77.5c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H20.625c-4.143,0-7.5,3.357-7.5,7.5
		S16.482,129.345,20.625,129.345z"/>
									<path
										d="M62.5,226.51h-55c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h55c4.143,0,7.5-3.357,7.5-7.5S66.643,226.51,62.5,226.51z"
									/>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
							</svg>) 													//состояние - ожидание заказа
						}
						{
							state.orderHasArrived && (<svg className={classes.CardSvgCompleted}
																						 viewBox="0 0 491.695 491.695"
							>
								<g>
									<path d="M436.714,0H149.471c-16.438,0-29.812,13.374-29.812,29.812v66.714c-54.49,15.594-94.489,65.857-94.489,125.288
c0,59.431,39.998,109.694,94.489,125.288v114.783c0,16.438,13.374,29.812,29.812,29.812h234.733c2.785,0,5.455-1.106,7.425-3.075
l71.821-71.822c1.969-1.969,3.075-4.64,3.075-7.425V29.812C466.525,13.374,453.152,0,436.714,0z M149.471,21h287.243
c4.858,0,8.811,3.953,8.811,8.812v31.689H140.659V29.812C140.659,24.953,144.612,21,149.471,21z M46.17,221.813
c0-60.263,49.027-109.29,109.29-109.29c60.263,0,109.29,49.027,109.29,109.29s-49.027,109.291-109.29,109.291
C95.197,331.104,46.17,282.076,46.17,221.813z M140.659,461.884V351.258c4.86,0.552,9.797,0.846,14.802,0.846
c39.135,0,74.292-17.347,98.195-44.752h64.336c5.799,0,10.5-4.701,10.5-10.5s-4.701-10.5-10.5-10.5h-49.381
c9.133-15.95,14.984-34.005,16.644-53.242h32.736c5.799,0,10.5-4.701,10.5-10.5c0-5.799-4.701-10.5-10.5-10.5h-32.603
c-1.42-19.194-7.02-37.242-15.886-53.241h48.488c5.799,0,10.5-4.701,10.5-10.5c0-5.799-4.701-10.5-10.5-10.5h-62.974
c-23.918-28.323-59.67-46.347-99.558-46.347c-5.005,0-9.942,0.294-14.802,0.846v-9.867h304.866v316.372h-42.009
c-16.439,0-29.811,13.374-29.811,29.811v42.011H149.471C144.612,470.695,140.659,466.743,140.659,461.884z M394.705,455.845v-27.16
c0-4.859,3.953-8.811,8.811-8.811h27.16L394.705,455.845z"/>
									<path d="M359.246,158.869h34.87c5.799,0,10.5-4.701,10.5-10.5c0-5.799-4.701-10.5-10.5-10.5h-34.87c-5.799,0-10.5,4.701-10.5,10.5
C348.746,154.168,353.447,158.869,359.246,158.869z"/>
									<path d="M359.246,233.11h34.87c5.799,0,10.5-4.701,10.5-10.5c0-5.799-4.701-10.5-10.5-10.5h-34.87c-5.799,0-10.5,4.701-10.5,10.5
C348.746,228.409,353.447,233.11,359.246,233.11z"/>
									<path d="M359.246,307.352h34.87c5.799,0,10.5-4.701,10.5-10.5s-4.701-10.5-10.5-10.5h-34.87c-5.799,0-10.5,4.701-10.5,10.5
S353.447,307.352,359.246,307.352z"/>
									<path d="M394.116,381.593c5.799,0,10.5-4.701,10.5-10.5s-4.701-10.5-10.5-10.5h-98.225c-5.799,0-10.5,4.701-10.5,10.5
s4.701,10.5,10.5,10.5H394.116z"/>
									<path d="M236.982,168.845l-12.81-12.81c-3.45-3.449-8.036-5.349-12.915-5.349s-9.465,1.9-12.915,5.349l-67.19,67.19l-18.573-18.573
c-3.449-3.448-8.036-5.348-12.914-5.348c-4.878,0-9.465,1.9-12.914,5.349l-12.813,12.812c-7.12,7.121-7.12,18.708,0.001,25.829
l44.297,44.296c3.45,3.451,8.037,5.351,12.916,5.351c0,0,0.001,0,0.001,0c4.878,0,9.465-1.9,12.913-5.349l92.917-92.917
C244.103,187.554,244.103,175.966,236.982,168.845z M131.151,270.807l-40.429-40.428l8.942-8.942l24.062,24.062
c4.101,4.101,10.749,4.101,14.85,0l72.681-72.681l8.942,8.942L131.151,270.807z"/>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
								<g>
								</g>
							</svg>)										//состояние - перенесение в архив
						}
					</FormGroup>
					<CssDivider variant="middle"/>
					<CardActionArea component="div">
						<DeleteIcon/>
						<CardContent ref={cardRefHeight}>
							<Typography gutterBottom variant="h5" component="h2">
								{handleHiddenText() ? 'Correct order list' : 'Archive report'}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="div">
								<div className={classesTheme.demo} >
									<List>
										{
											state.products.length > 0 && state.products.map(itemList => {
												return <CardItem itemList={itemList}
																				 classes={classes}
																				 secondary={secondary}
																				 key={itemList._id}
																				 productsOrderCategory={products.orderCategory}
																				 orderCategoriesProgress={orderCategoriesProgress}
												/>
											})
										}
									</List>
								</div>
							</Typography>
						</CardContent>
					</CardActionArea>
					<CssDivider variant="middle"/>
					<CardActions>
						{state.editingOrder && <ColorButton type='button'
																								size="small"                                                                  //кнопка для редактирования заказа
																								color="primary"
																								onClick={() => handleUpdateDataItem(products._id, state.products)}>
							Send order list
						</ColorButton>}
						{state.pendingOrder && <ColorButton type='button'
																								size="small"                                                                  //кнопка для принятия заказа
																								color="primary"
																								onClick={() => handleEnterOrderItem(products._id, state.products)}>
							Enter order
						</ColorButton>}
						{handleHiddenItem() && state.orderHasArrived ? (
							<ColorButton type='button'
													 size="small"                                                              //кнопка для отправки в архив
													 color="primary"
													 onClick={e => handleArchiveOrderItem(e, products._id, state.products)}>
								Save order Archive
							</ColorButton>) : null}
						<ColorButton type='button'
												 size="small"
												 color="primary"
												 onClick={() => handleRemoveItem(products._id)}
												 disabled={!!state.pendingOrder}>
							Delete order list
						</ColorButton>
					</CardActions>
				</div>
			</CssCard>
		</Context.Provider>
	)
}


MediaCard.propTypes = {
	products: PropTypes.object,
	orderCategories: PropTypes.array,
	handleDeleteItem: PropTypes.func,
	handlerUpdateItem: PropTypes.func,
	handlerUpdateItemStoke: PropTypes.func,
}
