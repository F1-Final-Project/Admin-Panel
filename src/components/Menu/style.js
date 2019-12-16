import {makeStyles} from '@material-ui/core/index'

export default makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	snackbar:{
		marginTop: 25
	},
	snackbarContent:{
		backgroundColor:'#82796d',
		color: '#212121',
	}
}))




