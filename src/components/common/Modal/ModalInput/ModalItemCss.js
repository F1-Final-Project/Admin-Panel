import { makeStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


export const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
		margin: '0 auto'
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	modalPaper: {
		marginBottom: 10,
		backgroundColor: '#212121',
		boxShadow: '0 0 0 '
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	dialogContent: {
		//backgroundColor: '#000'
	},
	dialogTitle: {
		color: '#E9C294',
	},

}))


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


