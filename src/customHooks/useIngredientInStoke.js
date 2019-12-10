import { useEffect, useState } from 'react'

export default function useItemInStoke(products) {


	const [ingredientOrder, setIngredientOrder] = useState(false)

	useEffect(() => {
		const numberOfItem = products.filter(stock => stock.restInStock < 30 || stock.restInStock === null || stock.restInStock === undefined)
		setIngredientOrder(numberOfItem.length !== 0)
	}, [products])

	return ingredientOrder
}