import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as invoicesAction from '../../store/actions/invoices'
import Schedule from './Schedule'

export default function RevenueSchedule() {

	const invoice = useSelector(state => state.invoice)
	const { products, loaded } = invoice


	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(invoicesAction.getInvoices())

	}, [dispatch])

	return(
		<React.Fragment>
			<Schedule/>
		</React.Fragment>
	)
}
