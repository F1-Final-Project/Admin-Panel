import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as ingredientAction from '../store/actions/ingredient'


export default function useItemInStoke(products) {
	const dispatch = useDispatch()
	const [ingredientOrder, setIngredientOrder] = useState(false)

	useEffect(() =>{
		const numberOfItem = products.filter(stock => stock.restInStock < 30 || stock.restInStock === null || stock.restInStock === undefined)
		setIngredientOrder(numberOfItem.length !== 0)
	}, [products])

	return ingredientOrder
}