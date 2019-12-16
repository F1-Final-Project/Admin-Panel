import { makeStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Divider from '@material-ui/core/Divider'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

export const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	test: {
		alignItems: 'flex-start',
		flexWrap: 'wrap',
		alignContent: 'center',
	},
	rootTest: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	gridOrder: {
		display: 'grid',
		gridGap: '20px',
		gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))',
		gridAutoRows: '20px',

	},

}))

export const CssDivider = withStyles({
	root: {
		'&.MuiDivider-root': {
			backgroundColor: 'rgba(233, 194, 148, .5)',
			marginBottom: '15px',
		},
	},
})(Divider)

export const CssTabs = withStyles({
	root: {
		marginBottom: '15px',
	},
	indicator: {
		backgroundColor: '#d0cdc7',
	},
})(Tabs)

export const CssTab = withStyles({
	root: {
			border: '1px solid #E9C294',
			color: '#d0cdc7',

		'&.MuiTab-textColorPrimary.Mui-selected': {
			color: '#E9C294',
		},

		'&:hover': {
			color: '#E9C294',
		},
	},
})(Tab)