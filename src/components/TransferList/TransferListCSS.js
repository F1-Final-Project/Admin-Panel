import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
	listContainer: {
		margin: 'auto',
	},
	tablePaperEffect: {
		width: 200,
		height: 230,
		overflow: 'auto',
	},
	listButton: {
		margin: theme.spacing(0.5, 0),
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
		color: '#fff',
	},
	listSearchIcon: {
		color: '#fff',
	},
}))