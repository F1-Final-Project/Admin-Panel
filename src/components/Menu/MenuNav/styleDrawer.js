import { makeStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Drawer from '@material-ui/core/Drawer/index'
import ListItem from '@material-ui/core/ListItem/index'

const drawerWidth = 200;

export const useStyles = makeStyles(theme => ({
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
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		'& .MuiSvgIcon-root': {
			color: '#E9C294',
		},
	},
	icon: {
		width: 30,
		heights: 30,
	},
}));

export const ColorDrawer = withStyles({
	paper: {
		backgroundColor: '#212121',
		backgroundImage: 'repeating-linear-gradient(-45deg, #232324, #232324 2px, transparent 2px, transparent 5px)',
	},
})(Drawer);

export const ColorListItem = withStyles({
	root: {
		color: '#82796d',
		'&:hover': {
			color: '#E9C294',
			boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.3)',
		},
	},
})(ListItem)