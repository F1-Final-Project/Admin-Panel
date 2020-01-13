import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as invoicesAction from '../../store/actions/invoices'
import Schedule from './Schedule'
import moment from 'moment'

export default function RevenueSchedule() {

	const invoice = useSelector(state => state.invoice)
	const { products, loaded } = invoice


	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(invoicesAction.getInvoices())

	}, [dispatch])


	// const sortedInvoice = arr => {
	//
	// 	// const scheduleItems = arr.map((i, index) => {
	// 	// 	let scheduleStructure = {};
	// 	// 	let filterItems = [];
	// 	// 	for (let j = index + 1; j < arr.length; j++) {
	// 	// 		if (moment(i.created_at).format('MMMM Do YYYY') === moment(arr[j].created_at).format('MMMM Do YYYY')) {
	// 	// 			scheduleStructure.name = moment(i.created_at).subtract(10, 'days').calendar()
	// 	// 			filterItems.push(scheduleStructure)
	// 	// 			return filterItems
	// 	// 		}
	// 	//
	// 	// 	}
	// 	// })
	//
	//
	//
	// 	const scheduleItems = arr.map(i => {
	// 		let test = []
	// 		 return arr.filter(j => {
	// 			return test.push(moment(i.created_at).format('MMMM Do YYYY') === moment(j.created_at).format('MMMM Do YYYY'));
	// 		})
	//
	// 	})
	//
	// 	console.log('wedwedwed', scheduleItems)
	//
	// }
	//
	// sortedInvoice(products)


	function WTF(arr) {

		const scheduleItems = arr.map(i => {
			return arr.filter(j => moment(i.created_at).format('MMMM Do YYYY') === moment(j.created_at).format('MMMM Do YYYY'))
		})
	let test = new Set()

		console.log('qwdqwdqwd', test)
	}

	WTF(products)


	return (
		<React.Fragment>
			<Schedule/>
		</React.Fragment>
	)
}
