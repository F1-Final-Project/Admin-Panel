import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as orderIngredientAction from '../../store/actions/orderIngredient'
import * as orderCategoriesAction from '../../store/actions/orderCategories'
import Card from '../common/Card'
import * as ingredientAction from '../../store/actions/ingredient'
import { useStyles, CssDivider, CssTabs, CssTab } from './OrderIngredientsCSS'


export default () => {

	const orderIngredients = useSelector(state => state.orderIngredient)
	const orderCategoriesItem = useSelector(state => state.orderCategories)
	const { products, loaded } = orderIngredients
	const { orderCategories, loadedCategories } = orderCategoriesItem
	const [rowGap, setRowGap] = useState(0)
	const [rowHeight, setRowHeight] = useState(0)
	const [cardHeight, setHardHeight] = useState(0)

	const classes = useStyles()


	const dispatch = useDispatch()


	useEffect(() => {
		dispatch(orderIngredientAction.getAllOrderIngredienst())
		dispatch(orderCategoriesAction.getAllOrderCategories())

	}, [dispatch])

	/**
	 * @desc Функция для запроса в базу данных удаления элемента REST API(Delete: /your-link/:ItemId)
	 * @param {string} id
	 */

	const handleDeleteItem = id => {
		dispatch(orderIngredientAction.deleteOrderIngredientById(id))
	}

	/**
	 * @desc Функция для запроса в базу данных редактирования элемента REST API(UPDATE: /your-link/:ItemId)
	 * @param {string} id
	 * @param {Object} data
	 */
	const handlerUpdateItem = (id, data) => {
		dispatch(orderIngredientAction.updateOrderIngredientById(id, data))
	}

	/**
	 * @desc Функция для запроса в базу данных редактирования элементов массива REST API(UPDATE: /your-link/:ItemId)
	 * @param {Object} data
	 */

	const handlerUpdateItemStoke = (data) => {

		if (Array.isArray(data)) {
			data.map(item => dispatch(ingredientAction.updateIngredientById(item._id, item)),
			)
		}

	}

	/**
	 * @desc Функция для получения Dom-node grid, получает значения grid-auto-rows и grid-row-gap
	 */
	const gridRef = useCallback(node => {
		if (node !== null) {
			const rowHeight = parseInt(window.getComputedStyle(node).getPropertyValue('grid-auto-rows'))
			const rowGap = parseInt(window.getComputedStyle(node).getPropertyValue('grid-row-gap'))
			setRowHeight(rowHeight)
			setRowGap(rowGap)
		}

	}, [rowHeight, cardHeight])

	/**
	 * @desc Функция для получения Dom-node Card, устанавливает grid сетку на подобии Google keep
	 */

	const cardRef = useCallback(node => {
		if (node !== null) {
			const rowSpan = Math.ceil((node.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap))
			node.style.gridRowEnd = 'span ' + rowSpan
		}
	}, [rowGap, rowHeight, cardHeight])


	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<div>
			<CssTabs
				value={value}
				onChange={handleChange}
				textColor="primary"
				aria-label="scrollable prevent tabs example"
				centered
			>
				<CssTab label="Order"/>
				<CssTab label="Archive"/>
			</CssTabs>
			<CssDivider/>
			<div className={classes.gridOrder} ref={gridRef}>
				{
					loaded ?
						products.map((itemCard) => {
							return itemCard.editingOrder || itemCard.pendingOrder ? (
									<Card products={itemCard}
												key={itemCard._id}
												orderCategories={orderCategories}
												handleDeleteItem={handleDeleteItem}
												handlerUpdateItem={handlerUpdateItem}
												handlerUpdateItemStoke={handlerUpdateItemStoke}
												loadedCategories={loadedCategories}
												cardRef={cardRef}
												setRowHeight={setRowHeight}
												setHardHeight={setHardHeight}
									/>)
								: (<Card products={itemCard}
												 key={itemCard._id}
												 orderCategories={orderCategories}
												 handleDeleteItem={handleDeleteItem}
												 handlerUpdateItem={handlerUpdateItem}
												 handlerUpdateItemStoke={handlerUpdateItemStoke}
												 loadedCategories={loadedCategories}
												 cardRef={cardRef}
												 setRowHeight={setRowHeight}
												 setHardHeight={setHardHeight}
								/>)

						})

						: <div>Loading...</div>
				}
			</div>
		</div>
	)

}
