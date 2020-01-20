import React, { useContext } from 'react'
import clsx from 'clsx'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import CancelIcon from '@material-ui/icons/Cancel'
import { Context } from '../../../context/tableContext'
import * as sorted from '../../../lib/sorted'
import { useToolbarStyles, TableIconButton } from './ToolBarCSS.js'
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
			className={clsx(classes.toolBarContainer, {
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
						<TableIconButton aria-label="close selected"
												className={clsx(classes.toolBarBtn, 'enzyme--close-table__checkbox')}
												onClick={() => dispatch({
													type: 'checkedProduct',
													payload: [],
													checkBoxActive: [],

												})}>
							<CancelIcon/>
						</TableIconButton>
					</Tooltip>)
				: (<Tooltip title="Select item">
					<TableIconButton aria-label="select item"
											className={clsx(classes.toolBarBtn, 'enzyme--open-table__checkbox')}
											onClick={() => dispatch({
						type: 'checkedProduct',
						openCheckBox: true,
						payload: state.checkedProduct,
						checkBoxActive: [],
					})}>
						<PlaylistAddCheckIcon/>
					</TableIconButton>
				</Tooltip>))
			}
			{numSelected > 0 ? (																																															//показ кнопки создания заказа
				<Tooltip title="Create order sheet">
					<TableIconButton aria-label="create order sheet"
											className={classes.toolBarBtn}
											onClick={() => creatOrderItem(state .checkedProduct)}>
						<AssignmentTurnedInIcon/>
					</TableIconButton>
				</Tooltip>
			) : (
				<Tooltip title="Create new item">
					<TableIconButton aria-label="Create new item"
											className={clsx(classes.toolBarBtn, 'enzyme--creat-modal')}
											onClick={() => dispatch({
						type: 'openCreateModal',
						payload: sorted.inputItems(products),
						openCreateModal: true,
					})}>
						<NoteAddIcon/>
					</TableIconButton>
				</Tooltip>
			)}
		</Toolbar>
	)
};

ToolBarTable.propTypes = {
	numSelected: PropTypes.number,
	creatOrderItem: PropTypes.func,
	products: PropTypes.array,
	openCheckBoxList: PropTypes.bool,
}
