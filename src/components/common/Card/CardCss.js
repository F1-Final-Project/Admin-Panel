import { makeStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'

export const useStyles = makeStyles(theme => ({
	cardContainer: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	cardHeader: {
		//backgroundColor: '#000'
	},
	CardCheckbox: {
		marginTop: '2px',
		marginLeft: '12px',
		color: '#edd185',
	},
	CardSvgEdit: {
		width: '25px',
		height: '25px',
		fill: '#ffb790',
		marginLeft: '40px',
		marginTop: '8px'
	},
	CardSvgCompleted: {
		width: '25px',
		height: '25px',
		fill: '#94e9b0',
		marginLeft: '40px',
		marginTop: '8px'
	},
	CardSvgInProgress: {
		width: '35px',
		height: '35px',
		fill: '#E9C294',
		marginLeft: '34px',
		marginTop: '5px'
	},

}))

export const useStylesTheme = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		maxWidth: 752,
	},
	demo: {
		backgroundColor: 'rgba(46, 45, 48, 0)',
		color: '#d0cdc7',
	},
}))

export const CssCard = withStyles({
	root: {
		'&.MuiCard-root': {
			backgroundColor: 'rgba(46, 45, 48, .4)',
			boxShadow: '6px 6px 4px 3px rgba(0, 0, 0, 0.2)',
			borderLeft: '1px solid rgba(233, 194, 148, .5)',
			borderRight: '1px solid rgba(233, 194, 148, .5)',
			color: '#d0cdc7',
		},
	},
})(Card)

export const ColorButton = withStyles(theme => ({
	root: {
		color: '#d0cdc7',
		'&:hover': {
			color: '#d0cdc7',
			backgroundColor: 'rgba(138, 134, 135, .4)',
			boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.3)',
		},
	},
}))(Button)

export const CardIconButton = withStyles(theme => ({
	root: {
		color: '#E9C294',
		'&:hover': {
			color: '#d0cdc7',
			backgroundColor: 'rgba(138, 134, 135, .4)',
			boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.3)',
		},
	},
}))(IconButton)

export const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#E9C294',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#E9C294',
		},
		'& label': {
			color: '#d0cdc7',
		},
		'& .MuiInputBase-input': {
			color: '#E9C294',
		},
	},
})(TextField)

export const CssDivider = withStyles({
	root: {
		'&.MuiDivider-root': {
			backgroundColor: 'rgba(233, 194, 148, .5)',
		},
	},
})(Divider)

