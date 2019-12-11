import { makeStyles } from '@material-ui/core/styles'


export const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	paperMargin: {
		marginBottom: 10,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},

}))