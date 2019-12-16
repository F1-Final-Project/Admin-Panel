import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as ingredientAction from '../../store/actions/ingredient'
import * as orderIngredientAction from '../../store/actions/orderIngredient'
import Ingredient from '../Table'
import * as orderCategoriesAction from '../../store/actions/orderCategories'
import useTest from '../../customHooks/useIngredientInStoke'
import PushAPI from '../../services/PushNotificationAPI'
import PropTypes from 'prop-types'

export default function FoodWareHouse ()  {

	const ingredients = useSelector(state => state.ingredient)
	const { products, loaded } = ingredients
	const orderCategoriesItem = useSelector(state => state.orderCategories)
	const { orderCategories, loadedCategories } = orderCategoriesItem
	const numIngredientInStoke = useTest(products)
	const [openCheckBox, setOpenCheckBox] = useState(true)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(ingredientAction.getAllIngredienst())
		dispatch(orderCategoriesAction.getAllOrderCategories())

	}, [dispatch])

	/**
	 * @desc Функция для запроса в базу данных удаления элемента REST API(Delete: /your-link/:ItemId)
	 * @param {string} id
	 */

	const handleDeleteItem = id => {
		dispatch(ingredientAction.deleteIngredientById(id))
	}

	/**
	 * @desc Функция для запроса в базу данных редактирования элемента REST API(UPDATE: /your-link/:ItemId)
	 * @param {string} id
	 * @param {Object} data
	 */

	const handlerUpdateItem = (id, data) => {
		dispatch(ingredientAction.updateIngredientById(id, data))

		return sendPush()
	}

	/**
	 * @desc Функция для запроса в базу данных создания элемента REST API(Post: /your-link/:ItemId) з
	 * @param {Object} data
	 */

	const handlerCreateItem = data => {
		dispatch(ingredientAction.addIngredient(data))
	}

	/**
	 * @desc Функция для запроса в базу данных создания элемента REST API(Post: /your-link/:ItemId)
	 * @param {Object} data
	 */


	const handlerCreateOrderItem = data => {

		dispatch(orderIngredientAction.addOrderIngredient(data))
	}

	/**
	 * @desc Async Функция для получения токена с localStorage
	 * и оправки Push Notification,  запроса в базу данных для Push REST API(Post: /your-link)
	 */

	const sendPush = async () => {
		const token = await window.localStorage.getItem('sentFirebaseMessagingToken')

		if (numIngredientInStoke) {
			(new PushAPI())
				.pushSend({ token, title: 'Сделайте заказ пожалуйста', body: 'Заканчиваются продукты на складе' })
		}
	}


	return (
		<React.Fragment>
			{loaded ?
				<Ingredient products={products}
										handleDeleteItem={handleDeleteItem}
										handlerUpdateItem={handlerUpdateItem}
										handlerCreateItem={handlerCreateItem}
										handlerCreateOrderItem={handlerCreateOrderItem}
										orderCategories={orderCategories}
										loadedCategories={loadedCategories}
										openCheckBoxList={openCheckBox}
				/> : <div>...LOAD</div>}
		</React.Fragment>
	)

}

FoodWareHouse.propTypes = {
	products: PropTypes.array,
	orderCategories: PropTypes.array,
	loaded: PropTypes.bool,
	loadedCategories: PropTypes.bool,
	numIngredientInStoke: PropTypes.number,
	orderCategoriesItem: PropTypes.object,
	ingredients: PropTypes.object
}
