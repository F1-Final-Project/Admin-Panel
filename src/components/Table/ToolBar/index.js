import React, { useContext } from 'react'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
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


const useToolbarStyles = makeStyles(theme => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	title: {
		flex: '1 1 100%',
	},
}))

export default props => {
	const classes = useToolbarStyles()
	const { numSelected } = props
	const { dispatch, state } = useContext(Context)
	const { products } = props


	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography className={classes.title} color="inherit" variant="subtitle1">
					{numSelected} selected
				</Typography>
			) : (
				<Typography className={classes.title} variant="h6" id="tableTitle">
					Table list
				</Typography>
			)}

			{state.openCheckBox ? (
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
				</Tooltip>)}

			{numSelected > 0 ? (
				<Tooltip title="Create order sheet">
					<IconButton aria-label="create order sheet" onClick={() => dispatch({
						type: 'createList',
						openCreateListModal: true,
					})}>
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
