import Button from '@material-ui/core/Button'
import React from 'react'
import { useDispatch} from 'react-redux'
import * as ingredientActions from '../../store/actions/ingredient'
import * as orderActions from '../../store/actions/orders'

export default function CompletedButton(props){
	const order=props.order;
	const dispatch=useDispatch();

	const recountIngredientsInStock=(order)=>{
		order.orderItems.map(dish=>
			dish.ingredients.map(ingredient=>{

				ingredient.restInStock=+(ingredient.restInStock)-1;

				ingredientActions.updateIngredientById(ingredient._id, {
					title: ingredient.title,
					restInStock: ingredient.restInStock,
					description: ingredient.description,
					price: ingredient.price,})(dispatch)}
			))
	}

	const completeOrder=()=>{
		recountIngredientsInStock(order);

		orderActions.updateOrder({
			// staff: order.staff,
			table: order.table,
			orderItems: order.orderItems,
			orderPrice: order.orderPrice,
			onKitchen: true,
			completed: true,
		}, order._id)(dispatch)
	}

	return(
		<Button variant="outlined" onClick={completeOrder}>comleted</Button>
	)
}
