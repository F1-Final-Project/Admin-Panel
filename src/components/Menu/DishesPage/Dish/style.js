import {makeStyles} from '@material-ui/core'

export default makeStyles(theme => ({
	box:{
		margin: 10
	},
	card: {
		width: 245,
		backgroundColor: '#212121',
		backgroundImage: 'repeating-linear-gradient(-45deg, #232324, #232324 2px, transparent 2px, transparent 5px)',
		'&:hover': {
			boxShadow: '8px 8px 8px 6px rgba(0,0,0,0.3)',
		},
	},
	title:{
		color: '#E9C294',
	},
	description:{
		color: '#82796d',
	},
	media: {
		height: 200,
	},
	typography:{
		paddingTop:40,
		paddingLeft: 30,
		color:'#82796d',
	},

}))