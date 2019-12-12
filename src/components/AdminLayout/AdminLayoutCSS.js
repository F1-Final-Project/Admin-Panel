import { makeStyles, useTheme } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'

const drawerWidth = 240

export const useStyles = makeStyles(theme => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(1),
		backgroundColor: '#212121',
		backgroundImage: 'repeating-linear-gradient(-45deg, #232324, #232324 2px, transparent 2px, transparent 5px)',
		height: '100%',
	},
	rootAdminPanel: {
		display: 'flex',
		backgroundColor: '#212121',

	},
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
	menuButton: {},
	hide: {
		display: 'none',

	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',

	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		backgroundColor: '#212121',
		color: '#d0cdc7',
		height: '100%'
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
		backgroundColor: '#212121',
		color: '#d0cdc7',
		height: '100%'
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		backgroundColor: '#212121',
		color: '#d0cdc7',

	},
	adminIcon: {
		color: '#E9C294',
		fontSize: '40px',
	}
}))


export const TableIconButton = withStyles(theme => ({
	root: {
		color: '#E9C294',
		'&:hover': {
			color: '#d0cdc7',
			backgroundColor:'rgba(138, 134, 135, .4)',
			boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.3)'
		},
	},
}))(IconButton);