import { makeStyles } from '@material-ui/core/styles'


export const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100%',
	},
	paper: {
		marginTop: theme.spacing(3),
		width: '95%',
		height: '100%',
		overflowX: 'auto',
		marginBottom: theme.spacing(2),
		margin: '0 auto',
	},
	table: {
		minWidth: 320,

	},
	fab: {
		margin: theme.spacing(1),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	margin: {
		color: 'black',
	},
	tHeader: {
		backgroundColor: '#bdbdbd',
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
	priceDanger: {
		color: '#e53935',
		backgroundColor: '#ffebee',
		// textAlign: 'center',
	},
}))
