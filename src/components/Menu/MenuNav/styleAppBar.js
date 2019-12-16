import {makeStyles} from '@material-ui/core'

const drawerWidth = 200;

export default makeStyles(theme => ({

	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	app: {
		backgroundColor: '#212121',
		backgroundImage: 'repeating-linear-gradient(-45deg, #232324, #232324 2px, transparent 2px, transparent 5px)',
		color: '#E9C294',
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},


}))