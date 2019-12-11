import React, { useContext } from 'react'
import clsx from 'clsx'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import CancelIcon from '@material-ui/icons/Cancel'
import { Context } from '../../../context/tableContext'
import * as sorted from '../../../lib/sorted'
import { useToolbarStyles } from './ToolBarCSS.js'
import PropTypes from 'prop-types'


export default function ToolBarTable(props) {
	const classes = useToolbarStyles()
	const {
		numSelected,
		creatOrderItem,
		products,
		openCheckBoxList,
	} = props
	const { dispatch, state } = useContext(Context)

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (																																															//numSelected > 0 изменять цвет THeader и показывать количество выбраных елементов
				<Typography className={classes.title} color="inherit" variant="subtitle1">
					{numSelected} selected
				</Typography>
			) : (
				<Typography className={classes.title} variant="h6" id="tableTitle">
					Table list
				</Typography>
			)}
			{openCheckBoxList &&																																															//показ, закрывать чекбоксы
			(state.openCheckBox ? (
					<Tooltip title="Close selected">
						<IconButton aria-label="close selected" onClick={() => dispatch({
							type: 'checkedProduct',
							payload: [],
							checkBoxActive: [],
						})}>
							<CancelIcon/>
						</IconButton>
					</Tooltip>)
				: (<Tooltip title="Select item">
					<IconButton aria-label="select item" onClick={() => dispatch({
						type: 'checkedProduct',
						openCheckBox: true,
						payload: state.checkedProduct,
						checkBoxActive: [],
					})}>
						<PlaylistAddCheckIcon/>
					</IconButton>
				</Tooltip>))
			}
			{numSelected > 0 ? (																																															//показ кнопки создания заказа
				<Tooltip title="Create order sheet">
					<IconButton aria-label="create order sheet" onClick={() => creatOrderItem(state.checkedProduct)}>
						<AssignmentTurnedInIcon/>
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Create new item">
					<IconButton aria-label="Create new item" onClick={() => dispatch({
						type: 'openCreateModal',
						payload: sorted.inputItems(products),
						openCreateModal: true,
					})}>
						<NoteAddIcon/>
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	)
};

ToolBarTable.propTypes = {
	numSelected: PropTypes.number,
	creatOrderItem: PropTypes.func,
	products: PropTypes.array,
	openCheckBoxList: PropTypes.bool
}
