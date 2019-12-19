import { makeStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';


export const useStyles = makeStyles(theme => ({
	root: {
		position: 'fixed',
		bottom: theme.spacing(2),
		left: '84px',
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	headerToolBar: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',

	},
	headerLink: {
		textDecoration: 'none',
		color: '#E9C294'
	},
}))

export const CssAppBar = withStyles(theme => ({
	root: {
		backgroundColor: '#212121',
		boxShadow: '-5px -5px 10px 10px rgba(0, 0, 0, .2)',
		margin: '0 auto',
	},

}))(AppBar)
export const CssFab = withStyles(theme => ({
	secondary: {
		backgroundColor: '#d0cdc7',
		color: '#212121',

	},
	root: {
		'&:hover': {
			backgroundColor: '#E9C294',
		},
	},


}))(Fab)

export const TableIconButton = withStyles(theme => ({
	root: {
		color: '#E9C294',
		marginRight: '5px',
		'&:hover': {
			color: '#d0cdc7',
			backgroundColor: 'rgba(138, 134, 135, .4)',
			boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.3)',
		},
	},
}))(IconButton)

export const CssMenuAdmin = withStyles(theme => ({
	paper: {
		backgroundColor: '#212121',
	},

}))(Menu)