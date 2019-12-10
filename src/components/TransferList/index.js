import React, { useContext, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { InputBase } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { Context } from '../../context/tableContext'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto',
	},
	paper: {
		width: 200,
		height: 230,
		overflow: 'auto',
	},
	button: {
		margin: theme.spacing(0.5, 0),
	},
	rootSearch: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '80%',
		margin: '0 auto',
		marginTop: 10,
		backgroundColor: 'grey',
	},
	iconButton: {

		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	input: {
		backgroundColor: 'grey',
		color: '#fff',
	},
	search: {
		color: '#fff',
	},
}))

function not(a, b) {
	return a.filter(value => b.indexOf(value) === -1)
}

function intersection(a, b) {
	return a.filter(value => b.indexOf(value) !== -1)
}

export default function TransferList(props) {

	const { dispatch, state } = useContext(Context)
	const { itemValue, nameProperty } = props
	const classes = useStyles()
	const [checked, setChecked] = React.useState([])
	const [left, setLeft] = React.useState(itemValue)
	const [right, setRight] = React.useState(state.transferListItemSearch)


	const rightChecked = intersection(checked, right)


	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value)
		const newChecked = [...checked]

		if (currentIndex === -1) {
			newChecked.push(value)
		} else {
			newChecked.splice(currentIndex, 1)
		}

		setChecked(newChecked)
	}

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked))
		setRight(not(right, rightChecked))
		setChecked(not(checked, rightChecked))

		handleSaveIng(left.concat(rightChecked))
	}

	const handleSaveIng = useCallback(
		(item) => {

			let newGroupItem = {}
			newGroupItem[nameProperty] = item

			dispatch({
				type: 'onChangeInput',
				payload: newGroupItem,
				openEditModal: state.openEditModal,
				openCreateModal: state.openCreateModal,
			})
		},
		[left],
	)

	const handelSearchChange = e => {
		const testFilter = state.transferListItem.filter(i => {
			return i.title.includes(e.target.value)
		})

		console.log('12334')

		dispatch({
			type: 'searchChange',
			payload: testFilter,
			searchItem: { [e.target.name]: e.target.value },
		})
	}

	const handleDeleteItemList = items => {

		console.log('ewdwedwed', items)
		const newDelete = left.filter(i => i._id !== items._id)
		setLeft(newDelete)

		handleSaveIng(newDelete)
	}

	const customListLeft = items => {
		return <Paper className={classes.paper}>
			<List dense component="div" role="list">
				{items.map(value => {
					const labelId = `transfer-list-item-${value}-label`
					return (
						<ListItem key={value._id} role="listitem" button>
							<Tooltip title="Delete" aria-label="delete">
								<IconButton aria-label="delete" className={classes.margin} className={classes.margin}
														onClick={() => handleDeleteItemList(value)}>
									<DeleteIcon fontSize="small"/>
								</IconButton>
							</Tooltip>
							<ListItemText id={labelId} primary={value.title}/>
						</ListItem>
					)
				})}
				<ListItem/>
			</List>
		</Paper>
	}

	const customListRight = items => {

		return <Paper className={classes.paper}>
			<Paper component="form" className={classes.rootSearch}>
				<InputBase
					className={classes.input}
					placeholder="Search"
					inputProps={{ 'aria-label': 'search' }}
					value={state.search[nameProperty]}
					name={nameProperty}
					onChange={e => handelSearchChange(e)}
				/>
				<IconButton type="text" className={classes.iconButton} aria-label="search">
					<SearchIcon className={classes.search}/>
				</IconButton>
			</Paper>
			<List dense component="div" role="list">
				{items.map(value => {
					const labelId = `transfer-list-item-${value}-label`
					return (
						<ListItem key={value._id} role="listitem" button onClick={handleToggle(value)}>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value.title}/>
						</ListItem>
					)
				})}
				<ListItem/>
			</List>
		</Paper>
	}

	return (
		<Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
			<Grid item>{customListLeft(left)}</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label="move selected left"
					>
						&lt;
					</Button>
				</Grid>
			</Grid>
			<Grid item>{customListRight(right)}</Grid>
		</Grid>
	)
}