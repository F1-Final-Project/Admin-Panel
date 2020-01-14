import moment from 'moment'

export default class Filter {
	static filterDrink (arr) {
		return arr ? arr.filter(item => item.title === 'Алкоголь') : [];
	}
	static sortedInvoice = arr => {

		let filterItems = []


		function scheduleItems(arr) {
			if (arr.length === 0) {
				return filterItems
			} else {
				for (let i = 0; i < 1; i++) {
					filterItems.push(
						arr.filter(j => moment(arr[i].created_at).format('MMMM Do YYYY') === moment(j.created_at).format('MMMM Do YYYY')),
					)
					return scheduleItems(arr.filter(j => moment(arr[i].created_at).format('MMMM Do YYYY') !== moment(j.created_at).format('MMMM Do YYYY')))
				}
			}
		}

		return scheduleItems(arr)
	}

	static sortedRevenueSchedule = arr => {
		return this.sortedInvoice(arr).map(item => {
			let scheduleStructure = {}
			let schedulePriceOfDay = 0
			return item.map(i => {
				schedulePriceOfDay += i.invoicePrice
				scheduleStructure.name = moment(i.created_at).subtract(10, 'days').calendar()
				scheduleStructure['Daily-earning'] = schedulePriceOfDay
				return scheduleStructure
			})[0]

		})
	}
}
