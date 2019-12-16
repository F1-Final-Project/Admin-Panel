import {makeStyles} from '@material-ui/core'

export default makeStyles(theme => ({

	button:{
		color: '#E9C294',
		borderColor: '#7a6c5b',
		'&:hover': {
			color: '#212121',
			backgroundColor: '#E9C294',
			boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.3)',
		},
	},
	buttonSize:{
		height: 40, width: 125
	},
	dialog:{
		color: '#82796d',
		backgroundColor: '#212121',
		backgroundImage: 'repeating-linear-gradient(-45deg, #232324, #232324 2px, transparent 2px, transparent 5px)',
	}
}))