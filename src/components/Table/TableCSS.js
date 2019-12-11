import { makeStyles } from '@material-ui/core/styles'


export const useStyles = makeStyles(theme => ({
	tableContainer: {
		width: '100%',
	},
	tablePaperEffect: {
		marginTop: theme.spacing(3),
		width: '95%',
		height: '100%',
		overflowX: 'auto',
		marginBottom: theme.spacing(2),
		margin: '0 auto',
		backgroundColor: '#1C1C1C',
	},
	table: {
		minWidth: 320,
		border: '1px solid #E9C294',
	},
	tableCell: {
		borderBottom: '1px solid #E9C294',
		color: '#E9C294',
		textAlign: 'center',
	},
	fab: {
		margin: theme.spacing(1),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	tableBtnColor: {
		color: '#E9C294',
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

}))
