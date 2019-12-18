import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as dishAction from '../../store/actions/dishes'
import Table from '../Table'
import * as ingredientAction from '../../store/actions/ingredient'
import * as sorted from '../../lib/sorted'
import CategoriesAPI from '../../services/CategoriesAPI'
import PropTypes from 'prop-types'
import Progress from '../common/ProgressCircul'


export default function Dishes() {

	const dishes = useSelector(state => state.dishes)
	const { products, loaded } = dishes
	const ingredients = useSelector(state => state.ingredient)
	const [dataCategories, setDataCategories] =useState([])


	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(dishAction.getAllDish())
		dispatch(ingredientAction.getAllIngredienst())

		new CategoriesAPI()
			.getAllCategories()
			.then(res =>  setDataCategories(res))

	}, [dispatch])

	/**
	 * @desc Функция для запроса в базу данных удаления элемента REST API(Delete: /your-link/:ItemId)
	 * @param {string} id
	 */

	const handleDeleteItem = id => {

		console.log('ewdweded', id)

		dispatch(dishAction.deleteDishById(id))
	}

	/**
	 * @desc Функция для запроса в базу данных редактирования элемента REST API(UPDATE: /your-link/:ItemId)
	 * @param {string} id
	 * @param {Object} data
	 */

	const handlerUpdateItem = (id, data) => {

		dispatch(dishAction.updateDishById(id, data))

	}

	/**
	 * @desc Функция для запроса в базу данных создания элемента REST API(Post: /your-link/:ItemId)
	 * @param {Object} data
	 */

	const handlerCreateItem = async data => {

		const newData = await sorted.inputItemsDataId(data)


		await dispatch(dishAction.addDish(newData, data))
	}

	return (
		<React.Fragment>
			{loaded ?
				<Table products={products}
							 handleDeleteItem={handleDeleteItem}
							 handlerUpdateItem={handlerUpdateItem}
							 handlerCreateItem={handlerCreateItem}
							 productsIngredient={ingredients.products}
							 dataCategories={dataCategories}
				/> : <Progress />}
		</React.Fragment>
	)

}

Dishes.propTypes = {
	products: PropTypes.array,
	loaded: PropTypes.bool,
	ingredients: PropTypes.array,
}
