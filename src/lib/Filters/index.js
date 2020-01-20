import moment from 'moment'

export default class Filter {

	static sortedInvoice = (arr, format) => {

		let filterItems = []


		function scheduleItems(arr, format) {
			if (arr.length === 0) {
				return filterItems
			} else {
				for (let i = 0; i < 1; i++) {
					filterItems.push(
						arr.filter(j => moment(arr[i].created_at).format(format) === moment(j.created_at).format(format)),
					)
					return scheduleItems(arr.filter(j => moment(arr[i].created_at).format(format) !== moment(j.created_at).format(format)), format)
				}
			}

		}

		return scheduleItems(arr, format)
	}

	static sortedRevenueSchedule = (arr, format) => {
		return this.sortedInvoice(arr, format).map(item => {
			let scheduleStructure = {}
			let schedulePriceOfDay = 0
			return item.map(i => {
				schedulePriceOfDay += i.invoicePrice
				scheduleStructure.name = moment(i.created_at).format('L')
				scheduleStructure['Daily-earning $'] = schedulePriceOfDay
				return scheduleStructure
			})[0]

		})
	}

	static sortedCheckMonth = (arr, format) => {
		return this.sortedInvoice(arr, format).map(item => {

			let checkStructureCash = {}
			let checkStructureCard = {}
			let checkCashPriceOfMonth = 0
			let checkCardPriceOfMonth = 0

			item.map(i => {
					if (i.paymentMethod === 'CASH') {
						checkCashPriceOfMonth += i.invoicePrice
						checkStructureCash.name = i.paymentMethod
						checkStructureCash.value = checkCashPriceOfMonth
						checkStructureCash.created_at = moment(i.created_at).format(format)
						return checkStructureCash
					} else if (i.paymentMethod === 'CARD') {
						checkCardPriceOfMonth += i.invoicePrice
						checkStructureCard.name = i.paymentMethod
						checkStructureCard.value = checkCardPriceOfMonth
						checkStructureCard.created_at = moment(i.created_at).format(format)
						return checkStructureCard
					}
				},
			)

			return (checkStructureCash.created_at === moment(new Date()).format(format)
				&& checkStructureCash.created_at === moment(new Date()).format(format)) && [checkStructureCash, checkStructureCard]
		}).filter(i => i !== false)[0]
	}

	static sortedRevenuePeople = (arr, format) => {
		return this.sortedInvoice(arr, format).map(item => {
			let scheduleStructure = {}
			scheduleStructure['Daily-people'] = item.length
			item.map(i => {
				scheduleStructure.name = moment(i.created_at).format('L')
			})

			return scheduleStructure
		})
	}


	static sortedInvoiceDish = (arr, format) => {

		return this.sortedInvoice(arr, format).map(item => {

			const dishTitle = item.map(i => i.invoiceItems.map(j => j.title))

			const dishNumber = [].concat(...dishTitle).reduce((acc, el) => {
				acc[el] = (acc[el] || 0) + 1
				return acc
			}, {})

			const repeatItemDish = Object.entries(dishNumber).map(item => {

				const itemDish = `${item[0]}:`
				return [
					itemDish.repeat(item[1]),
				].map(item => [...item.split(':')]
					.filter(item => item !== ''))

			})


			const popularDish = Array.from(new Set(repeatItemDish.reduce((cur, prev) => {
				return cur[0].length > prev[0].length ? cur : prev
			})[0]))

			return popularDish.map((dish, indexDish) => {
				const structureStatistic = {}
				item.forEach((date, indexDate) => {
					if (indexDish === indexDate) {
						structureStatistic.name = dish
						structureStatistic.value = 1
						structureStatistic.created_at = moment(date.created_at).format(format)
						return structureStatistic
					}
				})
				return structureStatistic
			})[0]

		})

	}

}

