import { makeStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import { purple } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'


export const useStyles = makeStyles(theme => ({
	tableContainer: {
		width: '100%',
	},
	tablePaperEffect: {
		marginTop: theme.spacing(3),
		width: '90vw',
		height: '100%',
		overflowX: 'auto',
		marginBottom: theme.spacing(5),
		margin: '0 auto',
		backgroundColor: 'rgba(28, 28, 28, .1)',
		boxShadow: '-5px -5px 10px 10px rgba(0, 0, 0, .2)'
		//backgroundColor: '#1f1f22',
	},
	table: {
		minWidth: 320,
		//border: '1px solid #E9C294',
		border: '0',
	},
	tableCell: {
		borderBottom: '1px solid #E9C294',
		color: '#d0cdc7',
		textAlign: 'center',
		fontFamily:'Helvetica Neue',
	},
	fab: {
		margin: theme.spacing(1),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	tHeader: {
		backgroundColor: '#bdbdbd',
		color: '#E9C294',
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	tableCellHover: {
		'&:hover': {
			backgroundColor: 'rgba(48, 48, 48, .5) !important',
		},
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
	TableCellDanger: {
		color: '#e53935',
		backgroundColor: '#424242',
		borderBottom: '1px solid #E9C294',
		textAlign: 'center',

	},
	tableCheckbox: {
		color: '#edd185',
	},

	tablePagination: {
		// border: '1px solid #E9C294',
		border: '0',
		color: '#d0cdc7',
	},
	deleteTableModal: {
		color: '#E9C294',
		textAlign: 'center'
	}

}))

export const ColorButton = withStyles(theme => ({
	root: {
		color: '#d0cdc7',
		'&:hover': {
			color: '#d0cdc7',
			backgroundColor:'rgba(138, 134, 135, .4)',
			boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.3)'
		},
	},
}))(Button);

export const TableIconButton = withStyles(theme => ({
	root: {
		color: '#E9C294',
		'&:hover': {
			color: '#d0cdc7',
			backgroundColor:'rgba(138, 134, 135, .4)',
			boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.3)'
		},
	},
}))(IconButton);