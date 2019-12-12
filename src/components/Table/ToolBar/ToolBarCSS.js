import { makeStyles } from '@material-ui/core/styles'
import { lighten } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'

export const useToolbarStyles = makeStyles(theme => ({
	toolBarContainer: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
		// borderTop: '1px solid #E9C294',
		// borderLeft: '1px solid #E9C294',
		// borderRight: '1px solid #E9C294',
		border: '0',

	},
	highlight:
		theme.palette.type === 'light'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: '#48484a',
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	title: {
		flex: '1 1 100%',
		color: '#E9C294',
	},
	toolBarBtn: {
		color: '#E9C294'
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