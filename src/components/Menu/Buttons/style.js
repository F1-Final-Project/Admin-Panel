import { makeStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Menu from '@material-ui/core/Menu'
import Button from '@material-ui/core/Button'
import React from 'react'

export const useStyles = makeStyles(theme => ({
	menu:{
		color: '#82796d',
		backgroundColor: '#212121',
		backgroundImage: 'repeating-linear-gradient(-45deg, #232324, #232324 2px, transparent 2px, transparent 5px)',
	},
	menuItem:{
		overflowY: "visible",
		'&:hover': {
			color: '#E9C294',
			boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.3)',
		},
	},
	menuTaken:{
		cursor: 'default',
	},
	menuNew:{
		color: '#E9C294',
		'&:hover': {
			boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.3)',
		},
	},
	snackbar:{
		marginTop: 25,
		width: 300,
	},
	completed:{
		width: 300,
	},
	snackbarContent:{
		backgroundColor:'#82796d',
		color: '#212121',
	},
	spanMenu:{
		cursor: 'pointer',
		color:'#82796d',
		'&:hover': {
			color: '#E9C294',
		},
	},
	titleMenu: {
		flexGrow: 1,
		marginLeft: '3%'
	},
}));

export const ColorMenu = withStyles(theme => ({
	list:{
		padding: 0,
	}
}))(Menu);

export const ColorButton = withStyles(theme => ({
	root:{
		color:'#82796d',
		'&:hover': {
			color: '#E9C294',
		},
	}
}))(Button);
