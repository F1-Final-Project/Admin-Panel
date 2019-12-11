import React, { useContext } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import * as columnName from '../../../lib/columnTableName'
import { Context } from '../../../context/tableContext'
import * as sorted from '../../../lib/sorted'


export default (props) => {
	const { products, classes } = props

	const { state } = useContext(Context)

	return (
		<TableHead>
			<TableRow>
				{state.openCheckBox &&																																													//проверка на для открытия чекбоксов
				<TableCell padding="checkbox" className={classes.tableCell}>
					<FormControlLabel disabled control={<Checkbox checked value="checkedE"/>}/>
				</TableCell>}
				{columnName.clmns(products).sort(sorted.compare).map(headCell => (																		//sort(sorted.compare) - сортировка полей по алфавиту
					<TableCell																																																		// columnName.clmns(products)-сортировка полей для оглавления в таблице
						key={headCell.id}
						padding={headCell.disablePadding ? 'none' : 'default'}
						className={classes.tableCell}
					>
						{headCell.id === 'price' ? (
								<TableSortLabel key={headCell.id}>
									{headCell.label}
								</TableSortLabel>)
							: (headCell.label)
						}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}
