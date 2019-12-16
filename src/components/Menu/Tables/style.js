import { makeStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

export const useStyles = makeStyles(theme => ({
	wrap:{
		paddingTop: 60,
	},
	box:{
		margin: 30,
	},

	taken:{
		backgroundColor: 'lightgrey',
		color: 'grey',
	},
	dialog:{
		color: '#82796d',
		backgroundColor: '#212121',
		backgroundImage: 'repeating-linear-gradient(-45deg, #232324, #232324 2px, transparent 2px, transparent 5px)',
	},
}));

export const ColorButton = withStyles(theme => ({

label: {
	color: '#E9C294',
	borderWidth: '1',
	borderColor: '#7a6c5b',
},
}))(Button);

export const Table = withStyles(theme => ({
	root:{
		padding: 60,
		textAlign: 'center',
		height: 200,
		width: 200,
		cursor: 'pointer',
		color: '#E9C294',
		backgroundColor: '#212121',
		backgroundImage: 'repeating-linear-gradient(-45deg, #232324, #232324 2px, transparent 2px, transparent 5px)',
		'&:hover': {
			boxShadow: '8px 8px 8px 6px rgba(0,0,0,0.3)',
		}
	},
}))(Paper);

export const TakenTable = withStyles(theme => ({
	root:{
		padding: 60,
		textAlign: 'center',
		height: 200,
		width: 200,
		cursor: 'pointer',
		color: '#7a6c5b',
		backgroundColor: '#212121',
		backgroundImage: 'repeating-linear-gradient(-45deg, #232324, #232324 2px, transparent 2px, transparent 5px)',
		'&:hover': {
			boxShadow: '8px 8px 8px 6px rgba(0,0,0,0.3)',
		}
	},
}))(Paper);