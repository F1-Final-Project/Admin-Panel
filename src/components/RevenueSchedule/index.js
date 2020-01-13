import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as invoicesAction from '../../store/actions/invoices'
import Schedule from './Schedule'
import moment from 'moment'
import Progress from '../common/ProgressCircul'

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


	// function WTF(arr) {
	//
	// 	const scheduleItems = arr.map(i => {
	// 		return arr.filter(j => moment(i.created_at).format('MMMM Do YYYY') === moment(j.created_at).format('MMMM Do YYYY'))
	// 	})
	//
	//
	//
	// }
	//
	// WTF(products)

	const sortedInvoice = arr => {

		let filterItems = []


		function scheduleItems(arr) {
			if (arr.length === 0) {
				return filterItems
			} else {
				for (let i = 0; i < 1; i++) {
					let scheduleStructure = {}
					let schedulePriceOfDay = 0
					filterItems.push(
						arr.filter(j => moment(arr[i].created_at).format('MMMM Do YYYY') === moment(j.created_at).format('MMMM Do YYYY'))
							.map(i => {
								schedulePriceOfDay += i.invoicePrice
								scheduleStructure.name = moment(i.created_at).subtract(10, 'days').calendar()
								scheduleStructure['daily-earning'] = schedulePriceOfDay
								return scheduleStructure
							})[0])
					return scheduleItems(arr.filter(j => moment(arr[i].created_at).format('MMMM Do YYYY') !== moment(j.created_at).format('MMMM Do YYYY')))
				}
			}
		}

		// const t = scheduleItems(arr).map(i => {
		// 	let scheduleStructure = {}
		// 	let schedulePriceOfDay = 0;
		// 	return i.map(j => {
		// 		schedulePriceOfDay += j.invoicePrice
		// 		scheduleStructure.name = moment(j.created_at).subtract(10, 'days').calendar()
		// 		scheduleStructure.price = schedulePriceOfDay;
		//
		// 		return scheduleStructure
		// 	})
		// })

		// console.log('qwdqwdwqd', scheduleItems)

		return scheduleItems(arr)
	}

	console.log('qwdqwdwqd', sortedInvoice(products))

	return (
		<React.Fragment>
			{loaded ?
			<Schedule data={sortedInvoice(products)}/>
			: <Progress/>}
		</React.Fragment>
	)
}
