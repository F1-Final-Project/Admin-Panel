import {makeStyles} from '@material-ui/core'

export default makeStyles(theme => ({
		card: {
			paddingBottom: 15,
			backgroundColor: '#212121',
			backgroundImage: 'repeating-linear-gradient(-45deg, #232324, #232324 2px, transparent 2px, transparent 5px)',
		},
		content: {
			color: '#82796d',
		},
		box:{
			widthMin: '20%',
			margin: 10,
			height: '100%',
			boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.3)'
		},
		title: {
			color: '#d6b287',
		},
		grid: {
			paddingTop: 70,
		},
		button:{
				color: '#E9C294',
				borderColor: '#7a6c5b',
				'&:hover': {
					color: '#212121',
					backgroundColor: '#E9C294',
					boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.3)',
			},
		},
		pos: {
			color: '#7a6c5b',
			marginBottom: 12,
		},
		text:{
			color: '#7a6c5b',
		}

}))