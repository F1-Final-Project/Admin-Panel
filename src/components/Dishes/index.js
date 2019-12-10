import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as dishAction from '../../store/actions/dishes'
import Table from '../Table'
import * as ingredientAction from '../../store/actions/ingredient'
import * as sorted from '../../lib/sorted'
import CategoriesAPI from '../../services/CategoriesAPI'


export default () => {

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


	const handleDeleteItem = id => {
		dispatch(dishAction.deleteDishById(id))
	}

	const handlerUpdateItem = (id, data) => {

		dispatch(dishAction.updateDishById(id, data))

	}

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
				/> : <div>...LOAD</div>}
		</React.Fragment>
	)

}

