import { makeStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'

export const useStyles = makeStyles(theme => ({
	listContainer: {
		margin: 'auto',
	},
	tablePaperEffect: {
		width: 200,
		height: 230,
		overflow: 'auto',
		backgroundImage: 'repeating-linear-gradient(-45deg, #232324, #232324 2px, #212121 2px, #212121 5px)',
		boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.3)',
		color: '#d0cdc7',
	},
	listButton: {
		margin: theme.spacing(0.5, 0),
		border: '1px solid #E9C294',
		color: '#E9C294',
	},
	listButtonNone: {
		opacity: 0
	},
	listSearch: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '80%',
		margin: '0 auto',
		marginTop: 10,
		backgroundColor: 'grey',
	},
	listIconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	listInputBase: {
		backgroundColor: 'grey',
		color: '#000',
	},
	listSearchIcon: {
		color: '#E9C294',
	},
	listCheckbox: {
		color: '#edd185',
	},
	listDeleteBtn: {
		marginRight: '15px',
	},
}))

export const TableIconButton = withStyles(theme => ({
	root: {
		color: '#E9C294',
		'&:hover': {
			color: '#d0cdc7',
			backgroundColor: 'rgba(138, 134, 135, .4)',
			boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.3)',
		},
	},
}))(IconButton)